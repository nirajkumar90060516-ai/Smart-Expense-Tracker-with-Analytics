const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const crypto = require("crypto");
const path = require("path");
require("dotenv").config();
const Expense = require("./models/Expense");
const Product = require("./models/Product");
const QuoteRequest = require("./models/QuoteRequest");
const User = require("./models/User");

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/smartExpenseDB";
const corsOrigin = process.env.CORS_ORIGIN || "*";
const distPath = path.join(__dirname, "../dist");

app.use(cors({ origin: corsOrigin }));
app.use(express.json());
app.use(express.static(distPath));

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

const defaultEmployee = {
  employeeId: "EMP001",
  employeeName: "Rahul Sharma",
  department: "Information Technology",
  designation: "Software Engineer",
  email: "rahul.sharma@cisco.com",
};

const defaultExpenses = [
  {
    ...defaultEmployee,
    title: "Lunch with Team",
    amount: 560,
    category: "Food & Dining",
    date: "2024-04-28",
    method: "UPI",
    status: "Paid",
    description: "Lunch with Team",
  },
  {
    ...defaultEmployee,
    title: "Uber Ride",
    amount: 350,
    category: "Travel",
    date: "2024-04-28",
    method: "UPI",
    status: "Paid",
    description: "Uber Ride",
  },
  {
    ...defaultEmployee,
    title: "Electricity Bill",
    amount: 1250,
    category: "Bills & Utilities",
    date: "2024-04-27",
    method: "Net Banking",
    status: "Paid",
    description: "Electricity Bill",
  },
  {
    ...defaultEmployee,
    title: "Amazon Purchase",
    amount: 2399,
    category: "Shopping",
    date: "2024-04-26",
    method: "Credit Card",
    status: "Paid",
    description: "Amazon Purchase",
  },
];

const productImages = {
  Routers:
    "https://www.cisco.com/content/dam/cisco-cdc/site/images/heroes/products/networking/sdwan-routers/4000-series-isr-hero-desktop-3200x1372.jpg",
  Switches:
    "https://www.cisco.com/content/dam/cisco-cdc/site/images/heroes/products/networking/9300x-hero-overview-desktop-3200x1312.jpg",
  "Network Hubs":
    "https://www.cisco.com/content/dam/cisco-cdc/site/images/heroes/products/networking/9300x-hero-overview-desktop-3200x1312.jpg",
  Gateways:
    "https://www.cisco.com/content/dam/cisco-cdc/site/images/heroes/products/networking/sdwan-routers/4000-series-isr-hero-desktop-3200x1372.jpg",
  "Wi-Fi Routers":
    "https://www.cisco.com/content/dam/cisco-cdc/site/images/graphics/products/networking/cloud-spotlight-promo-690x288.jpg",
  "Wireless Access Points":
    "https://www.cisco.com/content/dam/cisco-cdc/site/images/graphics/products/networking/cloud-spotlight-promo-690x288.jpg",
  "Wireless Controllers":
    "https://www.cisco.com/content/dam/cisco-cdc/site/images/photography/product-photography/products/networking/spatha-cw9800m-front-1-3840x2160.jpg",
  Firewalls:
    "https://www.cisco.com/content/dam/cisco-cdc/site/images/heroes/products/security/firepower-laptop-showing-graph-hero-3200x1312.jpg",
  "VPN (Virtual Private Network)":
    "https://www.cisco.com/content/dam/cisco-cdc/site/images/graphics/products/networking/cloud-spotlight-promo-690x288.jpg",
};

