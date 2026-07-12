import type { AllergenKey, NutritionItem } from "@/data/bibibop-nutrition";

export type Quantity = 0.5 | 1 | 1.5 | 2;
export type Selection = { id: string; quantity: Quantity };
export const nutrientKeys = ["calories","caloriesFromFat","fatG","saturatedFatG","transFatG","cholesterolMg","sodiumMg","carbsG","fiberG","sugarsG","proteinG"] as const;
export type NutrientKey = typeof nutrientKeys[number];

export function calculateNutrition(selections: Selection[], items: NutritionItem[], bibicup = false) {
  const selected = selections.map((s) => ({ selection:s, item:items.find((i) => i.id === s.id)! })).filter((x) => x.item);
  const totals = Object.fromEntries(nutrientKeys.map((key) => [key,0])) as Record<NutrientKey,number>;
  const incomplete = new Set<NutrientKey>();
  let estimated = false;
  for (const { selection, item } of selected) {
    const baseFactor = bibicup && item.category === "bases" ? 0.5 : 1;
    if (selection.quantity !== 1 || baseFactor !== 1) estimated = true;
    for (const key of nutrientKeys) {
      const token = item.nutrients[key];
      if (token.qualifier === "not-available") incomplete.add(key);
      else {
        totals[key] += (token.value ?? 0) * selection.quantity * baseFactor;
        if (token.qualifier === "less-than") estimated = true;
      }
    }
  }
  const allergens = {} as Record<AllergenKey,string[]>;
  for (const { item } of selected) for (const [key, present] of Object.entries(item.allergens)) if (present) (allergens[key as AllergenKey] ??= []).push(item.name);
  const unknownAllergens = selected.filter(({item}) => item.allergenDataStatus !== "listed").map(({item}) => item.name);
  const vegan = selected.length === 0 ? "unknown" : selected.some(({item}) => item.vegan === false) ? "not-vegan" : selected.some(({item}) => item.vegan === null) ? "unknown" : "vegan";
  const status = incomplete.size ? "Incomplete" : estimated ? "Estimated" : "Exact";
  return { totals, incomplete, allergens, unknownAllergens, vegan, status, selected };
}

export const formatTotal = (value:number) => Number.isInteger(value) ? String(value) : value.toFixed(1).replace(/\.0$/,"");
