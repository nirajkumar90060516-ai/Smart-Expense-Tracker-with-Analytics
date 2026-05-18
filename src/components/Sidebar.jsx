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
                {item}
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
