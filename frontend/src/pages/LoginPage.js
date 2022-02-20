import React from "react";
import ButtonWithProgress from "../components/ButtonWithProgress";
import Input from "../components/Input";
import { connect } from "react-redux";
import * as authActions from "../Redux/authActions";
import "../App.css";
export class LoginPage extends React.Component {
  state = {
    username: "",
    password: "",
    apiError: undefined,
    pendingApiCall: false,
  };

  onChangeUserName = (e) => {
    let value = e.target.value;
    this.setState({
      username: value,
      apiError: undefined,
    });
  };
  onChangePassword = (e) => {
    let value = e.target.value;
    this.setState({
      password: value,
      apiError: undefined,
    });
  };
  onClickLogin = (e) => {
    this.setState({ pendingApiCall: true });
    const body = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.actions
      .postLogin(body)
      .then((response) => {
        this.setState({ pendingApiCall: false }, () => {
          this.props.history.push("/");
        });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ apiError: error.response.data.message });
          this.setState({ pendingApiCall: false });
        }
      });
  };
  render() {
    let disableLogin = false;
    if (this.state.username === "" || this.state.password === "") {
      disableLogin = true;
    }
    return (
      <div className="container">
        <div className="login-signup-container">
          <h1 className="text-center">Login</h1>
          <div className="col-12 mb-3">
            <Input
              label="Username :"
              placeholder="Your username"
              onChange={this.onChangeUserName}
            />
          </div>
          <div className="col-12 mb-3">
            <Input
              label="Password :"
              placeholder="Your password"
              type="password"
              onChange={this.onChangePassword}
            />
          </div>
          {this.state.apiError !== undefined && (
            <div className="col-12 mb-3">
              <div className="alert alert-danger" role="alert">
                {this.state.apiError}
              </div>
            </div>
          )}
          <div className="text-center">
            <ButtonWithProgress
              onClick={this.onClickLogin}
              disabled={disableLogin || this.state.pendingApiCall}
              text="Login"
              pendingApiCall={this.state.pendingApiCall}
            />
          </div>
        </div>
      </div>
    );
  }
}
LoginPage.defaultProps = {
  actions: {
    postLogin: () => new Promise((resolve, reject) => resolve({})),
  },
  history: {
    push: () => {},
  },
  dispatch: () => {},
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      postLogin: (body) => dispatch(authActions.loginHandler(body)),
    },
  };
};
export default connect(null, mapDispatchToProps)(LoginPage);