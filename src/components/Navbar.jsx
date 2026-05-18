import { useState } from "react";

function Navbar({
  setOpenSidebar,
  settings,
  handleSidebarClick,
  searchText,
  setSearchText,
  currentUser,
  onLoginClick,
  onRegisterClick,
  onLogout,
}) {
  const [openProfile, setOpenProfile] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const initials = settings.fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2);

  function handleMenuClick(page) {
    handleSidebarClick(page);
    setOpenProfile(false);
  }

  function handleLogout() {
    setOpenProfile(false);
    onLogout();
    alert("Logout successfully");
  }

  function handleSearchClick() {
    setOpenSearch(true);
    setTimeout(() => {
      document.querySelector(".search-input")?.focus();
    }, 0);
  }

  function handleSearchClose() {
    setSearchText("");
    setOpenSearch(false);
  }

  return (
    <header className="top-navbar">
      <div className="nav-left">
        <button
          className="menu-btn"
          onClick={() => setOpenSidebar((prev) => !prev)}
        >
          ☰
        </button>

        <h2>
          Smart Expense Tracker <span>with Analytics</span>
        </h2>
      </div>

      <div className={`nav-center ${openSearch || searchText ? "search-open" : ""}`}>
        <button
          className="search-icon-btn"
          type="button"
          onClick={handleSearchClick}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>

        {(openSearch || searchText) && (
          <input
            type="text"
            placeholder="Search products, expenses, categories..."
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        )}

        {(openSearch || searchText) && (
          <button
            className="search-clear-btn"
            type="button"
            onClick={handleSearchClose}
          >
            x
          </button>
        )}
      </div>

      <div className="nav-right">
        {!currentUser && (
          <>
            <button className="btn" onClick={onLoginClick}>
              Login
            </button>
            <button className="btn" onClick={onRegisterClick}>
              Sign up
            </button>
          </>
        )}

        {currentUser && <span className="logged-in-pill">Logged in</span>}

        <div
          className="profile-box"
          onClick={() => setOpenProfile((prev) => !prev)}
        >
          {settings.profilePhoto ? (
            <img src={settings.profilePhoto} alt="profile" />
          ) : (
            <div className="navbar-avatar">{initials}</div>
          )}

          <div>
            <h4>{settings.fullName}</h4>
            <p>{settings.role}</p>
          </div>

          {openProfile && (
            <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => handleMenuClick("Profile")}>
                My Profile
              </button>
              <button type="button" onClick={() => handleMenuClick("Settings")}>
                Settings
              </button>
              <button type="button" onClick={() => handleMenuClick("About")}>
                About
              </button>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
