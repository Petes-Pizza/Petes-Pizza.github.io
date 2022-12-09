import React, { Component } from "react";
import Button from "./Button";

class PromptModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.quantity,
      selection: null,
      backgroundStyle: {
        backgroundColor: "rgba(0,0,0,0)",
        position: "fixed",
        zIndex: 1,
        width: "100vw",
        height: "100vh",
        left: 0,
        top: 0,
      },
      modalStyle: {
        position: "fixed",
        backgroundColor: "rgb(172, 15, 15)",
        width: "60%",
        margin: 0,
        left: "calc(20% - 16px)",
        top: 100,
        zIndex: 2,
        boxShadow: "3px 3px 5px black",
        border: "1px solid black",
        opacity: 0.9,
        fontSize: this.props.fontSize * 0.8,
        color: "white",
        textShadow:
          "-1px -1px 0 #000000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
      },
      buttonStyle: {
        width: "calc(100% - 24px)",
        fontSize: this.props.fontSize * 0.8,
        margin: "8px",
      },
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  onSizeChange(e) {
    this.setState({ selection: parseInt(e.target.attributes.value.value) });
  }

  handleAccept(e) {
    if (this.props.promptType === "quantity") {
      if (this.props.productId === -1) {
        this.props.updateCartItemQuantity(
          this.props.cartItemIndex,
          this.state.quantity
        );
        this.props.setPrompt(false, this.props.promptType, 1, -1);
      } else {
        this.props.addToCart(this.props.productId, 0, this.state.quantity);
        this.props.setPrompt(false, this.props.promptType, 1, -1);
      }
    } else {
      if (this.state.selection !== null) {
        this.props.addToCart(
          this.props.productId,
          this.state.selection,
          this.state.quantity
        );
      }
      this.props.setPrompt(false, this.props.promptType, 1, -1);
    }
  }

  handleCancel() {
    this.props.setPrompt(false, this.props.promptType, 1, -1);
  }

  render() {
    return (
      <div style={this.state.backgroundStyle}>
        <div style={this.state.modalStyle} className="box">
          {this.props.text}
          <hr />
          {this.props.promptType === "pizza" ? (
            <div>
              <div>
                <input
                  type="radio"
                  id="small"
                  name="sizeOption"
                  value={0}
                  checked={this.state.selection === 0}
                  onChange={this.onSizeChange.bind(this)}
                />
                <label htmlFor="small">Small</label>
                <br />
                <input
                  type="radio"
                  id="medium"
                  name="sizeOption"
                  value={1}
                  checked={this.state.selection === 1}
                  onChange={this.onSizeChange.bind(this)}
                />
                <label htmlFor="medium">Medium</label>
                <br />
                <input
                  type="radio"
                  id="large"
                  name="sizeOption"
                  value={2}
                  checked={this.state.selection === 2}
                  onChange={this.onSizeChange.bind(this)}
                />
                <label htmlFor="large">Large</label>
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div
                  onClick={() => {
                    this.setState({
                      quantity:
                        this.state.quantity > 1 ? this.state.quantity - 1 : 1,
                    });
                  }}
                >
                  &#60;
                </div>
                {this.state.quantity}
                <div
                  onClick={() => {
                    this.setState({
                      quantity: this.state.quantity + 1,
                    });
                  }}
                >
                  &#62;
                </div>
              </div>
            </div>
          ) : null}
          {this.props.promptType === "beverage" ? (
            <div>
              <div>
                <input
                  type="radio"
                  id="small"
                  name="sizeOption"
                  value={0}
                  checked={this.state.selection === 0}
                  onChange={this.onSizeChange.bind(this)}
                />
                <label htmlFor="small">20 oz</label>
                <br />
                <input
                  type="radio"
                  id="medium"
                  name="sizeOption"
                  value={1}
                  checked={this.state.selection === 1}
                  onChange={this.onSizeChange.bind(this)}
                />
                <label htmlFor="medium">2 lt</label>
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div
                  onClick={() => {
                    this.setState({
                      quantity:
                        this.state.quantity > 1 ? this.state.quantity - 1 : 1,
                    });
                  }}
                >
                  &#60;
                </div>
                {this.state.quantity}
                <div
                  onClick={() => {
                    this.setState({
                      quantity: this.state.quantity + 1,
                    });
                  }}
                >
                  &#62;
                </div>
              </div>
            </div>
          ) : null}
          {this.props.promptType === "quantity" ? (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div
                onClick={() => {
                  this.setState({
                    quantity:
                      this.state.quantity > 0 ? this.state.quantity - 1 : 0,
                  });
                }}
              >
                &#60;
              </div>
              {this.state.quantity}
              <div
                onClick={() => {
                  this.setState({
                    quantity: this.state.quantity + 1,
                  });
                }}
              >
                &#62;
              </div>
            </div>
          ) : null}
          <Button
            onClick={this.handleAccept.bind(this)}
            style={this.state.buttonStyle}
            text="Accept"
          />
          <Button
            onClick={this.handleCancel.bind(this)}
            style={this.state.buttonStyle}
            text="Cancel"
          />
        </div>
      </div>
    );
  }
}

export default PromptModal;
