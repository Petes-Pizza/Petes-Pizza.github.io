import React, { Component } from "react";
import HomeIcon from "../assets/home.png";
import LocationIcon from "../assets/location.png";
import MenuIcon from "../assets/menu.png";
import UserIcon from "../assets/user.png";

class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        width: "calc(100% + 16px)",
        backgroundColor: "rgb(172, 15, 15)",
        marginLeft: "-8px",
        marginBottom: "-8px",
        display: "flex",
        justifyContent: "space-between",
      },
      iconStyle: {
        height: "48px",
        marginTop: "24px",
        padding: "4px",
      },
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    return (
      <div
        style={{
          ...this.state.style,
          height: "96px", //this.props.osName === "Android" ? "144px" : "96px",
        }}
      >
        <img
          style={{
            ...this.state.iconStyle,
            opacity: this.props.view === "home" ? 1 : 0.5,
          }}
          alt="home"
          title="home"
          src={HomeIcon}
          onClick={() => {
            this.props.changeView("home");
          }}
        />
        <img
          style={{
            ...this.state.iconStyle,
            opacity: this.props.view === "location" ? 1 : 0.5,
          }}
          alt="location"
          title="Location"
          src={LocationIcon}
          onClick={() => {
            this.props.changeView("location");
          }}
        />
        <img
          style={{
            ...this.state.iconStyle,
            opacity: this.props.view === "menu" ? 1 : 0.5,
          }}
          alt="menu"
          title="Menu"
          src={MenuIcon}
          onClick={() => {
            this.props.changeView("menu");
          }}
        />
        <img
          style={{
            ...this.state.iconStyle,
            opacity:
              this.props.view === "user" ||
              this.props.view === "login" ||
              this.props.view === "register"
                ? 1
                : 0.5,
          }}
          alt="user"
          title="User Profile"
          src={UserIcon}
          onClick={() => {
            this.props.changeView("user");
          }}
        />
      </div>
    );
  }
}

export default BottomBar;
