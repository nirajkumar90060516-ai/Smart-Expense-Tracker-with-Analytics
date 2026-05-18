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

const categoryProducts = [
  {
    category: "Routers",
    name: "Cisco Enterprise Router",
    code: "RTR",
    price: 31200,
    color: "#2563eb",
  },
  {
    category: "Switches",
    name: "Cisco Catalyst Switch",
    code: "SWT",
    price: 38400,
    color: "#16a34a",
  },
  {
    category: "Network Hubs",
    name: "Cisco Network Hub",
    code: "HUB",
    price: 45600,
    color: "#f59e0b",
  },
  {
    category: "Gateways",
    name: "Cisco Secure Gateway",
    code: "GTW",
    price: 52800,
    color: "#7c3aed",
  },
  {
    category: "Wi-Fi Routers",
    name: "Cisco Wi-Fi Router",
    code: "WIFI",
    price: 60000,
    color: "#0891b2",
  },
  {
    category: "Wireless Access Points",
    name: "Cisco Wireless Access Point",
    code: "AP",
    price: 67200,
    color: "#dc2626",
  },
  {
    category: "Wireless Controllers",
    name: "Cisco Wireless Controller",
    code: "WLC",
    price: 74400,
    color: "#9333ea",
  },
  {
    category: "Firewalls",
    name: "Cisco Secure Firewall",
    code: "FW",
    price: 81600,
    color: "#ea580c",
  },
  {
    category: "VPN (Virtual Private Network)",
    name: "Cisco VPN Solution",
    code: "VPN",
    price: 88800,
    color: "#0f766e",
  },
];

function getProductImage(product) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="520" height="340" viewBox="0 0 520 340">
      <rect width="520" height="340" rx="26" fill="#eef5ff"/>
      <rect x="118" y="116" width="284" height="92" rx="18" fill="#092f69"/>
      <rect x="150" y="144" width="118" height="11" rx="5.5" fill="#55d3ff"/>
      <rect x="150" y="169" width="166" height="11" rx="5.5" fill="#8fb4ff"/>
      <circle cx="344" cy="162" r="13" fill="#22c55e"/>
      <circle cx="374" cy="162" r="13" fill="#f59e0b"/>
      <rect x="205" y="220" width="110" height="32" rx="16" fill="${product.color}"/>
      <text x="260" y="242" text-anchor="middle" font-family="Arial, sans-serif" font-size="17" font-weight="800" fill="#ffffff">${product.code}</text>
      <text x="260" y="286" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="800" fill="#0b2f6b">${product.category}</text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const mockProducts = categoryProducts.map((product, index) => ({
  _id: `product-${index + 1}`,
  productId: index + 1,
  category: product.category,
  name: product.name,
  code: `CISCO-${product.code}-${String(index + 1).padStart(3, "0")}`,
  status: index === 7 ? "Limited" : "Available",
  price: product.price,
  oldPrice: Math.round(product.price * 1.18),
  rating: Number((4.2 + (index % 5) * 0.1).toFixed(1)),
  reviews: 65 + index * 9,
  stock: 6 + index,
  image: getProductImage(product),
  performance: "Enterprise grade performance",
  useCase: "Office networks, secure branches and managed connectivity",
  warranty: "1 Year",
  delivery: "3-5 days",
  support: "24x7",
}));

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
