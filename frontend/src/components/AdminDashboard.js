import React, {useEffect, useState} from "react";
import axios from 'axios';
import ProductCard from './ProductCard';
import './AdminDashboard.css';
import './ProductCard.css';
const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        const fetchProducts = async() => {
            const {data} = await axios.get('api/products');
            setProducts(data);
        };
        fetchProducts();
    }, []);

    const handleDelete = async(id) => {
        try{
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add token in the Authorization header
                    },
            
            });
            setProducts(products.filter((product) => product.id !== id));
        } catch(error){
            console.error('Error deleting product', error);
        }
    };
    
    const handleUpdate = (productId) => {
        window.location.href = `/edit-product/${productId}`;
    };

    return (
        <div className="admin-dashboard-container">
            <h1>Admin Dashboard</h1>
            <button onClick={() => window.location.href = '/add-product'}>Add product</button>
            <div className="product-card-container">
            {products.map((product) => (
                <div key={product.id} >
                    <ProductCard product={product} />
                    <button className="update-btn" onClick={() => handleUpdate(product.id)}>Update</button>
                    <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
                </div>
            ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