const baseProducts = [
  {
    category: "Routers",
    name: "Cisco Integrated Services Router",
    code: "ISR",
    basePrice: 185000,
    performance: "High branch routing",
    useCase: "Branch offices, WAN edge and secure connectivity",
  },
  {
    category: "Switches",
    name: "Cisco Catalyst Switch",
    code: "C",
    basePrice: 132000,
    performance: "Enterprise access switching",
    useCase: "Campus LAN, office floors and wired endpoints",
  },
  {
    category: "Network Hubs",
    name: "Cisco Network Hub",
    code: "HUB",
    basePrice: 18500,
    performance: "Basic network distribution",
    useCase: "Small lab networks and training environments",
  },
  {
    category: "Gateways",
    name: "Cisco Secure Gateway",
    code: "GW",
    basePrice: 78000,
    performance: "Secure internet gateway",
    useCase: "Site access, branch security and traffic control",
  },
  {
    category: "Wi-Fi Routers",
    name: "Cisco Wi-Fi Router",
    code: "WR",
    basePrice: 24500,
    performance: "Fast wireless routing",
    useCase: "Small offices, remote teams and home branches",
  },
  {
    category: "Wireless Access Points",
    name: "Cisco Wireless Access Point",
    code: "AP",
    basePrice: 42000,
    performance: "Enterprise wireless access",
    useCase: "Office Wi-Fi, meeting rooms and campus coverage",
  },
  {
    category: "Wireless Controllers",
    name: "Cisco Wireless Controller",
    code: "WLC",
    basePrice: 225000,
    performance: "Central wireless management",
    useCase: "Large Wi-Fi deployments and policy control",
  },
  {
    category: "Firewalls",
    name: "Cisco Secure Firewall",
    code: "FPR",
    basePrice: 156000,
    performance: "Threat protection",
    useCase: "Network protection, intrusion prevention and VPN",
  },
  {
    category: "VPN (Virtual Private Network)",
    name: "Cisco VPN Solution",
    code: "VPN",
    basePrice: 36000,
    performance: "Secure remote access",
    useCase: "Remote employees, encrypted access and secure login",
  },
];

const productVariants = [
  "100",
  "120",
  "220",
  "250",
  "300",
  "350",
  "420",
  "450",
  "500",
  "550",
  "600",
  "650",
];

const defaultProducts = Array.from({ length: 100 }, (_, index) => {
  const base = baseProducts[index % baseProducts.length];
  const variant = productVariants[index % productVariants.length];
  const multiplier = 1 + (index % 11) * 0.075;
  const price = Math.round((base.basePrice * multiplier) / 100) * 100;

  return {
    productId: index + 1,
    category: base.category,
    name: `${base.name} ${variant}`,
    code: `${base.code}-${variant}-${String(index + 1).padStart(3, "0")}`,
    status: index % 13 === 0 ? "Limited" : "Available",
    price,
    oldPrice: Math.round((price * 1.18) / 100) * 100,
    rating: Number((4.1 + (index % 8) * 0.1).toFixed(1)),
    reviews: 62 + index * 7,
    stock: 5 + ((index * 3) % 46),
    image: productImages[base.category],
    performance: base.performance,
    useCase: base.useCase,
    warranty: "1 Year",
    delivery: "3-5 days",
    support: "24x7",
  };
});

async function seedDefaultExpenses() {
  const existingExpenseCount = await Expense.countDocuments({
    employeeId: defaultEmployee.employeeId,
  });

  if (existingExpenseCount === 0) {
    await Expense.insertMany(defaultExpenses);
    console.log("Default expense data inserted");
  }
}

async function seedDefaultProducts() {
  const existingProductCount = await Product.countDocuments();

  if (existingProductCount === 0) {
    await Product.insertMany(defaultProducts);
    console.log("Default product data inserted");
  }
}

mongoose
  .connect(mongoUri)
  .then(async () => {
    console.log("MongoDB connected");
    await seedDefaultExpenses();
    await seedDefaultProducts();
  })
  .catch((err) => console.log(err));

app.post("/api/auth/register", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      employeeId,
      department,
      role,
      password,
    } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Name, email aur password required hai",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password kam se kam 6 characters ka hona chahiye",
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(409).json({
        message: "Ye email already registered hai. Login karo.",
      });
    }

    const user = await User.create({
      fullName,
      email,
      phone,
      employeeId,
      department,
      role: role || "Employee",
      passwordHash: hashPassword(password),
    });

    res.status(201).json({
      message: "Registration successful. Ab login kar sakte ho.",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        employeeId: user.employeeId,
        department: user.department,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration save nahi hua",
      error: error.message,
    });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email aur password required hai",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({
        message: "Pehle register karo, phir login hoga",
      });
    }

    if (user.passwordHash !== hashPassword(password)) {
      return res.status(401).json({
        message: "Password galat hai",
      });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        employeeId: user.employeeId,
        department: user.department,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login nahi hua",
      error: error.message,
    });
  }
});

