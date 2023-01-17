import { Interface } from "node:readline/promises";
import React from "react";
import { MdArrowDropDownCircle } from "react-icons/md";

interface Icolumn {
  name: string;
  icons: JSX.Element;
  onclick: () => void;
}
const addColumns: Icolumn[] = [
  {
    name: "Dropdown",
    icons: <MdArrowDropDownCircle />,
    onclick: () => {
      console.log("great");
    },
  },
  {
    name: "Dropdown",
    icons: <MdArrowDropDownCircle />,
    onclick: () => {
      console.log("great");
    },
  },
  {
    name: "Dropdown",
    icons: <MdArrowDropDownCircle />,
    onclick: () => {
      console.log("great");
    },
  },
  {
    name: "Dropdown",
    icons: <MdArrowDropDownCircle />,
    onclick: () => {
      console.log("great");
    },
  },
  {
    name: "Dropdown",
    icons: <MdArrowDropDownCircle />,
    onclick: () => {
      console.log("great");
    },
  },
];

export default addColumns;
