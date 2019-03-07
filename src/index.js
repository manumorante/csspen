import React from "react";
import ReactDOM from "react-dom";
import { Results } from "./js/Results";
import './css/styles.scss'

ReactDOM.render(
    <div id="index">
        <Results step="5" />
    </div>,
    document.getElementById("root")
);