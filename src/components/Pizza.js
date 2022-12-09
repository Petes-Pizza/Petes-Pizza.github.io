import React, { Component } from "react";
import PizzaImage from "../assets/pizza.png";

class Pizza extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, .5)",
        textAlign: "center",
        paddingTop: 8,
      },
      pizzaCanvasStyle: {
        height:
          "calc(40vh - " + (77 + this.props.fontSize * 0.5).toString() + "px)",
      },
      pizzaCanvasRef: React.createRef(),
      ingredients: [],
    };
  }

  componentDidMount() {
    this.setPizza();
  }

  drawPizza(canvasContext) {
    const pizzaImg = new Image();
    pizzaImg.src = PizzaImage;
    const pizzaCanvasRef = { ...this.state.pizzaCanvasRef };
    pizzaCanvasRef.current.width = this.state.pizzaCanvasRef.current.height;
    this.setState({ pizzaCanvasRef }, () => {
      pizzaImg.onload = () => {
        canvasContext.clearRect(
          0,
          0,
          this.state.pizzaCanvasRef.current.width,
          this.state.pizzaCanvasRef.current.height
        );
        canvasContext.drawImage(
          pizzaImg,
          this.state.pizzaCanvasRef.current.width / 2 -
            this.state.pizzaCanvasRef.current.height / 2,
          0,
          this.state.pizzaCanvasRef.current.height,
          this.state.pizzaCanvasRef.current.height
        );
        var rot = Math.random() * Math.PI * 2;
        for (var i = 0; i < 11; i++) {
          for (var j = 0; j < this.state.ingredients.length; j++) {
            if (this.state.ingredients[j].depth === i) {
              rot = Math.random() * Math.PI * 2;
              canvasContext.translate(
                this.state.ingredients[j].x +
                  this.state.pizzaCanvasRef.current.height / 18,
                this.state.ingredients[j].y +
                  this.state.pizzaCanvasRef.current.height / 18
              );
              canvasContext.rotate(rot);
              canvasContext.drawImage(
                this.state.ingredients[j].img,
                0,
                0,
                this.state.pizzaCanvasRef.current.height / 9,
                this.state.pizzaCanvasRef.current.height / 9
              );
              canvasContext.rotate(-rot);
              canvasContext.translate(
                -(
                  this.state.ingredients[j].x +
                  this.state.pizzaCanvasRef.current.height / 18
                ),
                -(
                  this.state.ingredients[j].y +
                  this.state.pizzaCanvasRef.current.height / 18
                )
              );
            }
          }
        }
        canvasContext.lineWidth = 1;
        canvasContext.strokeStyle = "white";
        canvasContext.beginPath();
        canvasContext.moveTo(
          this.state.pizzaCanvasRef.current.width / 2 + 1,
          0
        );
        canvasContext.lineTo(
          this.state.pizzaCanvasRef.current.width / 2 + 1,
          this.state.pizzaCanvasRef.current.height
        );
        canvasContext.stroke();
      };
    });
  }

  createIngredient(ingredient, side) {
    const pizzaCanvasRef = { ...this.state.pizzaCanvasRef };
    pizzaCanvasRef.current.width = this.state.pizzaCanvasRef.current.height;
    this.setState({ pizzaCanvasRef }, () => {
      var num = side === "Whole" ? 15 : 8;
      var x;
      var y;
      var dis;
      var ingredients = [];
      var imgLoaded = 0;
      while (num > 0) {
        if (side === "Whole") {
          x = Math.round(
            Math.random() * this.state.pizzaCanvasRef.current.width
          );
        } else if (side === "Left") {
          x = Math.round(
            (Math.random() * this.state.pizzaCanvasRef.current.width) / 2 -
              8 -
              this.state.pizzaCanvasRef.current.height / 18
          );
        } else {
          x =
            this.state.pizzaCanvasRef.current.width / 2 +
            this.state.pizzaCanvasRef.current.height / 18 +
            ((Math.random() * this.state.pizzaCanvasRef.current.width) / 2 - 8);
        }
        y = Math.round(
          Math.random() * this.state.pizzaCanvasRef.current.height
        );
        dis = this.getDistance(
          this.state.pizzaCanvasRef.current.width / 2 - 8,
          this.state.pizzaCanvasRef.current.height / 2 - 8,
          x,
          y
        );
        for (var i = 0; i < ingredients.length; i++) {
          if (
            ingredients[i].img.src.split("/").pop() ===
              ingredient.split("/").pop() &&
            this.getDistance(x, y, ingredients[i].x, ingredients[i].y) <
              this.state.pizzaCanvasRef.current.height / 8.5
          ) {
            dis = 9999;
            break;
          }
        }
        if (dis < (this.state.pizzaCanvasRef.current.height / 2) * 0.6) {
          const ingredientImg = new Image();
          ingredientImg.src = ingredient;
          ingredients = this.state.ingredients;
          ingredients[ingredients.length] = {
            img: ingredientImg,
            x: x,
            y: y,
            depth: Math.round(Math.random() * 10),
          };
          num -= 1;
          //ingredientImg.style.transform =
          //  "rotate(" + String(Math.random() * 360) + "deg)";
          ingredientImg.onload = () => {
            imgLoaded++;
            if (imgLoaded === (side === "Whole" ? 15 : 8) && num === 0) {
              this.setState({ ingredients }, () => {
                this.drawPizza(
                  this.state.pizzaCanvasRef.current.getContext("2d")
                );
              });
            }
          };
        }
      }
    });
  }

  getDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  }

  componentDidUpdate(prevProps, prevState) {}

  setPizza() {
    var pizza = this.props.pizza.getPizza();
    for (var i = 0; i < Object.keys(pizza).length; i++) {
      if (
        Object.keys(pizza)[i] === "Peperoni" ||
        Object.keys(pizza)[i] === "Sausage" ||
        Object.keys(pizza)[i] === "Spinach" ||
        Object.keys(pizza)[i] === "Bell Pepper" ||
        Object.keys(pizza)[i] === "Canadian Bacon" ||
        Object.keys(pizza)[i] === "Mushroom" ||
        Object.keys(pizza)[i] === "Pineapple" ||
        Object.keys(pizza)[i] === "Onion" ||
        Object.keys(pizza)[i] === "Chicken"
      ) {
        this.createIngredient(
          pizza[Object.keys(pizza)[i]].imageSrc,
          pizza[Object.keys(pizza)[i]].side
        );
      }
    }
    this.drawPizza(this.state.pizzaCanvasRef.current.getContext("2d"));
  }

  handleAdd() {
    if (this.props.edit) {
      this.props.updatePizza();
    } else {
      this.props.addToCart();
    }
  }

  handleDiscard() {
    if (this.props.edit) {
      this.props.removePizzaFromCart();
    } else {
      this.props.discardPizza();
    }
  }

  componentWillUnmount() {}

  render() {
    return (
      <div style={this.state.style}>
        <canvas
          style={this.state.pizzaCanvasStyle}
          ref={this.state.pizzaCanvasRef}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            fontSize: this.props.fontSize * 0.7,
            padding: 0,
          }}
        >
          <div
            className="box"
            style={{ width: "50%", margin: 4, padding: 8 }}
            onClick={this.handleDiscard.bind(this)}
          >
            Discard Pizza
          </div>
          <div
            className="box"
            style={{ width: "50%", margin: 4, padding: 8 }}
            onClick={this.handleAdd.bind(this)}
          >
            {this.props.edit ? "Save" : "Add To Cart"}
          </div>
        </div>
      </div>
    );
  }
}

/*
        <img
          alt="pizza"
          src={PizzaImage}
          style={this.state.pizzaImageStyle}
          ref={this.state.pizzaRef}
        />
*/

export default Pizza;
