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
    name: "Text",
    icons: <MdArrowDropDownCircle />,
    onclick: () => {
      console.log("great");
    },
  },
  {
    name: "Text area (Long text)",
    icons: <MdArrowDropDownCircle />,
    onclick: () => {
      console.log("great");
    },
  },
  {
    name: "Date",
    icons: <MdArrowDropDownCircle />,
    onclick: () => {
      console.log("great");
    },
  },
  {
    name: "Progress (Auto)",
    icons: <MdArrowDropDownCircle />,
    onclick: () => {
      console.log("great");
    },
  },
  {
    name: "Progress (Auto)",
    icons: <MdArrowDropDownCircle />,
    onclick: () => {
      console.log("great");
    },
  },
  {
    name: "Number",
    icons: <MdArrowDropDownCircle />,
    onclick: () => {
      console.log("great");
    },
  },
  {
    name: "Progress (Auto)",
    icons: <MdArrowDropDownCircle />,
    onclick: () => {
      console.log("great");
    },
  },
  {
    name: "Progress (Auto)",
    icons: <MdArrowDropDownCircle />,
    onclick: () => {
      console.log("great");
    },
  },
  {
    name: "Progress (Auto)",
    icons: <MdArrowDropDownCircle />,
    onclick: () => {
      console.log("great");
    },
  },
  {
    name: "Progress (Auto)",
    icons: <MdArrowDropDownCircle />,
    onclick: () => {
      console.log("great");
    },
  },
  {
    name: "Progress (Auto)",
    icons: <MdArrowDropDownCircle />,
    onclick: () => {
      console.log("great");
    },
  },
  {
    name: "Progress (Auto)",
    icons: <MdArrowDropDownCircle />,
    onclick: () => {
      console.log("great");
    },
  },
  {
    name: "Progress (Auto)",
    icons: <MdArrowDropDownCircle />,
    onclick: () => {
      console.log("great");
    },
  },
  {
    name: "Progress (Auto)",
    icons: <MdArrowDropDownCircle />,
    onclick: () => {
      console.log("great");
    },
  },
  {
    name: "Progress (Auto)",
    icons: <MdArrowDropDownCircle />,
    onclick: () => {
      console.log("great");
    },
  },
  {
    name: "Progress",
    icons: <MdArrowDropDownCircle />,
    onclick: () => {
      console.log("great");
    },
  },
];

export default addColumns;
