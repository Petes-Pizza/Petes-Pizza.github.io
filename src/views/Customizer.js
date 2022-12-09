import React, { Component } from "react";
import Pizza from "../components/Pizza";
import NoTopping from "../assets/notopping.png";
import LeftHalfPizzaIcon from "../assets/lefthalfpizza.png";
import RightHalfPizzaIcon from "../assets/righthalfpizza.png";
import WholePizzaIcon from "../assets/wholepizza.png";
import ExtraIcon from "../assets/extra.png";
import ExtraIconTicked from "../assets/extraticked.png";

class Customizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: this.props.content.pizza.getSize().name,
      sauce: this.props.content.pizza.getSauce().name,
      style: {},
      toppingsContainterStyle: {
        overflowX: "hidden",
        overflowY: "auto",
        width: "100%",
        height: "calc(60vh - 156px)", //this.props.osName === "Android"?"calc(60vh - 205px)":"calc(60vh - 156px)",
      },
      pizza: this.props.content.pizza,
      updatePizza: false,
      quantity: this.props.content.pizza.getQuantity(),
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  updatePizza() {
    this.setState({ updatePizza: true }, () => {
      this.setState({ updatePizza: false }, () => {
        this.props.calculateTotals();
      });
    });
  }

  createIngredientOptions(ingredient) {
    var pizzaIngredients =
      ingredient === "Mozzarella" ||
      ingredient === "Cheddar" ||
      ingredient === "Parmesan"
        ? this.props.content.pizza.cheeses[ingredient]
        : this.props.content.pizza.toppings[ingredient];
    return (
      <div
        className="box"
        style={{ backgroundColor: "rgba(255, 255, 255, .3)" }}
        key={ingredient}
      >
        {ingredient}
        {pizzaIngredients.side !== "None" ? (
          <div style={{ fontSize: this.props.fontSize * 0.7 }}>
            +$
            {pizzaIngredients.price[pizzaIngredients.extra ? 1 : 0].toFixed(2)}
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            fontSize: this.props.fontSize * 0.7,
          }}
        >
          <div
            ingredient={ingredient}
            side="None"
            onClick={this.changeIngredient.bind(this)}
            style={
              pizzaIngredients.side === "None"
                ? {
                    border: "2px solid red",
                    borderRadius: 16,
                    height: 27,
                  }
                : {
                    border: "0px solid red",
                    borderRadius: 16,
                    height: 27,
                  }
            }
          >
            <img alt="None" src={NoTopping} />
          </div>
          <div
            ingredient={ingredient}
            side="Left"
            onClick={this.changeIngredient.bind(this)}
            style={
              pizzaIngredients.side === "Left"
                ? {
                    border: "2px solid red",
                    borderRadius: 16,
                    height: 27,
                  }
                : {
                    border: "0px solid red",
                    borderRadius: 16,
                    height: 27,
                  }
            }
          >
            <img alt="Left Side" src={LeftHalfPizzaIcon} />
          </div>
          <div
            ingredient={ingredient}
            side="Whole"
            onClick={this.changeIngredient.bind(this)}
            style={
              pizzaIngredients.side === "Whole"
                ? {
                    border: "2px solid red",
                    borderRadius: 16,
                    height: 27,
                  }
                : {
                    border: "0px solid red",
                    borderRadius: 16,
                    height: 27,
                  }
            }
          >
            <img alt="Whole Pizza" src={WholePizzaIcon} />
          </div>
          <div
            ingredient={ingredient}
            side="Right"
            onClick={this.changeIngredient.bind(this)}
            style={
              pizzaIngredients.side === "Right"
                ? {
                    border: "2px solid red",
                    borderRadius: 16,
                    height: 27,
                  }
                : {
                    border: "0px solid red",
                    borderRadius: 16,
                    height: 27,
                  }
            }
          >
            <img alt="Right Side" src={RightHalfPizzaIcon} />
          </div>
          <img
            alt="Extra"
            src={pizzaIngredients.extra ? ExtraIconTicked : ExtraIcon}
            onClick={(e) => {
              e.nativeEvent.target.src =
                e.nativeEvent.target.src === ExtraIcon
                  ? ExtraIconTicked
                  : ExtraIcon;
              if (
                ingredient === "Mozzarella" ||
                ingredient === "Cheddar" ||
                ingredient === "Parmesan"
              ) {
                this.props.content.pizza.changeCheeseExtra(
                  ingredient,
                  e.nativeEvent.target.src === ExtraIconTicked
                );
              } else {
                this.props.content.pizza.changeToppingExtra(
                  ingredient,
                  e.nativeEvent.target.src === ExtraIconTicked
                );
              }
              const priceElement =
                e.nativeEvent.target.parentElement.parentElement.children[0];

              if (priceElement.innerHTML.substr(0, 2) === "+$") {
                priceElement.innerHTML =
                  "+$" +
                  pizzaIngredients.price[
                    pizzaIngredients.extra ? 1 : 0
                  ].toFixed(2);
              }
            }}
          />
        </div>
      </div>
    );
  }

  discardPizza() {
    this.props.changeView("menu");
    this.props.calculateTotals();
  }

  changeIngredient(e) {
    var ingredient =
      e.nativeEvent.target.parentElement.attributes.ingredient.value;
    var side = e.nativeEvent.target.parentElement.attributes.side.value;
    const siblings = e.nativeEvent.target.parentElement.parentElement.children;
    for (var i = 0; i < siblings.length - 1; i++) {
      siblings[i].style =
        "border: 0px solid red; border-radius: 16px; height: 27px;";
    }
    e.nativeEvent.target.parentElement.style =
      "border: 2px solid red; border-radius: 16px; height: 27px;";
    if (
      ingredient === "Mozzarella" ||
      ingredient === "Cheddar" ||
      ingredient === "Parmesan"
    ) {
      this.props.content.pizza.changeCheeseSide(ingredient, side);
    } else {
      this.props.content.pizza.changeToppingSide(ingredient, side);
    }
    this.updatePizza();
  }

  onSizeChange(e) {
    this.props.content.pizza.setSize(e.target.attributes.id.value);
    this.setState({ size: e.target.attributes.id.value }, () => {
      this.props.calculateTotals();
    });
  }

  onSauceChange(e) {
    this.props.content.pizza.setSauce(e.target.attributes.id.value);
    this.setState({ sauce: e.target.attributes.id.value }, () => {
      this.props.calculateTotals();
    });
  }

  render() {
    return (
      <div style={this.state.style}>
        {this.props.content.pizza !== null && !this.state.updatePizza ? (
          <Pizza
            pizza={this.props.content.pizza}
            fontSize={this.props.fontSize}
            discardPizza={this.discardPizza.bind(this)}
            removePizzaFromCart={() => {
              this.props.removePizzaFromCart(this.props.content.pizza);
            }}
            addToCart={() => {
              this.props.addPizzaToCart(this.props.content.pizza.getForCart());
            }}
            updatePizza={() => {
              this.props.changeView("cart");
            }}
            edit={this.props.content.edit}
          />
        ) : null}
        <div style={this.state.toppingsContainterStyle}>
          <div className="box">
            Quantity:
            <hr />
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                fontSize: this.props.fontSize * 0.7,
              }}
            >
              <div
                onClick={() => {
                  this.props.content.pizza.setQuantity(
                    this.props.content.pizza.quantity - 1
                  );
                  this.setState(
                    {
                      quantity: this.props.content.pizza.getQuantity(),
                    },
                    () => {
                      this.props.calculateTotals();
                    }
                  );
                }}
              >
                &#60;
              </div>
              {this.state.quantity}
              <div
                onClick={() => {
                  this.props.content.pizza.setQuantity(
                    this.props.content.pizza.quantity + 1
                  );
                  this.setState(
                    {
                      quantity: this.props.content.pizza.getQuantity(),
                    },
                    () => {
                      this.props.calculateTotals();
                    }
                  );
                }}
              >
                &#62;
              </div>
            </div>
          </div>
          <div className="box">
            Size:
            <br />
            <div style={{ fontSize: this.props.fontSize * 0.7 }}>
              $
              {this.props.content.pizza.sizes["Small"].selected
                ? "7.99"
                : this.props.content.pizza.sizes["Medium"].selected
                ? "9.99"
                : "12.99"}
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                fontSize: this.props.fontSize * 0.7,
              }}
            >
              <input
                type="radio"
                id="Small"
                name="size"
                checked={this.state.size === "Small"}
                onChange={() => {}}
                onClick={this.onSizeChange.bind(this)}
              />
              <label htmlFor="small">Small</label>
              <input
                type="radio"
                id="Medium"
                name="size"
                checked={this.state.size === "Medium"}
                onChange={() => {}}
                onClick={this.onSizeChange.bind(this)}
              />
              <label htmlFor="medium">Medium</label>
              <input
                type="radio"
                id="Large"
                name="size"
                checked={this.state.size === "Large"}
                onChange={() => {}}
                onClick={this.onSizeChange.bind(this)}
              />
              <label htmlFor="large">Large</label>
            </div>
          </div>
          <div className="box">
            Sauce:
            <br />
            <div style={{ fontSize: this.props.fontSize * 0.7 }}>
              +$
              {
                this.props.content.pizza.getSauce().price[
                  this.props.content.pizza.extraSauce ? 1 : 0
                ]
              }
            </div>
            <hr />
            <input
              type="checkbox"
              id="extrasauce"
              checked={this.props.content.pizza.extraSauce}
              onChange={(e) => {
                this.props.content.pizza.setExtraSauce(e.target.checked);
                this.props.calculateTotals();
              }}
            />
            <label
              htmlFor="extrasauce"
              style={{ fontSize: this.props.fontSize * 0.7 }}
            >
              Extra Sauce
            </label>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                fontSize: this.props.fontSize * 0.7,
              }}
            >
              <input
                type="radio"
                id="Marinara"
                name="sauce"
                checked={this.state.sauce === "Marinara"}
                onChange={() => {}}
                onClick={this.onSauceChange.bind(this)}
              />
              <label htmlFor="Marinara">Marinara</label>
              <input
                type="radio"
                id="Barbecue"
                name="sauce"
                checked={this.state.sauce === "Barbecue"}
                onChange={() => {}}
                onClick={this.onSauceChange.bind(this)}
              />
              <label htmlFor="Barbecue">Barbecue</label>
              <input
                type="radio"
                id="Alfredo"
                name="sauce"
                checked={this.state.sauce === "Alfredo"}
                onChange={() => {}}
                onClick={this.onSauceChange.bind(this)}
              />
              <label htmlFor="Alfredo">Alfredo</label>
            </div>
          </div>
          <div className="box">
            Cheeses:
            <hr />
            {["Mozzarella", "Cheddar", "Parmesan"].map(
              this.createIngredientOptions.bind(this)
            )}
          </div>
          <div className="box">
            Meats:
            <hr />
            {["Peperoni", "Sausage", "Canadian Bacon", "Chicken"].map(
              this.createIngredientOptions.bind(this)
            )}
          </div>
          <div className="box">
            Veggies:
            <hr />
            {["Onion", "Bell Pepper", "Pineapple", "Spinach", "Mushroom"].map(
              this.createIngredientOptions.bind(this)
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Customizer;
