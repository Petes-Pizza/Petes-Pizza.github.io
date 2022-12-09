import React, { Component } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputStyle: {
        width: "calc(100% - 32px)",
        height: this.props.fontSize,
        fontSize: this.props.fontSize * 0.75,
        margin: "8px",
        textAlign: "center",
        borderRadius: "8px",
      },
      style: {
        fontSize: this.props.fontSize * 0.8,
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

  onUseHomeChange(e) {
    this.props.updateValue("location", "useHome", e.target.checked);
  }

  onLocationOptionChange(e) {
    this.props.updateValue(
      "location",
      "pickup",
      e.target.checked && e.target.attributes.value.value === "takeOut"
        ? -1
        : false
    );
  }

  onLocationChange(e) {
    if (e.target.checked) {
      this.props.updateValue(
        "location",
        "pickup",
        parseInt(e.target.attributes.value.value)
      );
    }
  }

  render() {
    return (
      <div style={this.state.style}>
        <div className="box">
          <input
            type="radio"
            id="takeOut"
            name="locationOption"
            value="takeOut"
            checked={
              this.props.content["pickup"] !== null &&
              this.props.content["pickup"] !== false
            }
            onChange={this.onLocationOptionChange.bind(this)}
          />
          <label htmlFor="takeOut">Take Out</label>
          <br />
          <input
            type="radio"
            id="delivery"
            name="locationOption"
            value="delivery"
            checked={this.props.content["pickup"] === false}
            onChange={this.onLocationOptionChange.bind(this)}
          />
          <label htmlFor="delivery">Delivery</label>
        </div>

        {this.props.content["pickup"] !== false &&
        this.props.content["pickup"] !== null ? (
          <div className="box">
            Franchise Locations
            <hr />
            {this.props.franchiseLocations.map((location) => {
              return (
                <div key={"location" + location.id}>
                  <input
                    type="radio"
                    id={"location" + location.id}
                    name="locations"
                    value={location.id}
                    checked={this.props.content["pickup"] === location.id}
                    onChange={this.onLocationChange.bind(this)}
                  />
                  <label htmlFor={"location" + location.id}>
                    {location.streetAddress +
                      ", " +
                      location.city +
                      ", " +
                      location.state +
                      ", " +
                      location.zip +
                      "."}
                  </label>
                </div>
              );
            })}
            <hr />
            <Button
              text="Continue to Menu"
              style={this.state.buttonStyle}
              onClick={() => {
                this.props.changeView("menu");
              }}
            />
          </div>
        ) : null}
        {this.props.content["pickup"] === false ? (
          <div className="box">
            Delivery Location
            <hr />
            {this.props.loggedIn ? (
              <div>
                <input
                  type="checkbox"
                  id="useHome"
                  onChange={this.onUseHomeChange.bind(this)}
                  checked={this.props.content["useHome"]}
                />
                <label htmlFor="useHome">Use Home Address</label>
              </div>
            ) : null}
            <Input
              disabled={this.props.content["useHome"]}
              style={this.state.inputStyle}
              type="text"
              updateValue={this.props.updateValue}
              view="location"
              attribute="streetAddress"
              placeholder="Street Address"
              value={this.props.content.streetAddress}
            />
            <Input
              disabled={this.props.content["useHome"]}
              style={this.state.inputStyle}
              type="text"
              updateValue={this.props.updateValue}
              view="location"
              attribute="city"
              placeholder="City"
              value={this.props.content.city}
            />
            <Input
              disabled={this.props.content["useHome"]}
              style={this.state.inputStyle}
              type="text"
              updateValue={this.props.updateValue}
              view="location"
              attribute="state"
              placeholder="State"
              value={this.props.content.state}
            />
            <Input
              disabled={this.props.content["useHome"]}
              style={this.state.inputStyle}
              type="text"
              updateValue={this.props.updateValue}
              view="location"
              attribute="zip"
              placeholder="Zip Code"
              value={this.props.content.zip}
            />
            <hr />
            <Button
              text="Continue to Menu"
              style={this.state.buttonStyle}
              onClick={() => {
                this.props.changeView("menu");
              }}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Location;