/* Expense form ka data store */
app.post("/api/expenses", async (req, res) => {     
  try {
    const expense = await Expense.create(req.body);

    res.status(201).json({
      message: "Expense saved successfully",
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Expense save nahi hua",
      error: error.message,
    });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const { category = "All Products", search = "" } = req.query;
    const query = {};

    if (category && category !== "All Products") {
      query.category = category;
    }

    if (search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");

      query.$or = [
        { name: searchRegex },
        { code: searchRegex },
        { category: searchRegex },
        { status: searchRegex },
      ];
    }

    const products = await Product.find(query).sort({ productId: 1 });

    res.json({
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Products load nahi hue",
      error: error.message,
    });
  }
});

app.get("/api/product-categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category");

    res.json({
      data: ["All Products", ...categories.sort()],
    });
  } catch (error) {
    res.status(500).json({
      message: "Product categories load nahi hui",
      error: error.message,
    });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { productId: Number(id) };

    const product = await Product.findOne(query);

    if (!product) {
      return res.status(404).json({
        message: "Product nahi mila",
      });
    }

    res.json({
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Product details load nahi hui",
      error: error.message,
    });
  }
});

app.post("/api/product-quotes", async (req, res) => {
  try {
    const { productId, requestedBy, requesterEmail, requesterRole } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Quote ke liye product nahi mila",
      });
    }

    const quoteRequest = await QuoteRequest.create({
      product: product._id,
      productName: product.name,
      productCode: product.code,
      requestedBy,
      requesterEmail,
      requesterRole,
    });

    res.status(201).json({
      message: "Quote request backend me save ho gayi",
      data: quoteRequest,
    });
  } catch (error) {
    res.status(500).json({
      message: "Quote request save nahi hui",
      error: error.message,
    });
  }
});

/* Employee ke hisab se report generate */
app.get("/api/report/:employeeId", async (req, res) => {
  try {
    const employeeId = req.params.employeeId.trim();

    const expenses = await Expense.find({ employeeId });

    if (expenses.length === 0) {
      return res.status(404).json({
        message: "Is employee ka expense data nahi mila",
      });
    }

    const employee = expenses[0];

    const totalExpenses = expenses.reduce(
      (total, item) => total + item.amount,
      0
    );

    const totalIncome = 50000;
    const monthlyBudget = 30000;
    const totalSavings = totalIncome - totalExpenses;
    const budgetUsed = (totalExpenses / monthlyBudget) * 100;

    const categoryWise = {};

    expenses.forEach((item) => {
      if (categoryWise[item.category]) {
        categoryWise[item.category] += item.amount;
      } else {
        categoryWise[item.category] = item.amount;
      }
    });

    const paymentWise = {};

    expenses.forEach((item) => {
      if (paymentWise[item.method]) {
        paymentWise[item.method] += item.amount;
      } else {
        paymentWise[item.method] = item.amount;
      }
    });

    res.json({
      company: {
        name: "Cisco Systems",
        location: "San Jose, California, USA",
        about:
          "Cisco Systems is a global leader in networking and IT solutions.",
      },

      employee: {
        name: employee.employeeName,
        employeeId: employee.employeeId,
        department: employee.department,
        designation: employee.designation,
        email: employee.email,
        reportMonth: "May 2024",
      },

      summary: {
        totalIncome,
        totalExpenses,
        totalSavings,
        monthlyBudget,
        budgetUsed: budgetUsed.toFixed(2),
      },

      categoryWise,
      paymentWise,
      recentExpenses: expenses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Report generate nahi hui",
      error: error.message,
    });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
