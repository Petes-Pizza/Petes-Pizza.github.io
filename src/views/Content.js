import React, { Component } from "react";
import LogIn from "./LogIn";
import Register from "./Register";
import Home from "./Home";
import Location from "./Location";
import Menu from "./Menu";
import Cart from "./Cart";
import User from "./User";
import Customizer from "./Customizer";
import BackgroundImage from "../assets/background1.jpg";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerRef: React.createRef(),
      style: {
        width: "calc(100% + 16px)",
        backgroundColor: "rgb(200,200,200)",
        marginLeft: "-8px",
        overflowX: "hidden",
        overflowY: "auto",
        backgroundImage: `url(${BackgroundImage})`,
        //backgroundSize: "145vh",
      },
    };
  }

  componentDidMount() {
    this.updateBackground();
  }

  updateBackground() {
    const backgroundImage = new Image();
    backgroundImage.src = BackgroundImage;
    backgroundImage.onload = () => {
      const style = { ...this.state.style };
      if (
        this.state.containerRef.current.offsetWidth /
          this.state.containerRef.current.offsetHeight <
        backgroundImage.width / backgroundImage.height
      ) {
        style.backgroundSize = "auto 100%";
      } else {
        style.backgroundSize = "100% auto";
      }
      this.setState({ style });
    };
  }

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    return (
      <div
        ref={this.state.containerRef}
        style={{
          ...this.state.style,
          height: "calc(100vh - 186px)",
          //this.props.osName === "Android"
          //? "calc(100vh - 240px)"
          //: "calc(100vh - 186px)",
        }}
      >
        {this.props.view === "login" ? (
          <LogIn
            content={this.props.content[this.props.view]}
            changeUser={this.props.changeUser}
            changeView={this.props.changeView}
            updateValue={this.props.updateValue}
            fontSize={this.props.fontSize}
          />
        ) : null}
        {this.props.view === "register" ? (
          <Register
            content={this.props.content[this.props.view]}
            changeView={this.props.changeView}
            changeUser={this.props.changeUser}
            updateValue={this.props.updateValue}
            fontSize={this.props.fontSize}
          />
        ) : null}
        {this.props.view === "home" ? (
          <Home
            content={this.props.content[this.props.view]}
            fontSize={this.props.fontSize}
            updateValue={this.props.updateValue}
            changeView={this.props.changeView}
          />
        ) : null}
        {this.props.view === "location" ? (
          <Location
            content={this.props.content[this.props.view]}
            fontSize={this.props.fontSize}
            updateValue={this.props.updateValue}
            franchiseLocations={this.props.franchiseLocations}
            loggedIn={this.props.loggedIn}
            changeView={this.props.changeView}
          />
        ) : null}
        {this.props.view === "menu" ? (
          <Menu
            changeView={this.props.changeView}
            updateValue={this.props.updateValue}
            content={this.props.content[this.props.view]}
            fontSize={this.props.fontSize}
            addToCart={this.props.addToCart}
            setNotification={this.props.setNotification}
            setPrompt={this.props.setPrompt}
            menu={this.props.menu}
          />
        ) : null}
        {this.props.view === "cart" ? (
          <Cart
            content={this.props.content[this.props.view]}
            changeView={this.props.changeView}
            updateValue={this.props.updateValue}
            fontSize={this.props.fontSize}
            setPrompt={this.props.setPrompt}
            placeOrder={this.props.placeOrder}
            loggedIn={this.props.loggedIn}
          />
        ) : null}
        {this.props.view === "customizer" ? (
          <Customizer
            changeView={this.props.changeView}
            content={this.props.content[this.props.view]}
            addPizzaToCart={this.props.addPizzaToCart}
            removePizzaFromCart={this.props.removePizzaFromCart}
            updateValue={this.props.updateValue}
            fontSize={this.props.fontSize}
            osName={this.props.osName}
            calculateTotals={this.props.calculateTotals}
          />
        ) : null}
        {this.props.view === "user" ? (
          <User
            content={this.props.content[this.props.view]}
            logOut={this.props.logOut}
            updateValue={this.props.updateValue}
            fontSize={this.props.fontSize}
          />
        ) : null}
      </div>
    );
  }
}

export default Content;
