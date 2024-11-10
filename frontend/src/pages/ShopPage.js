// src/pages/ShopPage.js

import React, { useState } from 'react';
import '../styles/shop.css';

const products = [
  {
    id: 1,
    image: "/shop_pics/local_honey_pic.jpg",
    name: "Local Honey",
    price: 100,
  },
  {
    id: 2,
    image: "/shop_pics/yeti_bottle_pic.jpg",
    name: "Metallic Bottle",
    price: 150,
  },
  {
    id: 3,
    image: "/shop_pics/seed_kit_pic.jpg",
    name: "Veggie Seed Garden Kit",
    price: 200,
  },
  {
    id: 4,
    image: "/shop_pics/power_bank_pic.jpg",
    name: "Solar Panel Power Bank",
    price: 300,
  },
  {
    id: 5,
    image: "/shop_pics/bamboo_cloths_pic.jpg",
    name: "Reusable Bamboo Cloth",
    price: 200,
  },
  {
    id: 6,
    image: "/shop_pics/organic_soap.jpg",
    name: "Organic Bar Soap",
    price: 170,
  },
  // Additional products as needed
]; 

const ShopPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userPoints, setUserPoints] = useState(500); // Initial points for the user
 
  const handleProductClick = (product) => {
    setSelectedProduct(product); // Store the clicked product in state
  };
 
  const handleBuyClick = () => {
    if (selectedProduct && userPoints >= selectedProduct.price) {
      // Subtract the product's price from user points
      setUserPoints(userPoints - selectedProduct.price);
      console.log(
        `Bought product: ${selectedProduct.name} for ${selectedProduct.price} points`
      );
      setSelectedProduct(null); // Reset selected product after buying
    } else {
      alert("Insufficient points to buy this product");
    }
  };
 
  return (
    <div className="shop">
      <header className="shop-header">
        <h1>
          Your Points: <span id="user-points">{userPoints}</span>
        </h1>
      </header>
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className={`product ${
              selectedProduct?.id === product.id ? "selected" : ""
            }`}
            onClick={() => handleProductClick(product)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <p className="product-name">{product.name}</p>
            <p className="product-price">{product.price} Points</p>
          </div>
        ))}
      </div>
 
      {/* Buy Button */}
      <button
        onClick={handleBuyClick}
        disabled={!selectedProduct} // Disable button if no product is selected
        className={`buy-button ${selectedProduct ? "enabled" : "disabled"}`}
      >
        Buy {selectedProduct ? selectedProduct.name : ""}
      </button>
    </div>
  );
};

export default ShopPage;
