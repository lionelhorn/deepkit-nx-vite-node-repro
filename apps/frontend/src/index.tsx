import "./output.css";
import { createRoot } from "react-dom/client";
import * as React from "react";


const rootEl = document.getElementById("react-root");
if (!rootEl) throw new Error("No react-root element found in the DOM");

const root = createRoot(rootEl);
root.render(  <></>);

