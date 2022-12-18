/* @refresh reload */
import { Router } from "@solidjs/router";
import { render } from "solid-js/web";

import "./avro.js";
import "virtual:windi.css";
import App from "./App";

import { Buffer as BufferPolyfill } from "buffer";
declare var Buffer: typeof BufferPolyfill;
globalThis.Buffer = BufferPolyfill;

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);
