import nextId from "react-id-generator";

//#region categories seed start
const categories = [
  { _id: nextId(), title: "Fresh Meat", discount: 0.1 },
  { _id: nextId(), title: "Vegetables", discount: 0.2 },
  { _id: nextId(), title: "Fruit and Nut Gifts", discount: 0.15 },
  { _id: nextId(), title: "Fresh Berries", discount: 0.1 },
  { _id: nextId(), title: "Ocean Foods", discount: 0.2 },
  { _id: nextId(), title: "Butter & Eggs", discount: 0.13 },
  { _id: nextId(), title: "Fastfood", discount: 0.16 },
  { _id: nextId(), title: "Fresh Onion", discount: 0.2 },
  { _id: nextId(), title: "Papayaya & Crisps", discount: 0.1 },
  { _id: nextId(), title: "Oatmeal", discount: 0.2 },
];

//#endregion

export default categories;
