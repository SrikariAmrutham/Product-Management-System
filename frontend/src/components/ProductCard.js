import React from "react";
import './ProductCard.css';
const ProductCard = ({product}) => {
    return (
        <div className="product-card">
            <img 
                src={product.image_url} 
                alt={product.name} 
                className="product-image"
            />
            <h2>{product.name}</h2>
            <p className="description">{product.description}</p>
            <p className="price">Price: ${product.price}</p>
            <p className="category">Category: {product.category}</p>
            <p className="stock">Stock: {product.stock}</p>         
        </div>
    )
}

export default ProductCard;