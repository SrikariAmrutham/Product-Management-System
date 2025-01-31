//defining product model
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT}, 
    category: {type: DataTypes.STRING},
    price: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
    stock: {type: DataTypes.INTEGER, allowNull: false},
    image_url: {type: DataTypes.STRING},
});

module.exports = Product;