import React from "react";
import ReactDOM from "react-dom";
import { App } from "./js/App";
import './css/styles.scss'

ReactDOM.render(
    <App totalSteps={8} />,
    document.getElementById("root")
);
