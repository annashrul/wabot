import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { RootContext } from "./Context";
import Login from "./others/auth/Login";
import Register from "./others/auth/Register";
import Page from "./pages/Page";
import "react-datetime/css/react-datetime.css";
import "./assets/scss/addon.css";
import "./assets/scss/datatable.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import AuthAPI from "./api/Auth";

const Provider = RootContext.Provider;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      user: {
        id: null,
        name: "",
        email: "",
      },
    };

    this.setValue = this.setValue.bind(this);
    this.fetchNow = this.fetchNow.bind(this);
  }

  setValue(target, data) {
    this.setState({
      [target]: data,
    });
  }

  fetchNow() {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        AuthAPI.get().then((result) => {
          if (result.status === 200) {
            this.setState({
              isLoading: false,
              user: result.data,
            });
          } else {
            localStorage.clear();
            window.location.reload();
          }
        });
      }
    );
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.fetchNow();
    }
  }

  render() {
    return (
      <Provider
        value={{
          get: this.state,
          set: this.setValue,
          fetch: this.fetchNow,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route
              path="/login"
              exact
              render={(props) => <Login {...props} />}
            />
            <Route
              path="/register"
              exact
              render={(props) => <Register {...props} />}
            />

            <Route
              path="/"
              exact
              render={(props) =>
                localStorage.getItem("token") ? (
                  <Page name="dashboard" {...props} />
                ) : (
                  <Route
                    path="/"
                    exact
                    render={(props) => <LandingPage {...props} />}
                  />
                )
              }
            />

            <Route
              path="/sessions"
              exact
              render={(props) => <Page name="sessions" {...props} />}
            />

            <Route
              path="/contact"
              exact
              render={(props) => <Page name="contact" {...props} />}
            />

            <Route
              path="/message"
              exact
              render={(props) => <Page name="message" {...props} />}
            />
            <Route
              path="/message/csv"
              exact
              render={(props) => <Page name="message/csv" {...props} />}
            />
            <Route
              path="/message/schedule"
              exact
              render={(props) => <Page name="message/schedule" {...props} />}
            />
            <Route
              path="/message/history"
              exact
              render={(props) => <Page name="message/history" {...props} />}
            />
            <Route
              path="/message/api"
              exact
              render={(props) => <Page name="message/api" {...props} />}
            />

            <Route
              path="/chatbot"
              exact
              render={(props) => <Page name="chatbot" {...props} />}
            />

            <Route
              path="/support"
              exact
              render={(props) => <Page name="support" {...props} />}
            />
            <Route
              path="/chatbot/:id"
              exact
              render={(props) => <Page name="diagram" {...props} />}
            />
            <Route
              path="/node/form"
              exact
              render={(props) => <Page name="node/form" {...props} />}
            />
            <Route
              path="/node/api"
              exact
              render={(props) => <Page name="node/api" {...props} />}
            />
            <Route
              path="/chatbot/test/:id"
              exact
              render={(props) => <Page name="diagram/diagramtest" {...props} />}
            />

            <Route path="/" render={(props) => <Page {...props} />} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
