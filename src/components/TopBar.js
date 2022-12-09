import React, { Component } from "react";
import BackIcon from "../assets/back.png";
import CartIcon from "../assets/cart.png";

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        width: "calc(100% + 16px)",
        height: "96px",
        backgroundColor: "rgb(172, 15, 15)",
        margin: "-8px 0 0 -8px",
        display: "flex",
      },
      viewTextStyle: {
        width: "100%",
        textAlign: "center",
        marginTop: 48 - this.props.fontSize / 2,
        fontFamily: "HarlowSolidRegular",
        fontSize: this.props.fontSize * 1.2
      },
      iconStyle: {
        height: "48px",
        marginTop: "24px",
        padding: "4px",
      },
      textObject: {
        login: "Log In",
        register: "Register",
        cart: "Cart",
        home: "Order Now",
        location: "Location",
        menu: "Menu",
        user: "Profile",
        customizer: "Build a Pizza",
      },
      totalStyle: {
        fontSize: this.props.fontSize * 0.4,
        position: "fixed",
        right: 8,
        top: 62,
        backgroundColor: "rgba(255,255,255,.5)",
        width: 36,
        padding: 4,
        borderRadius: 8,
        border: "1px solid black",
        textAlign: "center",
        overFlow: "hidden",
      },
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    return (
      <div style={this.state.style}>
        <img
          style={this.state.iconStyle}
          alt="back"
          title="Back"
          src={BackIcon}
          onClick={() => {
            this.props.goBack();
          }}
        />
        <div style={this.state.viewTextStyle}>
          {this.state.textObject[this.props.text]}
        </div>
        <img
          style={{
            ...this.state.iconStyle,
            opacity: this.props.view === "cart" ? 1 : 0.5,
            height: this.props.total === 0 ? 48 : 40,
          }}
          alt="cart"
          title="Cart"
          src={CartIcon}
          onClick={() => {
            this.props.changeView("cart");
          }}
        />
        {this.props.total > 0 ? (
          <div
            style={this.state.totalStyle}
            onClick={() => {
              this.props.changeView("cart");
            }}
          >
            {this.props.total.toFixed(2)}
          </div>
        ) : null}
      </div>
    );
  }
}

export default TopBar;
