import { IconType } from "react-icons";
import {
   NounSedan,
   NounRoadster,
   NounHatchback,
   NounSportCar,
   NounPickup,
   NounSUV,
   NounVan,
} from "./icons";

type Category = {
   label: CategoryLabel;
   icon: IconType;
};

export type CategoryLabel =
   | "سدان"
   | "شاسی‌بلند"
   | "هاچ‌بک"
   | "کروک"
   | "ون"
   | "پیکاپ"
   | "کوپه";

export const categories: Category[] = [
   {
      label: "سدان",
      icon: NounSedan,
   },
   {
      label: "هاچ‌بک",
      icon: NounHatchback,
   },
   {
      label: "کوپه",
      icon: NounSportCar,
   },
   {
      label: "کروک",
      icon: NounRoadster,
   },
   {
      label: "شاسی‌بلند",
      icon: NounSUV,
   },
   {
      label: "ون",
      icon: NounVan,
   },
   {
      label: "پیکاپ",
      icon: NounPickup,
   },
];
