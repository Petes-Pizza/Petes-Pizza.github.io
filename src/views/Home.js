import React, { Component } from "react";
import Button from "../components/Button";
import BrandLogo from "../assets/brand_logo.png";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {},
      buttonStyle: {
        width: "calc(100% - 24px)",
        fontSize: this.props.fontSize * 0.8,
        margin: "8px",
        textAlign: "center",
        backgroundColor: "rgba(172, 15, 15, .8)",
        border: "1px solid black",
      },
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  selectTakeOut(status) {
    this.props.updateValue(
      "location",
      "pickup",
      status === "takeout" ? -1 : false
    );
    this.props.changeView("location");
  }

  render() {
    return (
      <div style={this.state.style}>
        <div className="box">
          <img
            src={BrandLogo}
            style={{ width: "calc(100% - 16px)" }}
            alt="Pete's Pizza Logo"
          />
        </div>
        <Button
          onClick={() => {
            this.selectTakeOut("takeout");
          }}
          style={this.state.buttonStyle}
          text="Take Out"
        />
        <Button
          onClick={() => {
            this.selectTakeOut("delivery");
          }}
          style={this.state.buttonStyle}
          text="Delivery"
        />
      </div>
    );
  }
}

export default Home;
