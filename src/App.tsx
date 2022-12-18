import { Routes, Route } from "@solidjs/router";
import { Component, lazy } from "solid-js";

const Home = lazy(() => import("./pages/Home"));
const Jedor = lazy(() => import("./pages/Jedor"));
const Customize = lazy(() => import("./pages/Customize"));

const App: Component = () => {
  return (
    <Routes>
      <Route path="/customize" component={Customize} />
      <Route path="/jedor" component={Jedor} />
      <Route path="/" component={Home} />
    </Routes>
  );
};

export default App;
