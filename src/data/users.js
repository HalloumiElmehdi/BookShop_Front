import nextId from "react-id-generator";

import categories from "./categories";

//#region user(S) and supplier seed
const users = [
  {
    _id: nextId(),
    firstName: "Benjaafar",
    lastName: "Yassine ",
    address: "road 54......",
    zipCode: "60000",
    phone: "0639788954",
    email: "yassine.benjaafar@gmail.com",
    password: "password",
    categories: [categories.find((c) => c.title === "Fresh Meat")._id],
  },
  {
    _id: nextId(),
    firstName: "Halloumi",
    lastName: "elmehdi ",
    address: "road 54......",
    zipCode: "60000",
    phone: "0639788954",
    email: "halloumi.elmehdi@gmail.com",
    password: "password",
    categories: [categories.find((c) => c.title === "Fresh Meat")._id],
  },
];

export default users;
