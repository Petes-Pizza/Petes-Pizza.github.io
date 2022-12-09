import React, { Component } from "react";
import Button from "../components/Button";
import Input from "../components/Input";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: { textAlign: "center" },
      inputStyle: {
        width: "calc(100% - 32px)",
        height: this.props.fontSize,
        fontSize: this.props.fontSize * 0.75,
        margin: "8px",
        textAlign: "center",
        borderRadius: "8px",
      },
      buttonStyle: {
        width: "calc(100% - 24px)",
        fontSize: this.props.fontSize * 0.8,
        margin: "8px",
      },
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  validateLogIn() {
    if (
      this.props.content.username !== "" &&
      this.props.content.password !== ""
    ) {
      this.props.changeUser(
        this.props.content.username,
        this.props.content.password
      );
    } else {
      alert("Incorrect Username or Password");
    }
  }

  render() {
    return (
      <div style={this.state.style}>
        <div className="box">
          <Input
            style={this.state.inputStyle}
            type="text"
            updateValue={this.props.updateValue}
            view="login"
            attribute="username"
            placeholder="Username"
            value={this.props.content.username}
          />
          <Input
            style={this.state.inputStyle}
            updateValue={this.props.updateValue}
            view="login"
            type="password"
            attribute="password"
            placeholder="Password"
            value={this.props.content.password}
          />
          <Button
            onClick={this.validateLogIn.bind(this)}
            style={{ ...this.state.buttonStyle, marginBottom: 12 }}
            text="Log In"
          />
          <Button
            onClick={() => {
              this.props.changeView("register");
            }}
            style={{ ...this.state.buttonStyle, marginBottom: 0 }}
            text="Create an Account"
          />
        </div>
      </div>
    );
  }
}

export default LogIn;
