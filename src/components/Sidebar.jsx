// import logo from "./image.png";
// import { useState } from "react";

// function Sidebar({ openSidebar , activePage, handleSidebarClick }) {
//   const [openProducts, setOpenProducts] = useState(false);

//   const ProductItems = [
//     "Routers",
//     "Switches",
//     "Network Hubs",
//     "Gateways",
//     "Wi-Fi Routers",
//     "Wireless Access Points",
//     "Wireless Controllers",
//     "Firewalls",
//     "VPN (Virtual Private Network)",
//   ];

//   const menuItems = [
//     "Add Expense",
//     "Transactions",
//     "Categories",
//     "Reports",
//     "Analytics",
//     "Budgets",
//     "Goals",
//     "Reminders",
//     "Settings",
//     "Profile",
//   ];

//   return (
//     <aside className={`sidebar ${openSidebar ? "show-sidebar" : ""}`}>
//       <div className="logo-box">
//         <img src={logo} alt="logo" />
//       </div>

//       <ul className="menu-list">
//         <li className="active-menu-item">Home</li>

//         <li
//           className="menu-item"
//           onClick={() => setOpenProducts(!openProducts)}
//         >
//           Products {openProducts ? "▲" : "▼"}
//         </li>

//         {openProducts && (
//           <ul className="submenu-list">
//             {ProductItems.map((item, index) => (
//               <li key={index} className="submenu-item">
//                 {item}
//               </li>
//             ))}
//           </ul>
//         )}

//         {menuItems.map((item, index) => (
//           <li key={index} className="menu-item">
//             {item}
//           </li>
//         ))}
//       </ul>

      
//     </aside>
//   );
// }

// export default Sidebar;


import logo from "./image.png";
import { useState } from "react";

function getCategoryImage(category) {
  const labels = {
    Routers: "RTR",
    Switches: "SWT",
    "Network Hubs": "HUB",
    Gateways: "GTW",
    "Wi-Fi Routers": "WIFI",
    "Wireless Access Points": "AP",
    "Wireless Controllers": "WLC",
    Firewalls: "FW",
    "VPN (Virtual Private Network)": "VPN",
  };

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="72" viewBox="0 0 96 72">
      <rect width="96" height="72" rx="16" fill="#eff6ff"/>
      <rect x="18" y="24" width="60" height="28" rx="7" fill="#0b2f6b"/>
      <rect x="26" y="32" width="20" height="4" rx="2" fill="#60a5fa"/>
      <rect x="26" y="41" width="30" height="4" rx="2" fill="#93c5fd"/>
      <circle cx="64" cy="38" r="4" fill="#22c55e"/>
      <text x="48" y="16" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="800" fill="#2563eb">${labels[category] || "PRD"}</text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function Sidebar({
  openSidebar,
  activePage,
  handleSidebarClick,
  selectedProductCategory,
  handleProductClick,
}) {
  const [openProducts, setOpenProducts] = useState(false);

  const ProductItems = [
    "Routers",
    "Switches",
    "Network Hubs",
    "Gateways",
    "Wi-Fi Routers",
    "Wireless Access Points",
    "Wireless Controllers",
    "Firewalls",
    "VPN (Virtual Private Network)",
  ];

  const menuItems = [
    "Add Expense",
    "Transactions",
    "Categories",
    "Reports",
    "Analytics",
    "Budgets",
    "Goals",
    "Reminders",
    "Settings",
    "Profile",
  ];

  return (
    <aside className={`sidebar ${openSidebar ? "show-sidebar" : ""}`}>
      <div className="logo-box">
        <img src={logo} alt="logo" />
      </div>

      <ul className="menu-list">
        <li
          className={activePage === "Home" ? "active-menu-item" : "menu-item"}
          onClick={() => handleSidebarClick("Home")}
        >
          Home
        </li>

        <li
          className={activePage === "Products" ? "active-menu-item" : "menu-item"}
          onClick={() => {
            setOpenProducts(!openProducts);
            handleProductClick("All Products");
          }}
        >
          Products {openProducts ? "▲" : "▼"}
        </li>

        {openProducts && (
          <ul className="submenu-list">
            {ProductItems.map((item, index) => (
              <li
                key={index}
                className={
                  selectedProductCategory === item
                    ? "submenu-item active-submenu-item"
                    : "submenu-item"
                }
                onClick={() => handleProductClick(item)}
              >
                <img src={getCategoryImage(item)} alt="" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {menuItems.map((item, index) => (
          <li
            key={index}
            className={activePage === item ? "active-menu-item" : "menu-item"}
            onClick={() => handleSidebarClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
