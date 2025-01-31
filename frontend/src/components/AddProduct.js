import React, {useState} from "react";
import axios from 'axios';
import './AddProduct.css';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image_url, setImageUrl] = useState('');

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/products', {
                name, description, category, price, stock, image_url,
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Add token in the Authorization header
                },
            }
        
        );
            window.location.href = '/admin-dashboard';
        } catch(error) {
            console.error('Error adding product', error);
        }
    };

    return (
        <div  className="add-product-container">
            <h1>Add Product</h1>
            <form onSubmit={handleAddProduct}>
                <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
                <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                />
                <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                />
                <input
                type="number"
                placeholder="Stock Quantity"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                />
                <input
                type="text"
                placeholder="Image URL (optional)"
                value={image_url}
                onChange={(e) => setImageUrl(e.target.value)}
                />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;