class Pizza {
    constructor() {
      this.sauce = {name:"Marinara", price: 0};
      this.size = {name:"Medium", price: 9.99};
      this.cheeses = {
        "Mozzarella": {side:"Whole", price:[0, .49], extra:false},
        "Cheddar": {side:"None", price:[.49, .99], extra:false},
        "Parmesan": {side:"None", price:[.49, .99], extra:false},
      }
      this.toppings = {
        "Sausage": {side:"None", price:[.49, .99], extra:false},
        "Peperoni": {side:"None", price:[.49, .99], extra:false},
        "Bell Peppers": {side:"None", price:[0, 0], extra:false},
        "Chicken": {side:"None", price:[.49, .99], extra:false},
        "Onions": {side:"None", price:[0, 0], extra:false},
        "Pineapple": {side:"None", price:[0, 0], extra:false},
        "Canadian Bacon": {side:"None", price:[.49, .99], extra:false},
        "Spinach": {side:"None", price:[0, 0], extra:false},
        "Mushrooms": {side:"None", price:[0, 0], extra:false},
      };
      this.price = 9.99;
    }
    calculatePrice() {
        var total = this.size.price + this.sauce.price;
        for (var i = 0; i < Object.keys(this.cheeses).length; i++) {
            total += this.cheeses[Object.keys(this.cheeses)[i]].side !== "None" * 
            this.cheeses[Object.keys(this.cheeses)[i]].price[this.cheeses[Object.keys(this.cheeses)[i]].extra];
        }
        for (var i = 0; i < Object.keys(this.toppings).length; i++) {
            total += this.toppings[Object.keys(this.toppings)[i]].side !== "None" * 
            this.toppings[Object.keys(this.toppings)[i]].price[this.toppings[Object.keys(this.toppings)[i]].extra];
        }
        this.price = total;
    }
    setSize(size, price) {
        this.size = {name:size, price};
        this.calculatePrice();
    }
    setSauce(sauce, price) {
        this.sauce = {name:sauce, price};
        this.calculatePrice();
    }
    changeCheeseSide(cheese, side) {
        this.cheeses[cheese].side = side;
        this.calculatePrice();
    }
    changeCheeseExtra(cheese, extra) {
        this.cheeses[cheese].extra = extra;
        this.calculatePrice();
    }
    changeToppingSide(topping, side) {
        this.toppings[topping].side = side;
        this.calculatePrice();
    }
    changeToppingExtra(topping, extra) {
        this.toppings[topping].extra = extra;
        this.calculatePrice();
    }
}