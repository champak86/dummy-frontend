import React from "react";
import { Switch, Route } from "react-router-dom";
import Admin from "./pages/admin";
import ProductList from "./pages/productList";
import Record from "./pages/record";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Record />
      </Route>
      <Route path="/products">
        <ProductList />
      </Route>
      <Route path="/admin">
        <Admin />
      </Route>
    </Switch>
  );
}
