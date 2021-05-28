import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import { Provider } from "react-redux";
import { store } from "./redux";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={Layout} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
