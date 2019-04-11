import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Dispatch } from "redux";
import { IStateStore } from "../../Store/IStateStore";
import ActionTypes from "../Actions/ActionTypes";
import ErrorBoundary from "../Components/Shared/ErrorBoundary";
import Routes from "../Routes/Routes";

class App extends React.Component<RouteComponentProps> {
  constructor(props: RouteComponentProps) {
    super(props);
  }

  public render() {
    return (
      <>
        <div className="app-header" />
        <div className="app-body">
          <ErrorBoundary location={this.props.location}>
            <Routes />
          </ErrorBoundary>
        </div>
      </>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch<ActionTypes>) {
  return {};
}

function mapStateToProps(state: IStateStore) {
  return {};
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
