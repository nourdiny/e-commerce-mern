const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken"); // Add JWT library
const User = require("../Schema/User");
const Product = require("../Schema/Product");
const Cart = require("../Schema/Cart");
const Order = require("../Schema/Order");

require("dotenv").config();

const app = express();
const router = express.Router();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

const mongooseConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, mongooseConnectionOptions)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// simple route
router.get("/", (req, res) => {
  res.send("<h1>Hoolee</h1>");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        // Valid credentials
        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
          expiresIn: "1h", // Token expiration time
        });
        res.status(200).json({ user, token, message: "Login successful" });
      } else {
        // Invalid password
        res
          .status(401)
          .json({ success: false, message: "Invalid credentials password" });
      }
    } else {
      // User not found
      res
        .status(401)
        .json({ success: false, message: "Invalid credentials user" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password , phone } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
      role: "user",
    });
    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products" });
  }
});

router.put("/add-or-update-cart/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const { qtyItem } = req.body;
    const { idUser } = req.body;
    const existingItem = await Cart.findOne({ idItem: itemId, idUser: idUser });

    if (!existingItem) {
      const newItem = new Cart({
        idItem: itemId,
        idUser: idUser,
        qty: qtyItem,
      });
      const savedItem = await newItem.save();
      return res
        .status(201)
        .json({ message: "Item added to the cart", item: savedItem });
    }

    const existingQty = Number(existingItem.qty);
    const newQtyValue = Number(qtyItem);

    if (isNaN(existingQty) || isNaN(newQtyValue)) {
      return res.status(400).json({ message: "Invalid quantity values" });
    }

    existingItem.qty = existingQty + newQtyValue;
    const updatedItem = await existingItem.save();

    res
      .status(200)
      .json({ message: "Item quantity updated", data: updatedItem });
  } catch (error) {
    console.error("Error updating item quantity:", error);
    res.status(500).json({ error: "Unable to update item quantity" });
  }
});

router.delete("/delete-cart/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const deletedItem = await Cart.findOneAndRemove({ idItem: itemId });
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found in the cart" });
    }

    res.status(204).end(); // Respond with a 204 No Content status if successful
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    res.status(500).json({ error: "Unable to delete item from cart" });
  }
});

router.delete("/clear-cart/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const deletedAll = await Cart.deleteMany({ idUser: itemId });
    if (!deletedAll) {
      return res.status(404).json({ message: "Problem in delete All" });
    }
    res.status(204).end(); // Respond with a 204 No Content status if successful
  } catch (error) {
    console.error("Error clear items from cart:", error);
    res.status(500).json({ error: "Unable to clear items from cart" });
  }
});

router.get("/carts/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    // Use Mongoose to query the database for all cart items
    const allItems = await Cart.find({ idUser: itemId });

    res.status(200).json({ data: allItems });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Unable to fetch cart items" });
  }
});

router.get("/total-carts/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    // Use Mongoose to query the database for all cart items
    const allItems = await Cart.find({ idUser: itemId });
    let totalSum = 0;
    let productArr = [];

    for (const item of allItems) {
      const quantity = item.qty;
      const product = await Product.findOne({ _id: item.idItem }).exec(); 

      const productPrice = parseFloat(product.price.replace("$", ""));
 
      const itemTotal = Number(quantity) * Number(productPrice);
      productArr.push({"productId" : item.idItem, "quantity" : quantity}); 
      totalSum += itemTotal;
    }

    res.status(200).json({ sum: totalSum, productArr: productArr });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Unable to fetch cart items" });
  }
});

router.post("/orders", async (req, res) => {
  try {
    const { userId } = req.body;
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    if (savedOrder) {
      const deletedAll = await Cart.deleteMany({ idUser: userId });
    }
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/orders/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const orders = await Order.find({ userId: itemId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/delete-order/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const deleteorder = await Order.findOneAndRemove({ _id: itemId });
    if (!deleteorder) {
      return res.status(404).json({ message: "Ordre not found" });
    }

    res.status(201).json({ message: "Ordre is Delete" }); // Respond with a 204 No Content status if successful
  } catch (error) {
    console.error("Error deleting  Order:", error);
    res.status(500).json({ error: "Unable to delete Order" });
  }
});

// Add middleware to verify JWT token
router.use((req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Token is invalid" });
  }
});

app.use("/", router);
