import React, { Component } from "react";
import Button from "../components/Button";
import Input from "../components/Input";

class Register extends Component {
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

  validateRegister() {
    if (this.props.content.username === "") {
      alert("Please enter a Username!");
    } else if (this.props.content.password === "") {
      alert("Please enter a password!");
    } else if (
      this.props.content.password !== this.props.content.verifyPassword
    ) {
      alert("Your passwords don't match!");
    } else if (this.props.content.email === "") {
      alert("Please enter an e-mail address!");
    } else {
      this.props.changeUser(
        this.props.content.username,
        this.props.content.password
      );
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
            view="register"
            attribute="username"
            placeholder="Username"
            value={this.props.content.username}
          />
          <Input
            style={this.state.inputStyle}
            updateValue={this.props.updateValue}
            view="register"
            type="password"
            attribute="password"
            placeholder="Password"
            value={this.props.content.password}
          />
          <Input
            style={this.state.inputStyle}
            updateValue={this.props.updateValue}
            view="register"
            type="password"
            attribute="verifyPassword"
            placeholder="Verify Password"
            value={this.props.content.verifyPassword}
          />
          <Input
            style={this.state.inputStyle}
            updateValue={this.props.updateValue}
            view="register"
            type="email"
            attribute="email"
            placeholder="E-Mail"
            value={this.props.content.email}
          />
          <Button
            onClick={this.validateRegister.bind(this)}
            style={{ ...this.state.buttonStyle, marginBottom: 12 }}
            text="Register"
          />
          <Button
            onClick={() => {
              this.props.changeView("login");
            }}
            style={{ ...this.state.buttonStyle, marginBottom: 0 }}
            text="Back to Log In"
          />
        </div>
      </div>
    );
  }
}

export default Register;
