import Peperoni from "../assets/peperoni.png";
import Spinach from "../assets/spinach.png";
import Sausage from "../assets/sausage.png";
import Pineapple from "../assets/pineapple.png";
import Chicken from "../assets/chicken.png";
import CanadianBacon from "../assets/canadianbacon.png";
import Mushroom from "../assets/mushroom.png";
import Onion from "../assets/onion.png";
import BellPeppers from "../assets/bellpeppers.png";

var pizzaCount = 1;
class Pizza {
  constructor() {
    this.id = pizzaCount;
    pizzaCount += 1;
    this.quantity = 1;
    this.sizes = {
      Small: { selected: false, price: 7.99 },
      Medium: { selected: true, price: 9.99 },
      Large: { selected: false, price: 12.99 },
    };
    this.sauces = {
      Marinara: { selected: true, price: [0, 0] },
      Alfredo: { selected: false, price: [0.99, 1.99] },
      Barbecue: { selected: false, price: [0.49, 0.99] },
    };
    this.extraSauce = false;
    this.cheeses = {
      Mozzarella: { side: "None", price: [0, 0.49], extra: false },
      Cheddar: { side: "None", price: [0.49, 0.99], extra: false },
      Parmesan: { side: "None", price: [0.49, 0.99], extra: false },
    };
    this.toppings = {
      Sausage: {
        side: "None",
        price: [0.49, 0.99],
        extra: false,
        imageSrc: Sausage,
      },
      Peperoni: {
        side: "None",
        price: [0.49, 0.99],
        extra: false,
        imageSrc: Peperoni,
      },
      "Bell Pepper": {
        side: "None",
        price: [0, 0],
        extra: false,
        imageSrc: BellPeppers,
      },
      Chicken: {
        side: "None",
        price: [0.49, 0.99],
        extra: false,
        imageSrc: Chicken,
      },
      Onion: { side: "None", price: [0, 0], extra: false, imageSrc: Onion },
      Pineapple: {
        side: "None",
        price: [0, 0],
        extra: false,
        imageSrc: Pineapple,
      },
      "Canadian Bacon": {
        side: "None",
        price: [0.49, 0.99],
        extra: false,
        imageSrc: CanadianBacon,
      },
      Spinach: {
        side: "None",
        price: [0, 0],
        extra: false,
        imageSrc: Spinach,
      },
      Mushroom: {
        side: "None",
        price: [0, 0],
        extra: false,
        imageSrc: Mushroom,
      },
    };
  }

  getSize() {
    for (var i = 0; i < Object.keys(this.sizes).length; i++) {
      if (this.sizes[Object.keys(this.sizes)[i]].selected) {
        return {
          name: Object.keys(this.sizes)[i],
          ...this.sizes[Object.keys(this.sizes)[i]],
        };
      }
    }
  }

  getSauce() {
    for (var i = 0; i < Object.keys(this.sauces).length; i++) {
      if (this.sauces[Object.keys(this.sauces)[i]].selected) {
        return {
          name: Object.keys(this.sauces)[i],
          ...this.sauces[Object.keys(this.sauces)[i]],
        };
      }
    }
  }

