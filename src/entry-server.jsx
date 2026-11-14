import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";

export function renderHome() {
  return renderToString(<App />);
}
export function renderPage(path) {
  return renderToString(<App path={path} />);
}
