import "bootstrap";
import "office-ui-fabric-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import "../../Content/Site.scss";
import ConfigureStore from "../Store/configureStore";
import App from "./App";

const configuredStore = ConfigureStore();

const app = (
  <Provider store={configuredStore}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("app"));
