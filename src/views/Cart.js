import React, { Component } from "react";
import CartItem from "../components/CartItem";
import Input from "../components/Input";
import Button from "../components/Button";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        fontSize: this.props.fontSize * 0.7,
      },
      inputStyle: {
        width: "calc(100% - 32px)",
        height: this.props.fontSize,
        fontSize: this.props.fontSize * 0.75,
        margin: "2px",
        textAlign: "center",
        borderRadius: "8px",
      },
      buttonStyle: {
        width: "calc(100% - 24px)",
        fontSize: this.props.fontSize,
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

  onPaymentOptionChange(e) {
    if (e.target.checked) {
      this.props.updateValue(
        "cart",
        "cash",
        e.target.attributes.value.value === "true"
      );
    }
  }

  onUseSavedCardChange(e) {
    this.props.updateValue("cart", "useSavedCard", e.target.checked);
  }

  render() {
    return (
      <div style={this.state.style}>
        <div className="box">
          Items
          <hr />
          {this.props.content.items.length === 0
            ? "You haven't chosen any items yet!"
            : ""}
          {this.props.content.items.map((item, i) => {
            if (item.pizza !== null) {
              item = item.pizza.getForCart();
            }
            return (
              <CartItem
                key={"item" + i}
                item={item}
                fontSize={this.props.fontSize}
                updateValue={this.props.updateValue}
                changeView={this.props.changeView}
                setPrompt={this.props.setPrompt}
                index={i}
              />
            );
          })}
        </div>
        <div className="box">
          {this.props.content.pickup ? "Take Out from" : "Delivery to"}
          <hr />
          {this.props.content.location.streetAddress === "" ||
          this.props.content.location.city === "" ||
          this.props.content.location.state === "" ||
          this.props.content.location.state === "Select State" ||
          this.props.content.location.zip === "" ? (
            this.props.content.pickup ? (
              "You need to select a location!"
            ) : (
              "The Address you entered is incomplete!"
            )
          ) : (
            <div>
              {this.props.content.location.streetAddress}
              <br />
              {this.props.content.location.city +
                ", " +
                this.props.content.location.state +
                " " +
                this.props.content.location.zip}
            </div>
          )}
        </div>
        <div className="box">
          Payment
          <hr />
          <input
            type="radio"
            id="cash"
            name="paymentOption"
            value={true}
            checked={this.props.content.payment.cash}
            onChange={() => {}}
            onClick={this.onPaymentOptionChange.bind(this)}
          />
          <label htmlFor="cash">Cash</label>
          <br />
          <input
            type="radio"
            id="card"
            name="paymentOption"
            value={false}
            checked={this.props.content.payment.cash === false}
            onChange={() => {}}
            onClick={this.onPaymentOptionChange.bind(this)}
          />
          <label htmlFor="card">Card</label>
          <br />
          {this.props.content.payment.cash ||
          this.props.loggedIn === false ? null : (
            <div>
              <input
                type="checkbox"
                id="useSavedCard"
                checked={this.props.content.payment.useSavedCard}
                onChange={this.onUseSavedCardChange.bind(this)}
              />
              <label htmlFor="useSavedCard">Use Saved Card</label>
            </div>
          )}
          {this.props.content.payment.cash ? null : (
            <div>
              <Input
                style={this.state.inputStyle}
                disabled={this.props.content.payment.useSavedCard}
                type="tel"
                updateValue={this.props.updateValue}
                view="cart"
                attribute="creditCard"
                placeholder="Card Number"
                value={this.props.content.payment.creditCard}
              />
              <Input
                style={this.state.inputStyle}
                disabled={this.props.content.payment.useSavedCard}
                type="tel"
                updateValue={this.props.updateValue}
                view="cart"
                attribute="expDate"
                placeholder="Expiration Date (MM/YYYY)"
                value={this.props.content.payment.expDate}
              />
              <Input
                style={this.state.inputStyle}
                disabled={this.props.content.payment.useSavedCard}
                type="tel"
                updateValue={this.props.updateValue}
                view="cart"
                attribute="securityCode"
                placeholder="Security Code"
                value={this.props.content.payment.securityCode}
              />
              <Input
                style={this.state.inputStyle}
                disabled={this.props.content.payment.useSavedCard}
                type="tel"
                updateValue={this.props.updateValue}
                view="cart"
                attribute="billingZip"
                placeholder="Billing Zip Code"
                value={this.props.content.payment.billingZip}
              />
            </div>
          )}
        </div>
        <div className="box">
          Total
          <hr />
          Subtotal:{" " + this.props.content.subtotal.toFixed(2)}
          <br />
          Tax:{" " + this.props.content.tax.toFixed(2)}
          <br />
          {this.props.content.pickup ? null : (
            <div>
              Delivery Fee:{" " + this.props.content.deliveryFee.toFixed(2)}
              <br />
            </div>
          )}
          Total:{" " + this.props.content.total.toFixed(2)}
          <hr />
          <Button
            onClick={this.props.placeOrder.bind(this)}
            style={this.state.buttonStyle}
            text="Place Order"
          />
        </div>
      </div>
    );
  }
}

export default Cart;
