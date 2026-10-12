import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList() {
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/40/spider-plant-3530104_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Removes mold spores and purifies the air.", cost: "$18" },
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1499001556392-3fbb64a1ccf4?w=400", description: "Calming scent, used in aromatherapy.", cost: "$20" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400", description: "Sweet fragrance, promotes relaxation.", cost: "$18" },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?w=400", description: "Invigorating scent, often used in cooking.", cost: "$14" },
      ]
    }
  ];

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: true,
    }));
  };

  return (
    <div>
      <div className="product-grid">
        {plantsArray.map((category, index) => (
          <div key={index}>
            <h1><div>{category.category}</div></h1>
            <div className="product-list">
              {category.plants.map((plant, plantIndex) => (
                <div className="product-card" key={plantIndex}>
                  <img className="product-image" src={plant.image} alt={plant.name} />
                  <div className="product-title">{plant.name}</div>
                  <div className="product-description">{plant.description}</div>
                  <div className="product-cost">${plant.cost}</div>
                  <button className="product-button" onClick={() => handleAddToCart(plant)}>
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;