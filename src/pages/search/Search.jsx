import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../app/slices/cartSlice";
import "./Search.css";
import Navbar from "../../shared/common/navbar/Navbar";

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Get search query from URL params or location state
  const searchParams = new URLSearchParams(location.search);
  const initialQuery =
    location.state?.searchQuery || searchParams.get("q") || "";

  // Dummy products data - at least 9 products
  const allProducts = [
    {
      id: 1,
      name: "Tokyo Mist Jacket",
      description: "Two-tone nylon shoulder bag built for city adventures.",
      price: 320,
      category: "Jackets",
      gender: "Unisex",
      sizes: ["S", "M", "L", "XL"],
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Urban Trek Sling",
      description: "Two-tone nylon shoulder bag built for city adventures.",
      price: 320,
      category: "Hoodies",
      gender: "Men",
      sizes: ["M", "L", "XL"],
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Kyoto Lavender Shirt",
      description: "Subtle gloss finish with an elegant cut stand out, softly.",
      price: 360,
      category: "Shirts",
      gender: "Men",
      sizes: ["S", "M", "L"],
      image:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3a30?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      name: "Black Sea Polo",
      description:
        "Minimal matte polo tee designed for understated confidence.",
      price: 390,
      category: "T-Shirts",
      gender: "Men",
      sizes: ["S", "M", "L", "XL"],
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      name: "Osaka Grid Layer",
      description:
        "Textured navy jacket with a geometric stitch detail smart & sleek.",
      price: 280,
      category: "Jackets",
      gender: "Unisex",
      sizes: ["S", "M", "L", "XL", "XXL"],
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      name: "Street Camo Tee",
      description: "Bold street camo made for modern urban rhythm.",
      price: 300,
      category: "T-Shirts",
      gender: "Men",
      sizes: ["S", "M", "L"],
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 7,
      name: "Snow Drift Hoodie",
      description: "Cloud-soft fabric with clean lines and cozy warmth.",
      price: 320,
      category: "Hoodies",
      gender: "Unisex",
      sizes: ["M", "L", "XL"],
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 8,
      name: "Charcoal Flex Sweatshirt",
      description:
        "Effortless fit meets stretch comfort in this cool-season staple.",
      price: 300,
      category: "Sweatshirts",
      gender: "Men",
      sizes: ["S", "M", "L", "XL"],
      image:
        "https://images.unsplash.com/photo-1571821324176-52ff15e96348?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 9,
      name: "Desert Tone Chinos",
      description:
        "Soft silk-linen blend polo with tailored stripes made for daily confidence.",
      price: 450,
      category: "Pants",
      gender: "Men",
      sizes: ["30", "32", "34", "36"],
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 10,
      name: "Ivory Bloom Shirt",
      description:
        "Soft silk-linen blend polo with tailored stripes made for daily confidence.",
      price: 380,
      category: "Shirts",
      gender: "Women",
      sizes: ["XS", "S", "M", "L"],
      image:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3a30?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 11,
      name: "Zen Cream Tee",
      description:
        "Soft silk-linen blend polo with tailored stripes made for daily confidence.",
      price: 250,
      category: "T-Shirts",
      gender: "Women",
      sizes: ["XS", "S", "M"],
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 12,
      name: "Sketch City Tee",
      description:
        "Soft silk-linen blend polo with tailored stripes made for daily confidence.",
      price: 270,
      category: "T-Shirts",
      gender: "Unisex",
      sizes: ["S", "M", "L", "XL"],
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    },
  ];

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Collapsible filter states
  const [expandedFilters, setExpandedFilters] = useState({
    categories: true,
    price: true,
    gender: false,
    size: false,
  });

  // Get unique categories, genders, and sizes
  const categories = ["All", ...new Set(allProducts.map((p) => p.category))];
  const genders = ["All", "Men", "Women", "Unisex"];
  const allSizes = [...new Set(allProducts.flatMap((p) => p.sizes))].sort();

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesGender =
        selectedGender === "All" || product.gender === selectedGender;
      const matchesSize =
        selectedSizes.length === 0 ||
        product.sizes.some((size) => selectedSizes.includes(size));
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return (
        matchesCategory &&
        matchesPrice &&
        matchesGender &&
        matchesSize &&
        matchesSearch
      );
    });
  }, [
    selectedCategory,
    priceRange,
    selectedGender,
    selectedSizes,
    searchQuery,
  ]);

  const handleSizeToggle = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const toggleFilter = (filterName) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const handleAddToCart = (product) => {
    dispatch(
      addItemToCart({
        ProductId: product.id,
        ProductName: product.name,
        UnitPrice: product.price,
        Quantity: 1,
      }),
    );
    navigate("/cart");
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Calculate product counts for price ranges
  const getPriceRangeCount = (min, max) => {
    return allProducts.filter((p) => p.price >= min && p.price <= max).length;
  };

  return (
    <>
      <Navbar />
      <div className="search-page">
        <div className="search-container">
          <div className="search-layout">
            {/* Left Sidebar - Filters */}
            <aside className="search-filters">
              <div className="filter-section">
                <div
                  className="filter-header"
                  onClick={() => toggleFilter("categories")}
                >
                  <h3>Categories</h3>
                  <span
                    className={`material-icons ${expandedFilters.categories ? "expanded" : ""}`}
                  >
                    expand_more
                  </span>
                </div>
                {expandedFilters.categories && (
                  <div className="filter-content">
                    {categories.map((cat) => (
                      <label key={cat} className="filter-option">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat}
                          onChange={() => setSelectedCategory(cat)}
                        />
                        <span>{cat === "All" ? "All Categories" : cat}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="filter-section">
                <div
                  className="filter-header"
                  onClick={() => toggleFilter("price")}
                >
                  <h3>Product Price</h3>
                  <span
                    className={`material-icons ${expandedFilters.price ? "expanded" : ""}`}
                  >
                    expand_more
                  </span>
                </div>
                {expandedFilters.price && (
                  <div className="filter-content">
                    <label className="filter-option">
                      <input
                        type="radio"
                        name="price"
                        checked={priceRange[0] === 0 && priceRange[1] === 1000}
                        onChange={() => setPriceRange([0, 1000])}
                      />
                      <span>All Price</span>
                    </label>
                    <label className="filter-option">
                      <input
                        type="radio"
                        name="price"
                        checked={priceRange[0] === 0 && priceRange[1] === 200}
                        onChange={() => setPriceRange([0, 200])}
                      />
                      <span>Below $200 ({getPriceRangeCount(0, 199)})</span>
                    </label>
                    <label className="filter-option">
                      <input
                        type="radio"
                        name="price"
                        checked={priceRange[0] === 200 && priceRange[1] === 500}
                        onChange={() => setPriceRange([200, 500])}
                      />
                      <span>$200 - $500 ({getPriceRangeCount(200, 500)})</span>
                    </label>
                    <label className="filter-option">
                      <input
                        type="radio"
                        name="price"
                        checked={priceRange[0] === 500 && priceRange[1] === 800}
                        onChange={() => setPriceRange([500, 800])}
                      />
                      <span>$500 - $800 ({getPriceRangeCount(500, 800)})</span>
                    </label>
                    <div className="price-slider-section">
                      <label className="filter-label">Custom Price Range</label>
                      <div className="price-slider-container">
                        <div className="price-slider-wrapper">
                          <input
                            type="range"
                            min="0"
                            max="1000"
                            value={priceRange[0]}
                            onChange={(e) =>
                              setPriceRange([
                                Number(e.target.value),
                                priceRange[1],
                              ])
                            }
                            className="price-slider"
                          />
                          <input
                            type="range"
                            min="0"
                            max="1000"
                            value={priceRange[1]}
                            onChange={(e) =>
                              setPriceRange([
                                priceRange[0],
                                Number(e.target.value),
                              ])
                            }
                            className="price-slider"
                          />
                        </div>
                        <div className="price-display">
                          <span className="price-value">${priceRange[0]}</span>
                          <span className="price-separator">-</span>
                          <span className="price-value price-value-highlight">
                            ${priceRange[1]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="filter-section">
                <div
                  className="filter-header"
                  onClick={() => toggleFilter("gender")}
                >
                  <h3>Gender</h3>
                  <span
                    className={`material-icons ${expandedFilters.gender ? "expanded" : ""}`}
                  >
                    expand_more
                  </span>
                </div>
                {expandedFilters.gender && (
                  <div className="filter-content">
                    {genders.map((gender) => (
                      <label key={gender} className="filter-option">
                        <input
                          type="radio"
                          name="gender"
                          checked={selectedGender === gender}
                          onChange={() => setSelectedGender(gender)}
                        />
                        <span>{gender}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="filter-section">
                <div
                  className="filter-header"
                  onClick={() => toggleFilter("size")}
                >
                  <h3>Size & Fit</h3>
                  <span
                    className={`material-icons ${expandedFilters.size ? "expanded" : ""}`}
                  >
                    expand_more
                  </span>
                </div>
                {expandedFilters.size && (
                  <div className="filter-content">
                    <div className="size-grid">
                      {allSizes.map((size) => (
                        <button
                          key={size}
                          className={`size-chip ${selectedSizes.includes(size) ? "active" : ""}`}
                          onClick={() => handleSizeToggle(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button className="apply-filter-btn">Apply</button>
            </aside>

            {/* Main Content - Product Grid */}
            <main className="search-main">
              <div className="search-results-header">
                <div className="breadcrumb">
                  <span>Categories</span>
                  <span className="material-icons">chevron_right</span>
                  <span>
                    {selectedCategory === "All" ? "All" : selectedCategory}
                  </span>
                  <span className="material-icons">chevron_right</span>
                  <span>All Price</span>
                </div>
                <p className="results-count">
                  Showing all {filteredProducts.length} items results
                </p>
              </div>

              <div className="product-grid">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="product-grid-card"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <div className="product-grid-image">
                        <img src={product.image} alt={product.name} />
                        <div className="product-grid-actions">
                          <button
                            className="product-action-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add to wishlist logic here
                            }}
                            title="Add to wishlist"
                          >
                            <span className="material-icons">
                              favorite_border
                            </span>
                          </button>
                          <button
                            className="product-action-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                            title="Add to cart"
                          >
                            <span className="material-icons">shopping_bag</span>
                          </button>
                        </div>
                      </div>
                      <div className="product-grid-info">
                        <h4 className="product-grid-name">{product.name}</h4>
                        <p className="product-grid-description">
                          {product.description}
                        </p>
                        <p className="product-grid-price">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-results">
                    <p>No products found matching your criteria.</p>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
