import React, { Component } from "react";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        display: "flex",
        border: "1px solid black",
        marginBottom: "8px",
        padding: "8px",
        borderRadius: "16px",
      },
      itemStyle: { width: "100%" },
      iconStyle: { height: 40, width: 40 },
      labelStyle: { display: "flex" },
      valueStyle: { display: "flex" },
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  click() {
    if (this.props.item.pizza === null) {
      this.props.setPrompt(
        "Quantity:",
        "quantity",
        -1,
        this.props.index,
        this.props.item.quantity
      );
    } else {
      this.props.updateValue(
        "customizer",
        "pizzaId",
        this.props.item.pizza.getId(),
        () => {
          this.props.updateValue(
            "customizer",
            "pizza",
            this.props.item.pizza,
            () => {
              this.props.updateValue("customizer", "edit", true, () => {
                this.props.changeView("customizer");
              });
            }
          );
        }
      );
    }
  }

  render() {
    return (
      <div style={this.state.style} onClick={this.click.bind(this)}>
        <div style={this.state.itemStyle}>
          {this.props.item.productName}
          <hr />
          {this.props.item.pizza === null ? null : (
            <div>
              {this.props.item.pizza.toString(false)}
              <hr />
            </div>
          )}
          <div style={this.state.labelStyle}>
            <div
              style={{
                width: this.props.item.size === "" ? "50%" : "33%",
              }}
            >
              Quantity
            </div>
            {this.props.item.size !== "" ? (
              <div
                style={{
                  width: "33%",
                }}
              >
                Size
              </div>
            ) : null}
            <div
              style={{
                width: this.props.item.size === "" ? "50%" : "33%",
              }}
            >
              Price
            </div>
          </div>
          <div style={this.state.valueStyle}>
            <div
              style={{
                width: this.props.item.size === "" ? "50%" : "33%",
              }}
            >
              {this.props.item.quantity}
            </div>
            {this.props.item.size !== "" ? (
              <div style={{ width: "33%" }}>{this.props.item.size}</div>
            ) : null}
            <div
              style={{
                width: this.props.item.size === "" ? "50%" : "33%",
              }}
            >
              {(this.props.item.cost * this.props.item.quantity).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
