let express = require("express");
let app = express();
let cors = require("cors");
let PORT = 3000;
app.listen(PORT, () => {
  console.log("This server is running");
});
app.use(cors());
let cart = [
  { productId: 1, name: "Laptop", price: 50000, quantity: 1 },
  { productId: 2, name: "Mobile", price: 20000, quantity: 2 },
];
// Endpoint 1: Add an Item to the Cart
function addItemToCart(cart, productId, name, price, quantity) {
  let item = {};
  item.productId = productId;
  item.name = name;
  item.price = price;
  item.quantity = quantity;
  cart.push(item);
  return cart;
}
app.get("/cart/add", (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let cartItems = addItemToCart(cart, productId, name, price, quantity);
  res.json({ cartItems: cartItems });
});

// Endpoint 2: Edit Quantity of an Item in the Cart
let cartItems = [
  { productId: 1, name: "Laptop", price: 50000, quantity: 1 },
  { productId: 2, name: "Mobile", price: 20000, quantity: 2 },
  { productId: 3, name: "Table", price: 15000, quantity: 1 },
];
function editQuantityById(cartItems, productId, quantity) {
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].productId === productId) {
      cartItems[i].quantity = quantity;
    }
  }
  return cartItems;
}
app.get("/cart/edit", (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let updatedCart = editQuantityById(cartItems, productId, quantity);
  res.json({ cartItems: updatedCart });
});
// Endpoint 3: Delete an Item from the Cart
let updatedCartItems = [
  { productId: 1, name: "Laptop", price: 50000, quantity: 1 },
  { productId: 2, name: "Mobile", price: 20000, quantity: 3 },
  { productId: 3, name: "Table", price: 15000, quantity: 1 },
];
function deleteItemsById(item, productId) {
  return item.productId != productId;
}
app.get("/cart/delete", (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = updatedCartItems.filter((item) =>
    deleteItemsById(item, productId),
  );
  res.json({ cartItems: result });
});
// Endpoint 4: Read Items in the Cart
let newCart = [
  { productId: 2, name: "Mobile", price: 20000, quantity: 3 },
  { productId: 3, name: "Table", price: 15000, quantity: 1 },
];
function readCartItems(newCart) {
  return newCart;
}
app.get("/cart", (req, res) => {
  let cart = readCartItems(newCart);
  res.json({ cartItems: cart });
});
// Endpoint 5: Calculate Total Quantity of Items in the Cart
function getTotalQuantityOfItems(newCart) {
  let totalQuantity = 0;
  for (let i = 0; i < newCart.length; i++) {
    totalQuantity = totalQuantity + newCart[i].quantity;
  }
  return totalQuantity;
}
app.get("/cart/total-quantity", (req, res) => {
  let totalQuantity = getTotalQuantityOfItems(newCart);
  res.json({ totalQuantity: totalQuantity });
});
// Endpoint 6: Calculate Total Price of Items in the Cart
function getTotalCartPrice(newCart) {
  let totalCartPrice = 0;
  for (let i = 0; i < newCart.length; i++) {
    totalCartPrice = totalCartPrice + (newCart[i].price * newCart[i].quantity);
  }
  return totalCartPrice;
}
app.get("/cart/total-price", (req, res) => {
  let totalPrice = getTotalCartPrice(newCart);
  res.json({totalPrice: totalPrice });
});
