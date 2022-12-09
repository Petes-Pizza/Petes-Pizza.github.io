class Menu {
  constructor() {
    this.items = [];
  }
  addItem(item) {
    item.setId(this.items.length);
    this.items[this.items.length] = item;
  }
  getItems() {
    return this.items;
  }
  findById(id) {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        return this.items[i];
      }
    }
  }
}
class MenuItem {
  constructor(name, category, prices) {
    this.name = name;
    this.category = category;
    this.prices = prices;
    this.id = null;
    this.pizza = null;
  }
  setId(id) {
    this.id = id;
  }
  setPizza(pizza) {
    this.pizza = pizza;
  }
  getForCart(size) {
    var sizeStr = "";
    if (this.category === "pizza") {
      sizeStr = size === 0 ? "Sm." : size === 1 ? "Md." : "Lg.";
    }
    if (this.category === "beverage") {
      sizeStr = size === 0 ? "20 oz" : "2 lt";
    }
    return {
      productId: this.id,
      productName: this.name,
      cost: this.prices[size],
      pizza: this.pizza,
      quantity: 1,
      size: sizeStr,
    };
  }
}

const menu = new Menu();
menu.addItem(new MenuItem("Breadsticks", "appetizer", [8.99]));
menu.addItem(new MenuItem("Cheese Curds", "appetizer", [11.99]));
menu.addItem(new MenuItem("Chicken Wings", "appetizer", [11.99]));
menu.addItem(
  new MenuItem("Build your own Pizza", "pizza", [7.99, 10.99, 13.99])
);
menu.addItem(new MenuItem("BBQ Chicken Pizza", "pizza", [9.99, 12.99, 15.99]));
menu.addItem(new MenuItem("Hawaiian Pizza", "pizza", [9.99, 12.99, 15.99]));
menu.addItem(new MenuItem("Garden Pizza", "pizza", [8.99, 11.99, 14.99]));
menu.addItem(new MenuItem("Coca Cola", "beverage", [1.99, 3.99]));
menu.addItem(new MenuItem("Sprite", "beverage", [1.99, 3.99]));
menu.addItem(new MenuItem("Barq's Rootbeer", "beverage", [1.99, 3.99]));

export default menu;
