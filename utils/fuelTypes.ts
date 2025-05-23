import { IconType } from "react-icons";
import { NounGasoline, NounDiesel, NounHybrid, NounElectric, NounBiFuel } from "./icons";

type FuelType = {
   label: FuelTypeLabel;
   icon: IconType;
};

export type FuelTypeLabel = "بنزین" | "دوگانه" | "دیزل" | "هیبرید" | "برقی";

export const fuelTypes: FuelType[] = [
   {
      label: "بنزین",
      icon: NounGasoline,
   },
   {
      label: "دوگانه",
      icon: NounBiFuel,
   },
   {
      label: "دیزل",
      icon: NounDiesel,
   },
   {
      label: "هیبرید",
      icon: NounHybrid,
   },
   {
      label: "برقی",
      icon: NounElectric,
   },
];
