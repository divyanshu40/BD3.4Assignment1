let express = require("express");
let app = express();
let cors = require("cors");
let PORT = 3000;
app.listen(PORT, () => {
  console.log("This server is running");
});
let cart = [
  { productId: 1, name: "Laptop", price: 50000, quantity: 1 },
  { productId: 2, name: "Mobile", price: 20000, quantity: 2 },
];
app.use(cors());
// Endpoint 1: Add an Item to the Cart
function addNewItemToCart(productId, name, price, quantity) {
  let newItem = {};
  newItem.productId = productId;
  newItem.name = name;
  newItem.price = price;
  newItem.quantity = quantity;
  cart.push(newItem);
  return cart;
}
app.get("/cart/add", (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result = addNewItemToCart(productId, name, price, quantity);
  res.json({ cartItems: result });
});
// Endpoint 2: Edit Quantity of an Item in the Cart
function editQuantityBYId(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}
app.get("/cart/edit", (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = editQuantityBYId(cart, productId, quantity);
  res.json({ cartItems: result });
});
// Endpoint 3: Delete an Item from the Cart
function deleteItemById(item, productId) {
  return item.productId != productId;
}
app.get("/cart/delete", (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = cart.filter((item) => deleteItemById(item, productId));
  res.json({ cartItems: result });
});
// Endpoint 4: Read Items in the Cart
function readCartItems(cart) {
  return cart;
}
app.get("/cart", (req, res) => {
  let result = readCartItems(cart);
  res.json({ cartItems: result });
});
// Endpoint 5: Calculate Total Quantity of Items in the Cart
function getTotalQuantityOfItems(cart) {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity = totalQuantity + cart[i].quantity
  }
  return totalQuantity;
}
app.get("/cart/total-quantity", (req, res) => {
  let result = getTotalQuantityOfItems(cart);
  res.json({ totalQuantity: result }); 
});
// Endpoint 6: Calculate Total Price of Items in the Cart
function getTotalPriceOfItems(cart) {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice = totalPrice + cart[i].price;
  }
  return totalPrice;
}
app.get("/cart/total-price", (req, res) => {
  let result = getTotalPriceOfItems(cart);
  res.json({ totalPrice: result });
});