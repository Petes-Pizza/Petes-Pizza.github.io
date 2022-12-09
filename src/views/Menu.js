import React, { Component } from "react";
import Pizza from "../data/pizza.js";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: { fontSize: this.props.fontSize * 0.8 },
      menuItemStyle: { display: "flex" },
      menuItemNameStyle: { padding: 8, width: "50%" },
      menuItemPriceStyle: {
        display: "flex",
        width: "50%",
        textAlign: "center",
        justifyContent: "center",
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
          Appetizers
          <hr />
          {this.props.menu.items.map((item) => {
            return item.category === "appetizer" ? (
              <div
                key={item.category + item.id}
                style={this.state.menuItemStyle}
                onClick={() => {
                  this.props.setPrompt("Quantity:", "quantity", item.id, -1, 1);
                }}
              >
                <div style={this.state.menuItemNameStyle}>{item.name}</div>
                <div style={this.state.menuItemPriceStyle}>
                  {item.prices.map((price, i) => {
                    return (
                      <div
                        style={{ margin: 8 }}
                        key={item.category + item.id + i}
                      >
                        {price}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null;
          })}
        </div>
        <div className="box">
          Pizzas
          <hr />
          <div style={this.state.menuItemStyle}>
            <div style={this.state.menuItemNameStyle}></div>
            <div style={this.state.menuItemPriceStyle}>
              <div
                style={{
                  margin: 4,
                  fontSize: this.props.fontSize * 0.6,
                  paddingTop: 8,
                  width: this.props.fontSize * 0.6 * 2,
                }}
              >
                S
              </div>
              <div
                style={{
                  margin: 4,
                  fontSize: this.props.fontSize * 0.6,
                  paddingTop: 8,
                  width: this.props.fontSize * 0.6 * 2,
                }}
              >
                M
              </div>
              <div
                style={{
                  margin: 4,
                  fontSize: this.props.fontSize * 0.6,
                  paddingTop: 8,
                  width: this.props.fontSize * 0.6 * 2,
                }}
              >
                L
              </div>
            </div>
          </div>
          {this.props.menu.items.map((item, i) => {
            return item.category === "pizza" ? (
              <div
                key={item.category + item.id}
                style={this.state.menuItemStyle}
                onClick={() => {
                  if (item.id !== 3) {
                    this.props.setPrompt(
                      "Enter Pizza Size",
                      "pizza",
                      item.id,
                      i,
                      1
                    );
                  } else {
                    const newPizza = new Pizza();
                    this.props.updateValue(
                      "customizer",
                      "pizzaId",
                      newPizza.getId(),
                      () => {
                        this.props.updateValue(
                          "customizer",
                          "pizza",
                          newPizza,
                          () => {
                            this.props.updateValue(
                              "customizer",
                              "edit",
                              false,
                              () => {
                                this.props.changeView("customizer");
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                }}
              >
                <div style={this.state.menuItemNameStyle}>{item.name}</div>
                <div style={this.state.menuItemPriceStyle}>
                  {item.prices.map((price, i) => {
                    return (
                      <div
                        style={{
                          margin: 4,
                          fontSize: this.props.fontSize * 0.6,
                          paddingTop: 8,
                        }}
                        key={item.category + item.id + i}
                      >
                        {price}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null;
          })}
        </div>
        <div className="box">
          Beverages
          <hr />
          <div style={this.state.menuItemStyle}>
            <div style={this.state.menuItemNameStyle}></div>
            <div style={this.state.menuItemPriceStyle}>
              <div
                style={{
                  margin: 4,
                  fontSize: this.props.fontSize * 0.6,
                  paddingTop: 8,
                  width: this.props.fontSize * 0.6 * 2 + 8,
                }}
              >
                20 oz.
              </div>
              <div
                style={{
                  margin: 4,
                  fontSize: this.props.fontSize * 0.6,
                  paddingTop: 8,
                  width: this.props.fontSize * 0.6 * 2,
                }}
              >
                2 lt.
              </div>
            </div>
          </div>
          {this.props.menu.items.map((item, i) => {
            return item.category === "beverage" ? (
              <div
                key={item.category + item.id}
                style={this.state.menuItemStyle}
                onClick={() => {
                  this.props.setPrompt(
                    "Enter Beverage Size",
                    "beverage",
                    item.id,
                    i,
                    1
                  );
                }}
              >
                <div style={this.state.menuItemNameStyle}>{item.name}</div>
                <div style={this.state.menuItemPriceStyle}>
                  {item.prices.map((price, i) => {
                    return (
                      <div
                        style={{ margin: 8 }}
                        key={item.category + item.id + i}
                      >
                        {price}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null;
          })}
        </div>
      </div>
    );
  }
}

export default Menu;
