export const iranianCities = [
   {
      name: "تهران",
      province: "تهران",
      coordinates: { lat: 35.6892, lng: 51.389 },
   },
   {
      name: "مشهد",
      province: "خراسان رضوی",
      coordinates: { lat: 36.2605, lng: 59.6168 },
   },
   {
      name: "اصفهان",
      province: "اصفهان",
      coordinates: { lat: 32.6546, lng: 51.668 },
   },
   {
      name: "تبریز",
      province: "آذربایجان شرقی",
      coordinates: { lat: 38.0962, lng: 46.2738 },
   },
   {
      name: "شیراز",
      province: "فارس",
      coordinates: { lat: 29.5926, lng: 52.5836 },
   },
   {
      name: "کرج",
      province: "البرز",
      coordinates: { lat: 35.84, lng: 50.9391 },
   },
   {
      name: "قم",
      province: "قم",
      coordinates: { lat: 34.6399, lng: 50.8759 },
   },
   {
      name: "اهواز",
      province: "خوزستان",
      coordinates: { lat: 31.3183, lng: 48.6706 },
   },
   {
      name: "کرمانشاه",
      province: "کرمانشاه",
      coordinates: { lat: 34.3142, lng: 47.065 },
   },
   {
      name: "ارومیه",
      province: "آذربایجان غربی",
      coordinates: { lat: 37.5522, lng: 45.0761 },
   },
   {
      name: "رشت",
      province: "گیلان",
      coordinates: { lat: 37.2808, lng: 49.5832 },
   },
   {
      name: "زاهدان",
      province: "سیستان و بلوچستان",
      coordinates: { lat: 29.4968, lng: 60.8629 },
   },
   {
      name: "همدان",
      province: "همدان",
      coordinates: { lat: 34.7983, lng: 48.5146 },
   },
   {
      name: "کرمان",
      province: "کرمان",
      coordinates: { lat: 30.2839, lng: 57.0834 },
   },
   {
      name: "اراک",
      province: "مرکزی",
      coordinates: { lat: 34.0956, lng: 49.6981 },
   },
   {
      name: "یزد",
      province: "یزد",
      coordinates: { lat: 31.8974, lng: 54.3569 },
   },
   {
      name: "بندرعباس",
      province: "هرمزگان",
      coordinates: { lat: 27.1833, lng: 56.2667 },
   },
   {
      name: "اردبیل",
      province: "اردبیل",
      coordinates: { lat: 38.2505, lng: 48.2965 },
   },
   {
      name: "گرگان",
      province: "گلستان",
      coordinates: { lat: 36.8393, lng: 54.4341 },
   },
   {
      name: "سنندج",
      province: "کردستان",
      coordinates: { lat: 35.3125, lng: 46.9863 },
   },
   {
      name: "قزوین",
      province: "قزوین",
      coordinates: { lat: 36.2797, lng: 50.0049 },
   },
   {
      name: "خرم‌آباد",
      province: "لرستان",
      coordinates: { lat: 33.4871, lng: 48.3539 },
   },
   {
      name: "کاشان",
      province: "اصفهان",
      coordinates: { lat: 33.985, lng: 51.41 },
   },
   {
      name: "ساری",
      province: "مازندران",
      coordinates: { lat: 36.5656, lng: 53.0588 },
   },
   {
      name: "بابل",
      province: "مازندران",
      coordinates: { lat: 36.544, lng: 52.6787 },
   },
];

export function findCityLocation(cityName: string): [number, number] | null {
   const city = iranianCities.find((city) => city.name === cityName);

   if (city) {
      return [city.coordinates.lat, city.coordinates.lng];
   } else {
      return null;
   }
}
