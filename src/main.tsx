import React from "react";
import ReactDOM from "react-dom/client";
import "leaflet/dist/leaflet.css";
import "./index.css";

import App from "./App";
import { applyLeafletIconFix } from "./shared/leafletIconFix";

applyLeafletIconFix();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
