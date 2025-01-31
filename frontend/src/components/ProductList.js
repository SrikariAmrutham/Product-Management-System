import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductList.css'
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchProduct, setsearchProduct] = useState('');

  useEffect(() => {
    const fetchProducts = async() => {
      const { data } = await axios.get(`http://localhost:5000/api/products?search=${searchProduct}`);
      setProducts(data);
    };
    fetchProducts();
  }, [searchProduct]);

  return (
    <div className="product-list-container">
      <input
        type="text"
        value={searchProduct}
        onChange={(e) => setsearchProduct(e.target.value)}
        placeholder="Search Products"
        className='search-input'
      />
      <div className='product-card-container'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
