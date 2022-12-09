import React, { Component } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: { textAlign: "center", fontSize: this.props.fontSize * 0.8 },
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
        textAlign: "center",
        backgroundColor: "rgba(172, 15, 15, .8)",
        border: "1px solid black",
        color: "white",
        textShadow:
          "-1px -1px 0 #000000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
      },
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    return (
      <div style={this.state.style}>
        <div className="box">
          Your Information
          <hr />
          <Input
            style={this.state.inputStyle}
            type="text"
            updateValue={this.props.updateValue}
            view="user"
            attribute="firstName"
            placeholder="First Name"
            value={this.props.content.firstName}
          />
          <Input
            style={this.state.inputStyle}
            type="text"
            updateValue={this.props.updateValue}
            view="user"
            attribute="lastName"
            placeholder="Last Name"
            value={this.props.content.lastName}
          />
          <Input
            style={this.state.inputStyle}
            type="tel"
            updateValue={this.props.updateValue}
            view="user"
            attribute="phone"
            placeholder="Phone Number"
            value={this.props.content.phone}
          />
          <Input
            style={this.state.inputStyle}
            type="text"
            updateValue={this.props.updateValue}
            view="user"
            attribute="email"
            placeholder="E-mail Address"
            value={this.props.content.email}
          />
        </div>
        <div className="box">
          Address
          <hr />
          <Input
            style={this.state.inputStyle}
            type="text"
            updateValue={this.props.updateValue}
            view="user"
            attribute="streetAddress"
            placeholder="Address"
            value={this.props.content.streetAddress}
          />
          <Input
            style={this.state.inputStyle}
            type="text"
            updateValue={this.props.updateValue}
            view="user"
            attribute="city"
            placeholder="City"
            value={this.props.content.city}
          />
          <Input
            style={this.state.inputStyle}
            type="text"
            updateValue={this.props.updateValue}
            view="user"
            attribute="state"
            placeholder="State"
            value={this.props.content.state}
          />
          <Input
            style={this.state.inputStyle}
            type="tel"
            updateValue={this.props.updateValue}
            view="user"
            attribute="zip"
            placeholder="Zip Code"
            value={this.props.content.zip}
          />
        </div>
        <div className="box">
          Card Information
          <hr />
          <Input
            style={this.state.inputStyle}
            type="tel"
            updateValue={this.props.updateValue}
            view="user"
            attribute="creditCard"
            placeholder="Card Number"
            value={this.props.content.creditCard}
          />
          <Input
            style={this.state.inputStyle}
            type="tel"
            updateValue={this.props.updateValue}
            view="user"
            attribute="expDate"
            placeholder="Expiration Date (MM/YYYY)"
            value={this.props.content.expDate}
          />
          <Input
            style={this.state.inputStyle}
            type="tel"
            updateValue={this.props.updateValue}
            view="user"
            attribute="securityCode"
            placeholder="Security Code"
            value={this.props.content.securityCode}
          />
          <Input
            style={this.state.inputStyle}
            type="tel"
            updateValue={this.props.updateValue}
            view="user"
            attribute="billingZip"
            placeholder="Billing Zip Code"
            value={this.props.content.billingZip}
          />
          <Button
            onClick={this.props.logOut}
            style={this.state.buttonStyle}
            text="Log Out"
          />
        </div>
      </div>
    );
  }
}

export default User;
