import React, { useState, useEffect } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false); 
    const [showPlants, setShowPlants] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const plantsArray = [
        { category: "Air Purifying Plants", plants: [{ name: "Snake Plant", image: "https://...", cost: "$15", description: "..." }, { name: "Spider Plant", image: "https://...", cost: "$12", description: "..." }, { name: "Peace Lily", image: "https://...", cost: "$18", description: "..." }] },
        // ... your plants stay same
    ];

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        setAddedToCart((prev) => ({ ...prev, [product.name]: true }));
    };

    const calculateTotalQuantity = () => {
        let total = 0;
        cart.forEach(item => { total += item.quantity; });
        return total;
    };

    const handleCartClick = (e) => { e.preventDefault(); setShowCart(true); };
    const handlePlantsClick = (e) => { e.preventDefault(); setShowPlants(true); setShowCart(false); };
    const handleContinueShopping = (e) => { e.preventDefault(); setShowCart(false); };

    return (
        <div>
            <div className="navbar">
                <div className="tag"><div className="luxury"><img src="..." alt="" /><a href="/" onClick={(e)=>onHomeClick(e)}><div><h3>Paradise Nursery</h3><i>Where Green Meets Serenity</i></div></a></div></div>
                <div style={{display:'flex', gap:'30px'}}><div><a href="#" onClick={(e)=>handlePlantsClick(e)} style={{color:'white', fontSize:'30px'}}>Plants</a></div>
                <div><a href="#" onClick={(e) => handleCartClick(e)}><div className="cart"[STRIPPED 31 bytes]"cart_quantity_count">{calculateTotalQuantity()}</span></div></a></div></div>
            </div>
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((cat, idx) => (
                        <div key={idx}><h1><div>{cat.category}</div></h1><div className="product-list">
                            {cat.plants.map((plant, i) => (
                                <div className="product-card" key={i}>
                                    <div className="product-title">{plant.name}</div>
                                    <img className="product-image" src={plant.image} alt={plant.name} />
                                    <div className="product-price">{plant.cost}</div>
                                    <div>{plant.description}</div>
                                    <button className={`product-button ${addedToCart[plant.name] ? 'added-to-cart' : ''}`} 
                                    onClick={()=>handleAddToCart(plant)} disabled={!!addedToCart[plant.name]}>
                                        {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                                    </button>
                                </div>
                            ))}
                        </div></div>
                    ))}
                </div>
            ) : (<CartItem onContinueShopping={handleContinueShopping} />)}
        </div>
    );
}
export default ProductList;