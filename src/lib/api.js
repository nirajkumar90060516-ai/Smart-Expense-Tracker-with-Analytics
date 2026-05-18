const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const defaultApiBaseUrl = import.meta.env.PROD
  ? "/api"
  : "http://localhost:5000/api";

export const apiBaseUrl = (configuredApiBaseUrl || defaultApiBaseUrl).replace(
  /\/+$/,
  ""
);

export const isMockApi =
  import.meta.env.VITE_API_MODE === "mock" ||
  window.location.hostname.endsWith("github.io");

const defaultEmployee = {
  employeeId: "EMP001",
  employeeName: "Rahul Sharma",
  department: "Information Technology",
  designation: "Software Engineer",
  email: "rahul.sharma@cisco.com",
};

const mockExpenses = [
  {
    _id: "expense-1",
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
    _id: "expense-2",
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
    _id: "expense-3",
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
    _id: "expense-4",
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

const mockProducts = [
  "Routers",
  "Switches",
  "Network Hubs",
  "Gateways",
  "Wi-Fi Routers",
  "Wireless Access Points",
  "Wireless Controllers",
  "Firewalls",
  "VPN (Virtual Private Network)",
].flatMap((category, categoryIndex) =>
  Array.from({ length: 4 }, (_, index) => {
    const productId = categoryIndex * 4 + index + 1;
    const price = 24000 + productId * 7200;

    return {
      _id: `product-${productId}`,
      productId,
      category,
      name: `Cisco ${category.replace(" (Virtual Private Network)", "")} ${100 + index * 50}`,
      code: `CISCO-${String(productId).padStart(3, "0")}`,
      status: productId % 7 === 0 ? "Limited" : "Available",
      price,
      oldPrice: Math.round(price * 1.18),
      rating: Number((4.1 + (productId % 8) * 0.1).toFixed(1)),
      reviews: 60 + productId * 5,
      stock: 5 + productId,
      image:
        "https://www.cisco.com/content/dam/cisco-cdc/site/images/heroes/products/networking/9300x-hero-overview-desktop-3200x1312.jpg",
      performance: "Enterprise grade performance",
      useCase: "Office networks, secure branches and managed connectivity",
      warranty: "1 Year",
      delivery: "3-5 days",
      support: "24x7",
    };
  })
);

export function getMockCategories() {
  return ["All Products", ...new Set(mockProducts.map((item) => item.category))];
}

export function getMockProducts(category = "All Products", search = "") {
  const searchText = search.trim().toLowerCase();

  return mockProducts.filter((product) => {
    const matchesCategory = category === "All Products" || product.category === category;
    const matchesSearch =
      !searchText ||
      [product.name, product.code, product.category, product.status]
        .join(" ")
        .toLowerCase()
        .includes(searchText);

    return matchesCategory && matchesSearch;
  });
}

export function getMockProduct(id) {
  return mockProducts.find((product) => product._id === id || product.productId === Number(id));
}

export function getMockReport() {
  const totalExpenses = mockExpenses.reduce((total, item) => total + item.amount, 0);
  const totalIncome = 50000;
  const monthlyBudget = 30000;
  const categoryWise = {};
  const paymentWise = {};

  mockExpenses.forEach((item) => {
    categoryWise[item.category] = (categoryWise[item.category] || 0) + item.amount;
    paymentWise[item.method] = (paymentWise[item.method] || 0) + item.amount;
  });

  return {
    company: {
      name: "Cisco Systems",
      location: "San Jose, California, USA",
      about: "Cisco Systems is a global leader in networking and IT solutions.",
    },
    employee: {
      name: defaultEmployee.employeeName,
      employeeId: defaultEmployee.employeeId,
      department: defaultEmployee.department,
      designation: defaultEmployee.designation,
      email: defaultEmployee.email,
      reportMonth: "May 2024",
    },
    summary: {
      totalIncome,
      totalExpenses,
      totalSavings: totalIncome - totalExpenses,
      monthlyBudget,
      budgetUsed: ((totalExpenses / monthlyBudget) * 100).toFixed(2),
    },
    categoryWise,
    paymentWise,
    recentExpenses: mockExpenses,
  };
}
