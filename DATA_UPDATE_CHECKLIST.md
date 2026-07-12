# Nutrition data update checklist

1. Save the new official PDF URL, filename date, visible footer date, and access date.
2. Archive a working copy for comparison. Do not overwrite the current dataset yet.
3. Compare every category, row name, portion, and all 11 nutrient fields.
4. Compare allergen flags, vegan marks, omitted rows, spelling, and category placement.
5. Preserve literal `<1` and `N/A` tokens. Never turn `<1` into zero or invent an unavailable value.
6. Review the BIBICUP note and any other source-wide calculation instructions.
7. Compare the official webpage separately and record conflicts. Do not copy selected webpage values into the PDF dataset.
8. Update `src/data/bibibop-nutrition.ts`, `src/config/site.ts`, conflict notes, methodology, and version history as one reviewed change.
9. Run `npm run verify:data`, `npm run typecheck`, `npm test`, `npm run lint`, and `npm run build`.
10. Manually inspect representative item details, allergens, search aliases, BIBICUP results, and the exported table before deployment.
