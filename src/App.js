import React, { Component } from "react";
import menu from "./data/menu";
import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";
import Content from "./views/Content";
import NotificationModal from "./components/NotificationModal";
import PromptModal from "./components/PromptModal";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appRef: React.createRef(),
      startingState: {
        promptQuantity: 1,
        cartItemIndex: 1,
        osName: "",
        browserName: "",
        prompt: false,
        promptType: "pizza",
        promptProductId: 0,
        notification: false,
        taxRate: 0.07,
        menu: menu,
        view: "login",
        user: {},
        history: ["login"],
        views: {
          register: {
            username: "",
            password: "",
            verifyPassword: "",
            email: "",
          },
          login: { username: "", password: "" },
          user: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            streetAddress: "",
            city: "",
            state: "",
            zip: "",
            creditCard: "",
            expDate: "",
            securityCode: "",
            billingZip: "",
          },
          cart: {
            items: [],
            subtotal: 0,
            deliveryFee: 2.99,
            tax: 0,
            total: 0,
            payment: {
              cash: true,
              useSavedCard: false,
              creditCard: "",
              expDate: "",
              securityCode: "",
              billingZip: "",
            },
            pickup: true,
            location: { streetAddress: "", city: "", state: "", zip: "" },
          },
          location: {
            pickup: null, //this will either be null, false, or it will refer to the id of a franchiseLocation
            useHome: false,
            streetAddress: "",
            city: "",
            state: "",
            zip: "",
          },
          customizer: { pizzaId: null, pizza: null, edit: false },
          home: {},
          menu: {},
        },
        franchiseLocations: [
          {
            id: 1,
            streetAddress: "1231 Pierce Butler Rte",
            city: "St. Paul",
            state: "MN",
            zip: "55104",
          },
          {
            id: 2,
            streetAddress: "1681 Rice St.",
            city: "Roseville",
            state: "MN",
            zip: "55113",
          },
          {
            id: 3,
            streetAddress: "975 Grand Ave",
            city: "St Paul",
            state: "MN",
            zip: "55105",
          },
        ],
        appStyle: {
          fontSize: 28,
          color: "white",
          width: "calc(100% - 16px)",
          maxWidth: "820px",
        },
        customPizzas: [],
      },
      cartItemIndex: 1,
      osName: "",
      browserName: "",
      prompt: false,
      promptType: "pizza",
      promptProductId: 0,
      promptQuantity: 1,
      notification: false,
      taxRate: 0.07,
      menu: menu,
      view: "login",
      user: {},
      history: ["login"],
      views: {
        register: { username: "", password: "", verifyPassword: "", email: "" },
        login: { username: "", password: "" },
        user: {
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          streetAddress: "",
          city: "",
          state: "",
          zip: "",
          creditCard: "",
          expDate: "",
          securityCode: "",
          billingZip: "",
        },
        cart: {
          items: [],
          subtotal: 0,
          deliveryFee: 2.99,
          tax: 0,
          total: 0,
          payment: {
            cash: true,
            useSavedCard: false,
            creditCard: "",
            expDate: "",
            securityCode: "",
            billingZip: "",
          },
          pickup: true,
          location: { streetAddress: "", city: "", state: "", zip: "" },
        },
        location: {
          pickup: null, //this will either be null, false, or it will refer to the id of a franchiseLocation
          useHome: false,
          streetAddress: "",
          city: "",
          state: "",
          zip: "",
        },
        customizer: { pizzaId: null, pizza: null, edit: false },
        home: {},
        menu: {},
      },
      franchiseLocations: [
        {
          id: 1,
          streetAddress: "1231 Pierce Butler Rte",
          city: "St. Paul",
          state: "MN",
          zip: "55104",
        },
        {
          id: 2,
          streetAddress: "1681 Rice St.",
          city: "Roseville",
          state: "MN",
          zip: "55113",
        },
        {
          id: 3,
          streetAddress: "975 Grand Ave",
          city: "St Paul",
          state: "MN",
          zip: "55105",
        },
      ],
      appStyle: {
        fontSize: 28,
        color: "white",
        width: "calc(100% - 16px)",
        maxWidth: "820px",
      },
      customPizzas: [],
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  calculateTotals() {
    const views = { ...this.state.views };
    var subtotal = 0;
    for (var i = 0; i < views.cart.items.length; i++) {
      if (views.cart.items[i].pizza !== null) {
        subtotal +=
          views.cart.items[i].pizza.getPrice() *
          views.cart.items[i].pizza.getQuantity();
      } else {
        subtotal += views.cart.items[i].cost * views.cart.items[i].quantity;
      }
    }
    views.cart.subtotal = subtotal;
    views.cart.tax = Math.ceil(subtotal * this.state.taxRate * 100) / 100;
    views.cart.total =
      Math.round(
        (subtotal +
          views.cart.tax +
          (this.state.views.location.pickup !== false ||
          this.state.views.location.pickup === null
            ? 0
            : this.state.views.cart.deliveryFee *
              (this.state.views.cart.items.length === 0 ? 0 : 1))) *
          100
      ) / 100;
    this.setState({ views });
  }

  componentDidUpdate(prevProps, prevState) {}

  getInfo = () => {
    //https://medium.com/creative-technology-concepts-code/detect-device-browser-and-version-using-javascript-8b511906745
    var module = {
      options: [],
      header: [
        navigator.platform,
        navigator.userAgent,
        navigator.appVersion,
        navigator.vendor,
        window.opera,
      ],
      dataos: [
        { name: "Windows Phone", value: "Windows Phone", version: "OS" },
        { name: "Windows", value: "Win", version: "NT" },
        { name: "iPhone", value: "iPhone", version: "OS" },
        { name: "iPad", value: "iPad", version: "OS" },
        { name: "Kindle", value: "Silk", version: "Silk" },
        { name: "Android", value: "Android", version: "Android" },
        { name: "PlayBook", value: "PlayBook", version: "OS" },
        { name: "BlackBerry", value: "BlackBerry", version: "/" },
        { name: "Macintosh", value: "Mac", version: "OS X" },
        { name: "Linux", value: "Linux", version: "rv" },
        { name: "Palm", value: "Palm", version: "PalmOS" },
      ],
      databrowser: [
        { name: "Chrome", value: "Chrome", version: "Chrome" },
        { name: "Firefox", value: "Firefox", version: "Firefox" },
        { name: "Safari", value: "Safari", version: "Version" },
        { name: "Internet Explorer", value: "MSIE", version: "MSIE" },
        { name: "Opera", value: "Opera", version: "Opera" },
        { name: "BlackBerry", value: "CLDC", version: "CLDC" },
        { name: "Mozilla", value: "Mozilla", version: "Mozilla" },
      ],
      init: function () {
        var agent = this.header.join(" "),
          os = this.matchItem(agent, this.dataos),
          browser = this.matchItem(agent, this.databrowser);

        return { os: os, browser: browser };
      },
      matchItem: function (string, data) {
        var i = 0,
          j = 0,
          regex,
          regexv,
          match,
          matches,
          version;

        for (i = 0; i < data.length; i += 1) {
          regex = new RegExp(data[i].value, "i");
          match = regex.test(string);
          if (match) {
            regexv = new RegExp(data[i].version + "[- /:;]([\\d._]+)", "i");
            matches = string.match(regexv);
            version = "";
            if (matches) {
              if (matches[1]) {
                matches = matches[1];
              }
            }
            if (matches) {
              matches = matches.split(/[._]+/);
              for (j = 0; j < matches.length; j += 1) {
                if (j === 0) {
                  version += matches[j] + ".";
                } else {
                  version += matches[j];
                }
              }
            } else {
              version = "0";
            }
            return {
              name: data[i].name,
              version: parseFloat(version),
            };
          }
        }
        return { name: "unknown", version: 0 };
      },
    };

    var e = module.init();

    var osName = e.os.name;

    var browserName = e.browser.name;

    this.setState({
      osName,
      browserName,
    });
  };

  componentWillUnmount() {}

  setPrompt(
    prompt,
    promptType,
    promptProductId,
    cartItemIndex,
    promptQuantity
  ) {
    this.setState({
      prompt,
      promptType,
      promptProductId,
      promptQuantity,
      cartItemIndex,
    });
  }

  changeView(view) {
    view =
      view === "user" && Object.keys(this.state.user).length === 0
        ? "login"
        : view;
    this.setState({ view, history: [...this.state.history, view] });
  }

  updateValue(view, attribute, value, cb) {
    var views = { ...this.state.views };
    views[view][attribute] = value;
    if (view === "cart") {
      if (
        attribute === "cash" ||
        attribute === "useSavedCard" ||
        attribute === "creditCard" ||
        attribute === "expDate" ||
        attribute === "securityCode" ||
        attribute === "billingZip"
      ) {
        views.cart.payment[attribute] = value;
      }
      if (attribute === "useSavedCard") {
        views.cart.payment.creditCard = value ? views.user.creditCard : "";
        views.cart.payment.expDate = value ? views.user.expDate : "";
        views.cart.payment.securityCode = value ? views.user.securityCode : "";
        views.cart.payment.billingZip = value ? views.user.billingZip : "";
      }
    } else if (view === "location") {
      if (
        attribute === "streetAddress" ||
        attribute === "city" ||
        attribute === "state" ||
        attribute === "zip"
      ) {
        views.cart.location[attribute] = value;
      } else if (attribute === "pickup") {
        if (value !== -1) {
          var newLocation =
            value !== false
              ? { ...this.state.franchiseLocations[value - 1] }
              : { ...views.location };
          if (value !== false) {
            delete newLocation.id;
          } else {
            delete newLocation.pickup;
            delete newLocation.useHome;
          }
          views.cart.location = { ...newLocation };
        }
        views.cart.pickup = value !== false;
        views.cart.location =
          value === false
            ? { streetAddress: "", city: "", state: "", zip: "" }
            : views.cart.location;
      } else if (attribute === "useHome") {
        views.location.streetAddress = value ? views.user.streetAddress : "";
        views.location.city = value ? views.user.city : "";
        views.location.state = value ? views.user.state : "";
        views.location.zip = value ? views.user.zip : "";

        views.cart.location.streetAddress = value
          ? views.user.streetAddress
          : "";
        views.cart.location.city = value ? views.user.city : "";
        views.cart.location.state = value ? views.user.state : "";
        views.cart.location.zip = value ? views.user.zip : "";
      }
    } else if (view === "user") {
      if (
        views.location.useHome &&
        (attribute === "streetAddress" ||
          attribute === "city" ||
          attribute === "state" ||
          attribute === "zip")
      ) {
        views.location[attribute] = value;
        views.cart.location[attribute] = value;
      } else if (
        views.cart.payment.useSavedCard &&
        (attribute === "creditCard" ||
          attribute === "expDate" ||
          attribute === "securityCode" ||
          attribute === "billingZip")
      ) {
        views.cart.payment[attribute] = value;
      }
    }

    this.setState({ views }, () => {
      if (view === "location" && attribute === "pickup") {
        this.calculateTotals();
      }
      if (typeof cb !== "undefined") {
        cb();
      }
    });
  }

  addToCart(productId, size, quantity) {
    var views = { ...this.state.views };
    var found = false;
    for (var i = 0; i < views["cart"].items.length && productId !== 3; i++) {
      if (
        views.cart.items[i].productId === productId &&
        views.cart.items[i].size ===
          this.state.menu.findById(productId).getForCart(size).size
      ) {
        views.cart.items[i].quantity += quantity;
        found = true;
        break;
      }
    }
    if (found === false) {
      views["cart"].items[views.cart.items.length] = this.state.menu
        .findById(productId)
        .getForCart(size);
      views["cart"].items[views.cart.items.length - 1].quantity = quantity;
    }
    this.setState({ views }, () => {
      this.setNotification("Item added to cart!");
      this.calculateTotals();
    });
  }

  addPizzaToCart(pizza) {
    var views = { ...this.state.views };
    views["cart"].items[views.cart.items.length] = pizza;
    this.setState({ views }, () => {
      this.changeView("menu");
      this.setNotification("Item added to cart!");
      this.calculateTotals();
    });
  }

  changeUser(username, password) {
    this.setState({ user: { username, password } }, () => {
      this.changeView("home");
    });
  }

  logOut() {
    this.setState({
      startingState: { ...this.state.startingState },
      ...this.state.startingState,
    });
  }

  goBack() {
    if (this.state.history.length > 1) {
      var history = [...this.state.history];
      history.pop();
      if (
        history[history.length - 1] === "login" &&
        Object.keys(this.state.user).length > 0
      ) {
        history[history.length - 1] = "user";
      }
      this.setState({ history, view: history[history.length - 1] });
    }
  }

  setNotification(notification) {
    this.setState({ notification: false }, () => {
      this.setState({ notification });
    });
  }

  removePizzaFromCart(pizza) {
    const views = { ...this.state.views };
    for (var i = 0; i < views.cart.items.length; i++) {
      if (
        views.cart.items[i].pizza !== null &&
        pizza.getId() === views.cart.items[i].pizza.getId()
      ) {
        views.cart.items.splice(i, 1);
        break;
      }
    }
    this.setState({ views }, () => {
      this.calculateTotals();
      this.changeView("cart");
    });
  }

  updateCartItemQuantity(cartItemIndex, quantity) {
    const views = { ...this.state.views };
    if (quantity === 0) {
      views.cart.items.splice(cartItemIndex, 1);
    } else {
      views.cart.items[cartItemIndex].quantity = quantity;
    }
    this.setState({ views }, () => {
      this.calculateTotals();
    });
  }

  placeOrder() {
    const views = { ...this.state.views };
    if (
      views.cart.location.streetAddress === "" ||
      views.cart.location.city === "" ||
      views.cart.location.state === "" ||
      views.cart.location.zip === ""
    ) {
      this.setNotification("You haven't entered an address yet!");
      this.changeView("location");
    } else if (views.cart.items.length === 0) {
      this.setNotification("You haven't selected any items yet!!");
      this.changeView("menu");
    } else if (
      views.cart.payment.cash === false &&
      (views.cart.payment.creditCard.length < 19 ||
        views.cart.payment.expDate.length < 7 ||
        views.cart.payment.securityCode.length < 3 ||
        views.cart.payment.billingZip.length < 5)
    ) {
      this.setNotification(
        "You haven't finished entering your card information!"
      );
    } else {
      views.cart.items = [];
      this.setState({ views }, () => {
        this.setNotification("Your order has been placed!");
        this.changeView("home");
        this.calculateTotals();
      });
    }
  }

  render() {
    return (
      <div style={this.state.appStyle} ref={this.state.appRef}>
        {this.state.prompt !== false ? (
          <PromptModal
            text={this.state.prompt}
            promptType={this.state.promptType}
            fontSize={this.state.appStyle.fontSize}
            setPrompt={this.setPrompt.bind(this)}
            addToCart={this.addToCart.bind(this)}
            productId={this.state.promptProductId}
            cartItemIndex={this.state.cartItemIndex}
            quantity={this.state.promptQuantity}
            updateCartItemQuantity={this.updateCartItemQuantity.bind(this)}
          />
        ) : null}
        {this.state.notification !== false ? (
          <NotificationModal
            text={this.state.notification}
            fontSize={this.state.appStyle.fontSize}
            setNotification={this.setNotification.bind(this)}
          />
        ) : null}
        <TopBar
          changeView={this.changeView.bind(this)}
          goBack={this.goBack.bind(this)}
          text={this.state.view}
          fontSize={this.state.appStyle.fontSize}
          total={this.state.views.cart.total}
          view={this.state.view}
        />
        <Content
          fontSize={this.state.appStyle.fontSize}
          view={this.state.view}
          content={this.state.views}
          loggedIn={Object.keys(this.state.user).length > 0}
          changeView={this.changeView.bind(this)}
          changeUser={this.changeUser.bind(this)}
          updateValue={this.updateValue.bind(this)}
          placeOrder={this.placeOrder.bind(this)}
          addToCart={this.addToCart.bind(this)}
          addPizzaToCart={this.addPizzaToCart.bind(this)}
          franchiseLocations={this.state.franchiseLocations}
          menu={this.state.menu}
          setNotification={this.setNotification.bind(this)}
          setPrompt={this.setPrompt.bind(this)}
          osName={this.state.osName}
          removePizzaFromCart={this.removePizzaFromCart.bind(this)}
          calculateTotals={this.calculateTotals.bind(this)}
          logOut={this.logOut.bind(this)}
        />
        <BottomBar
          changeView={this.changeView.bind(this)}
          osName={this.state.osName}
          view={this.state.view}
        />
      </div>
    );
  }
}

export default App;
