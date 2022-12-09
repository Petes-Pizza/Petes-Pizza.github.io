import React, { Component } from "react";

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        backgroundColor: "rgb(255, 255, 255)",
        borderRadius: "16px",
        padding: "4px"
      },
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    return (
      <div style={{ ...this.state.style, ...this.props.style }} onClick={this.props.onClick}>
        {this.props.text}
      </div>
    );
  }
}

export default Button;
