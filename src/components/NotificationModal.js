import React, { Component } from "react";

class NotificationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundStyle: {
        backgroundColor: "rgba(0,0,0,0)",
        pointerEvents: "none",
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
        fontSize: this.props.fontSize * 0.6,
        color: "white",
        textShadow:
          "-1px -1px 0 #000000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
      },
      timeout: setTimeout(() => {
        this.beginFade();
      }, 1500),
      interval: null,
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  beginFade() {
    clearTimeout(this.state.timeout);
    this.setState({
      timeout: null,
      interval: setInterval(() => {
        this.handleFade();
      }, 30),
    });
  }

  handleFade() {
    if (this.state.modalStyle.opacity > 0) {
      this.setState({
        modalStyle: {
          ...this.state.modalStyle,
          opacity: this.state.modalStyle.opacity - 0.02,
        },
      });
    } else {
      clearInterval(this.state.interval);
      this.setState({ interval: null }, () => {
        this.props.setNotification(false);
      });
    }
  }

  render() {
    return (
      <div style={this.state.backgroundStyle}>
        <div
          style={this.state.modalStyle}
          className="box"
          onClick={() => {
            this.props.setNotification(false);
          }}
        >
          {this.props.text}
        </div>
      </div>
    );
  }
}

export default NotificationModal;