  getPrice() {
    var price = 0;
    var i;
    for (i = 0; i < Object.keys(this.sizes).length; i++) {
      price +=
        this.sizes[Object.keys(this.sizes)[i]].selected *
        this.sizes[Object.keys(this.sizes)[i]].price;
    }
    for (i = 0; i < Object.keys(this.sauces).length; i++) {
      price +=
        this.sauces[Object.keys(this.sauces)[i]].selected *
        this.sauces[Object.keys(this.sauces)[i]].price[this.extraSauce ? 1 : 0];
    }
    for (i = 0; i < Object.keys(this.cheeses).length; i++) {
      price +=
        (this.cheeses[Object.keys(this.cheeses)[i]].side !== "None" ? 1 : 0) *
        this.cheeses[Object.keys(this.cheeses)[i]].price[
          this.cheeses[Object.keys(this.cheeses)[i]].extra ? 1 : 0
        ];
    }
    for (i = 0; i < Object.keys(this.toppings).length; i++) {
      price +=
        (this.toppings[Object.keys(this.toppings)[i]].side !== "None" ? 1 : 0) *
        this.toppings[Object.keys(this.toppings)[i]].price[
          this.toppings[Object.keys(this.toppings)[i]].extra ? 1 : 0
        ];
    }
    return price;
  }
  setSize(size) {
    for (var i = 0; i < Object.keys(this.sizes).length; i++) {
      if (size === Object.keys(this.sizes)[i]) {
        this.sizes[Object.keys(this.sizes)[i]].selected = true;
      } else {
        this.sizes[Object.keys(this.sizes)[i]].selected = false;
      }
    }
  }
  setSauce(sauce) {
    for (var i = 0; i < Object.keys(this.sauces).length; i++) {
      if (sauce === Object.keys(this.sauces)[i]) {
        this.sauces[Object.keys(this.sauces)[i]].selected = true;
      } else {
        this.sauces[Object.keys(this.sauces)[i]].selected = false;
      }
    }
  }
  setExtraSauce(extra) {
    this.extraSauce = extra;
  }
  changeCheeseSide(cheese, side) {
    this.cheeses[cheese].side = side;
  }
  changeCheeseExtra(cheese, extra) {
    this.cheeses[cheese].extra = extra;
  }
  changeToppingSide(topping, side) {
    this.toppings[topping].side = side;
  }
  changeToppingExtra(topping, extra) {
    this.toppings[topping].extra = extra;
  }
  toString(includeSize) {
    var retString = "";
    var i;
    if (includeSize) {
      for (i = 0; i < Object.keys(this.sizes).length; i++) {
        if (this.sizes[Object.keys(this.sizes)[i]].selected) {
          retString += "Size:" + Object.keys(this.sizes)[i] + "\n";
          break;
        }
      }
    }

    for (i = 0; i < Object.keys(this.sauces).length; i++) {
      if (this.sauces[Object.keys(this.sauces)[i]].selected) {
        retString += "Sauce: " + Object.keys(this.sauces)[i];
        if (this.extraSauce) {
          retString +=
            " (extra +" +
            this.sauces[Object.keys(this.sauces)[i]].price[1] +
            ")";
        } else if (this.sauces[Object.keys(this.sauces)[i]].price[0] > 0) {
          retString +=
            " (+" + this.sauces[Object.keys(this.sauces)[i]].price[0] + ")";
        }
        break;
      }
    }

    retString += "\nCheeses: ";

    for (i = 0; i < Object.keys(this.cheeses).length; i++) {
      if (this.cheeses[Object.keys(this.cheeses)[i]].side !== "None") {
        retString += Object.keys(this.cheeses)[i];
        if (this.cheeses[Object.keys(this.cheeses)[i]].side !== "Whole") {
          retString +=
            " (" + this.cheeses[Object.keys(this.cheeses)[i]].side + ")";
          if (this.cheeses[Object.keys(this.cheeses)[i]].extra) {
            retString +=
              " (extra +" +
              this.cheeses[Object.keys(this.cheeses)[i]].price[1] +
              "), ";
          } else if (this.cheeses[Object.keys(this.cheeses)[i]].price[0] > 0) {
            retString +=
              " (" +
              this.cheeses[Object.keys(this.cheeses)[i]].price[0] +
              "), ";
          }
        } else {
          if (this.cheeses[Object.keys(this.cheeses)[i]].extra) {
            retString +=
              " (extra +" +
              this.cheeses[Object.keys(this.cheeses)[i]].price[1] +
              "), ";
          } else if (this.cheeses[Object.keys(this.cheeses)[i]].price[0] > 0) {
            retString +=
              " (" +
              this.cheeses[Object.keys(this.cheeses)[i]].price[0] +
              "), ";
          }
        }
      }
    }
    if (retString.substr(retString.length - 2) === ": ") {
      retString += " (None), ";
    }
    retString += "\nToppings: ";
    for (i = 0; i < Object.keys(this.toppings).length; i++) {
      if (this.toppings[Object.keys(this.toppings)[i]].side !== "None") {
        retString += Object.keys(this.toppings)[i];
        if (this.toppings[Object.keys(this.toppings)[i]].side !== "Whole") {
          retString +=
            " (" + this.toppings[Object.keys(this.toppings)[i]].side + ")";
          if (this.toppings[Object.keys(this.toppings)[i]].extra) {
            retString +=
              " (extra +" +
              this.toppings[Object.keys(this.toppings)[i]].price[1] +
              "), ";
          } else if (
            this.toppings[Object.keys(this.toppings)[i]].price[0] > 0
          ) {
            retString +=
              " (" +
              this.toppings[Object.keys(this.toppings)[i]].price[0] +
              "), ";
          }
        } else {
          if (this.toppings[Object.keys(this.toppings)[i]].extra) {
            retString +=
              " (extra +" +
              this.toppings[Object.keys(this.toppings)[i]].price[1] +
              "), ";
          } else if (
            this.toppings[Object.keys(this.toppings)[i]].price[0] > 0
          ) {
            retString +=
              " (" +
              this.toppings[Object.keys(this.toppings)[i]].price[0] +
              "), ";
          }
        }
      }
    }
    if (retString.substr(retString.length - 2) === ": ") {
      retString += " (None)";
    } else {
      retString = retString.slice(0, -2);
    }
    return retString;
  }

  getPizza() {
    var pizza = {};
    var i;
    for (i = 0; i < Object.keys(this.sizes).length; i++) {
      if (this.sizes[Object.keys(this.sizes)[i]].selected) {
        pizza.size = Object.keys(this.sizes)[i];
      }
    }
    for (i = 0; i < Object.keys(this.sauces).length; i++) {
      if (this.sauces[Object.keys(this.sauces)[i]].selected) {
        pizza.sauce = Object.keys(this.sauces)[i];
      }
    }
    pizza.extraSauce = this.extraSauce;

    for (i = 0; i < Object.keys(this.cheeses).length; i++) {
      if (this.cheeses[Object.keys(this.cheeses)[i]].side !== "None") {
        pizza[Object.keys(this.cheeses)[i]] =
          this.cheeses[Object.keys(this.cheeses)[i]];
      }
    }

    for (i = 0; i < Object.keys(this.toppings).length; i++) {
      if (this.toppings[Object.keys(this.toppings)[i]].side !== "None") {
        pizza[Object.keys(this.toppings)[i]] =
          this.toppings[Object.keys(this.toppings)[i]];
      }
    }
    return pizza;
  }

  getId() {
    return this.id;
  }

  setQuantity(quantity) {
    if (quantity > 0) {
      this.quantity = quantity;
    }
  }

  getQuantity() {
    return this.quantity;
  }

  getForCart() {
    var size;
    for (var i = 0; i < Object.keys(this.sizes).length; i++) {
      if (this.sizes[Object.keys(this.sizes)[i]].selected) {
        size = Object.keys(this.sizes)[i];
      }
    }
    return {
      productId: 3,
      productName: "Custom Pizza",
      cost: this.getPrice(),
      pizza: this,
      quantity: this.quantity,
      size: size,
    };
  }
}

export default Pizza;
