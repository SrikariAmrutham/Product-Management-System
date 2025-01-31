
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AddProduct.css';

const UpdateProduct = () => {
    const { id } = useParams();
    console.log(id);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const token = localStorage.getItem('token');
            console.log('data', id);
            const { data } = await axios.get(`http://localhost:5000/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request header
                },
            });
            console.log('data', data);
            setProduct(data);
        };
        fetchProduct();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/products/${id}`, product, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request header
                },
            });
            window.location.href = '/admin-dashboard';
        } catch (error) {
            console.error('Error updating product', error);
        }
    };

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    if (!product) {
        return <div>Loading...</div>; // Display a loading message while the product data is being fetched
    }

    return (
        <div className="add-product-container">
            <h1>Update Product</h1>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={handleChange}
                />
                <textarea
                    name="description"
                    placeholder="Product Description"
                    value={product.description}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={product.category}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="stock"
                    placeholder="Stock Quantity"
                    value={product.stock}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="image_url"
                    placeholder="Image URL (optional)"
                    value={product.image_url}
                    onChange={handleChange}
                />
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default UpdateProduct;
