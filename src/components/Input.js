import React, { Component } from "react";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      states: [
        "Select State",
        "AK",
        "AL",
        "AR",
        "AS",
        "AZ",
        "CA",
        "CO",
        "CT",
        "DC",
        "DE",
        "FL",
        "GA",
        "GU",
        "HI",
        "IA",
        "ID",
        "IL",
        "IN",
        "KS",
        "KY",
        "LA",
        "MA",
        "MD",
        "ME",
        "MI",
        "MN",
        "MO",
        "MP",
        "MS",
        "MT",
        "NC",
        "ND",
        "NE",
        "NH",
        "NJ",
        "NM",
        "NV",
        "NY",
        "OH",
        "OK",
        "OR",
        "PA",
        "PR",
        "RI",
        "SC",
        "SD",
        "TN",
        "TX",
        "UM",
        "UT",
        "VA",
        "VI",
        "VT",
        "WA",
        "WI",
        "WV",
        "WY",
      ],
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
    if (prevState.value !== this.state.value) {
      if (this.props.attribute === "phone") {
        var trueValue = this.state.value.replace("(", "");
        trueValue = trueValue.replace(")", "");
        trueValue = trueValue.replace(" ", "");
        trueValue = trueValue.replace("-", "");
        trueValue = trueValue.replace(/\D/g, "");
        if (trueValue.length > 0 && trueValue.length < 4) {
          trueValue = "(" + trueValue.substring(0, trueValue.length);
        } else if (trueValue.length > 3 && trueValue.length < 7) {
          trueValue =
            "(" +
            trueValue.substring(0, 3) +
            ") " +
            trueValue.substring(3, trueValue.length);
        } else if (trueValue.length > 6) {
          trueValue =
            "(" +
            trueValue.substring(0, 3) +
            ") " +
            trueValue.substring(3, 6) +
            "-" +
            trueValue.substring(6, trueValue.length);
        }
        this.setState({ value: trueValue }, () => {
          this.props.updateValue(
            this.props.view,
            this.props.attribute,
            trueValue
          );
        });
      } else if (this.props.attribute === "creditCard") {
        trueValue = this.state.value.replaceAll("-", "").replace(/\D/g, "");
        if (trueValue.length > 4 && trueValue.length < 9) {
          trueValue =
            trueValue.substring(0, 4) +
            "-" +
            trueValue.substring(4, trueValue.length);
        } else if (trueValue.length > 8 && trueValue.length < 13) {
          trueValue =
            trueValue.substring(0, 4) +
            "-" +
            trueValue.substring(4, 8) +
            "-" +
            trueValue.substring(8, trueValue.length);
        } else if (trueValue.length > 12) {
          trueValue =
            trueValue.substring(0, 4) +
            "-" +
            trueValue.substring(4, 8) +
            "-" +
            trueValue.substring(8, 12) +
            "-" +
            trueValue.substring(12, trueValue.length);
        }
        this.setState({ value: trueValue }, () => {
          this.props.updateValue(
            this.props.view,
            this.props.attribute,
            trueValue
          );
        });
      } else if (
        this.props.attribute === "zip" ||
        this.props.attribute === "billingZip"
      ) {
        trueValue = this.state.value.replaceAll("-", "").replace(/\D/g, "");
        this.setState({ value: trueValue }, () => {
          this.props.updateValue(
            this.props.view,
            this.props.attribute,
            trueValue
          );
        });
      } else if (this.props.attribute === "expDate") {
        trueValue = this.state.value.replaceAll("/", "").replace(/\D/g, "");
        if (trueValue.length > 2) {
          trueValue =
            trueValue.substring(0, 2) +
            "/" +
            trueValue.substring(2, trueValue.length);
        }
        this.setState({ value: trueValue }, () => {
          this.props.updateValue(
            this.props.view,
            this.props.attribute,
            trueValue
          );
        });
      } else if (this.props.attribute === "securityCode") {
        trueValue = this.state.value.replace(/\D/g, "");
        this.setState({ value: trueValue }, () => {
          this.props.updateValue(
            this.props.view,
            this.props.attribute,
            trueValue
          );
        });
      }
    }
  }

  componentWillUnmount() {}

  onChange(e) {
    this.setState({ value: e.target.value }, () => {
      this.props.updateValue(
        this.props.view,
        this.props.attribute,
        this.state.value
      );
      //this.props.onChange(e);
    });
  }

  render() {
    return (
      <div>
        {this.props.attribute !== "state" ? (
          <input
            maxLength={
              this.props.attribute === "phone"
                ? 14
                : this.props.attribute === "zip" ||
                  this.props.attribute === "billingZip"
                ? 5
                : this.props.attribute === "creditCard"
                ? 19
                : this.props.attribute === "expDate"
                ? 7
                : this.props.attribute === "securityCode"
                ? 3
                : 255
            }
            type={this.props.type}
            style={this.props.style}
            value={this.state.value}
            disabled={this.props.disabled}
            onChange={this.onChange.bind(this)}
            placeholder={this.props.placeholder}
          />
        ) : (
          <select
            value={this.state.value}
            style={this.props.style}
            onChange={this.onChange.bind(this)}
            disabled={this.props.disabled}
          >
            {this.state.states.map((state) => {
              return (
                <option key={state}>
                  {state}
                </option>
              );
            })}
          </select>
        )}
      </div>
    );
  }
}

export default Input;
