import { useEffect, useState } from "react";
import { apiBaseUrl } from "../lib/api";

function formatCurrency(amount) {
  return `Rs ${Number(amount || 0).toLocaleString("en-IN")}`;
}

function getDiscount(price, oldPrice) {
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

function getFallbackImage(product) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="420" height="280" viewBox="0 0 420 280">
      <rect width="420" height="280" rx="20" fill="#eef5ff"/>
      <rect x="64" y="92" width="292" height="96" rx="18" fill="#0b2f6b"/>
      <rect x="92" y="120" width="122" height="12" rx="6" fill="#55d3ff"/>
      <rect x="92" y="146" width="172" height="12" rx="6" fill="#7ea6ff"/>
      <circle cx="292" cy="140" r="12" fill="#22c55e"/>
      <circle cx="324" cy="140" r="12" fill="#f59e0b"/>
      <text x="210" y="228" text-anchor="middle" font-family="Arial, sans-serif" font-size="17" font-weight="800" fill="#2563eb">${product.category}</text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function Products({
  selectedCategory,
  setSelectedCategory,
  globalSearchText = "",
  requester,
}) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All Products"]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [quoteMessage, setQuoteMessage] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const activeSearchText = globalSearchText || searchText;

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${apiBaseUrl}/product-categories`);
        const data = await res.json();

        if (res.ok) {
          setCategories(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      const params = new URLSearchParams({
        category: selectedCategory,
        search: activeSearchText,
      });

      try {
        const res = await fetch(`${apiBaseUrl}/products?${params.toString()}`);
        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Products load nahi hue");
          return;
        }

        setProducts(data.data);
        setSelectedProduct((current) => {
          if (current && data.data.some((item) => item._id === current._id)) {
            return current;
          }

          return data.data[0] || null;
        });
      } catch (error) {
        console.log(error);
        alert("Backend server nahi chal raha ya products API error hai");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedCategory, activeSearchText]);

  const totalInventoryValue = products.reduce(
    (total, item) => total + item.price * item.stock,
    0
  );

  async function handleViewDetails(product) {
    try {
      const res = await fetch(`${apiBaseUrl}/products/${product._id}`);
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Product details load nahi hui");
        return;
      }

      setSelectedProduct(data.data);
      setShowDetails(true);
      setQuoteMessage("");
    } catch (error) {
      console.log(error);
      alert("Product details API error hai");
    }
  }

  async function handleQuote(product) {
    try {
      const res = await fetch(`${apiBaseUrl}/product-quotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          requestedBy: requester?.name || "Guest User",
          requesterEmail: requester?.email || "",
          requesterRole: requester?.role || "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Quote request save nahi hui");
        return;
      }

      setQuoteMessage(`${product.name} quote request saved`);
      alert(data.message);
    } catch (error) {
      console.log(error);
      alert("Quote request API error hai");
    }
  }

  if (loading) {
    return <h2>Products loading...</h2>;
  }

  return (
    <div className="products-page">
      <div className="products-summary-grid">
        <div className="products-summary-card">
          <span className="product-summary-icon blue-icon">P</span>
          <div>
            <p>Total Products</p>
            <h2>{products.length}</h2>
          </div>
        </div>

        <div className="products-summary-card">
          <span className="product-summary-icon green-icon">S</span>
          <div>
            <p>In Stock</p>
            <h2>{products.reduce((total, item) => total + item.stock, 0)}</h2>
          </div>
        </div>

        <div className="products-summary-card">
          <span className="product-summary-icon orange-icon">C</span>
          <div>
            <p>Categories</p>
            <h2>{Math.max(categories.length - 1, 0)}</h2>
          </div>
        </div>

        <div className="products-summary-card">
          <span className="product-summary-icon red-icon">Rs</span>
          <div>
            <p>Inventory Value</p>
            <h2>{formatCurrency(totalInventoryValue)}</h2>
          </div>
        </div>
      </div>

      <div className="products-toolbar">
        <div className="products-tabs">
          {categories.map((category) => (
            <button
              className={selectedCategory === category ? "active-product-tab" : ""}
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder={
            globalSearchText
              ? `Navbar search: ${globalSearchText}`
              : "Search product, code, category..."
          }
          disabled={Boolean(globalSearchText)}
        />
      </div>

      {quoteMessage && <div className="quote-success-message">{quoteMessage}</div>}

      <div className="products-layout">
        <section className="product-cards-grid">
          {products.length === 0 && (
            <div className="no-search-result">
              <h3>No products found</h3>
              <p>Try another product name, model code or category.</p>
            </div>
          )}

          {products.map((product) => (
            <article
              className={`product-card ${
                selectedProduct?._id === product._id ? "selected-product-card" : ""
              }`}
              key={product._id}
            >
              <div className="product-image-box">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.currentTarget.src = getFallbackImage(product);
                  }}
                />
                <span className="product-discount">
                  {getDiscount(product.price, product.oldPrice)}% off
                </span>
              </div>

              <div className="product-card-top">
                <span className="product-mark">{product.category.slice(0, 2)}</span>
                <span className={`product-status ${product.status.toLowerCase()}`}>
                  {product.status}
                </span>
              </div>

              <h2>{product.name}</h2>
              <p className="product-code-line">{product.code} | {product.category}</p>

              <div className="product-rating-row">
                <span>{product.rating} ★</span>
                <p>{product.reviews} reviews</p>
              </div>

              <div className="product-price-row">
                <strong>{formatCurrency(product.price)}</strong>
                <del>{formatCurrency(product.oldPrice)}</del>
              </div>

              <p className="product-delivery-line">
                Free delivery | Cisco verified product
              </p>

              <div className="product-meta-grid">
                <div>
                  <span>Stock</span>
                  <strong>{product.stock} units</strong>
                </div>
                <div>
                  <span>Warranty</span>
                  <strong>{product.warranty}</strong>
                </div>
                <div>
                  <span>Delivery</span>
                  <strong>{product.delivery}</strong>
                </div>
                <div>
                  <span>Support</span>
                  <strong>{product.support}</strong>
                </div>
              </div>

              <div className="product-card-actions">
                <button type="button" onClick={() => handleViewDetails(product)}>
                  View Details
                </button>
                <button type="button" onClick={() => handleQuote(product)}>
                  Request Quote
                </button>
              </div>
            </article>
          ))}
        </section>

        {showDetails && selectedProduct && (
          <div className="product-modal-overlay">
            <aside className="product-details-panel product-details-modal">
              <button
                className="product-modal-close"
                type="button"
                onClick={() => setShowDetails(false)}
              >
                x
              </button>

            <div className="product-details-header">
              <img
                className="product-details-image"
                src={selectedProduct.image}
                alt={selectedProduct.name}
                onError={(e) => {
                  e.currentTarget.src = getFallbackImage(selectedProduct);
                }}
              />
              <div>
                <p>{selectedProduct.category}</p>
                <h2>{selectedProduct.name}</h2>
                <span className="details-rating">
                  {selectedProduct.rating} ★ | {selectedProduct.reviews} reviews
                </span>
              </div>
            </div>

            <div className="product-details-list">
              <div>
                <span>Model Code</span>
                <strong>{selectedProduct.code}</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{selectedProduct.status}</strong>
              </div>
              <div>
                <span>Unit Price</span>
                <strong>{formatCurrency(selectedProduct.price)}</strong>
              </div>
              <div>
                <span>Available Stock</span>
                <strong>{selectedProduct.stock}</strong>
              </div>
            </div>

            <div className="product-info-block">
              <h3>Performance</h3>
              <p>{selectedProduct.performance}</p>
            </div>

            <div className="product-info-block">
              <h3>Recommended Use</h3>
              <p>{selectedProduct.useCase}</p>
            </div>

            <button type="button" onClick={() => handleQuote(selectedProduct)}>
              Request Product Review
            </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
