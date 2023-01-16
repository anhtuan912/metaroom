import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { PinInputContainer } from "./PinInputContainer";
const regex = /^\d$/;

ReactDOM.render(
  <PinInputContainer regex={regex} options={{ infinite: false }} />,
  document.getElementById("root")
);
