import * as React from "react";
import { Route, Switch } from "react-router-dom";
import * as Path from "./Paths";
import HomePage from "../Components/Home/HomePage";
import HomePage2 from "../Components/Home/HomePage2";

export default function Routes() {
  return (
    <Switch>
      <Route exact={true} path={Path.homePath} component={HomePage} />
      <Route component={HomePage2} />
    </Switch>
  );
}
