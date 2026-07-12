export type FormulaSex = "male"|"female";
export type ActivityLevel = "sedentary"|"light"|"moderate"|"very"|"extra";

export const activityFactors:Record<ActivityLevel,number>={sedentary:1.2,light:1.375,moderate:1.55,very:1.725,extra:1.9};
export const activityLabels:Record<ActivityLevel,string>={sedentary:"Sedentary",light:"Lightly active",moderate:"Moderately active",very:"Very active",extra:"Extra active"};

export function bmrMifflin(weightKg:number,heightCm:number,age:number,sex:FormulaSex){
  return 10*weightKg+6.25*heightCm-5*age+(sex==="male"?5:-161);
}
export function tdeeFromProfile(weightKg:number,heightCm:number,age:number,sex:FormulaSex,activity:ActivityLevel){
  const bmr=bmrMifflin(weightKg,heightCm,age,sex);return {bmr,tdee:bmr*activityFactors[activity]};
}
export function bmiMetric(weightKg:number,heightCm:number){return weightKg/((heightCm/100)**2)}
export function bmiCategory(bmi:number){if(bmi<18.5)return "Underweight";if(bmi<25)return "Healthy weight";if(bmi<30)return "Overweight";if(bmi<35)return "Obesity, class 1";if(bmi<40)return "Obesity, class 2";return "Obesity, class 3"}
export const poundsToKg=(pounds:number)=>pounds*0.45359237;
export const inchesToCm=(inches:number)=>inches*2.54;
export const round=(value:number)=>Math.round(value);
