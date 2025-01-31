const Product = require('../models/Product');
const { Op } = require('sequelize'); // sequelize operator

exports.getProducts = async (req, res) => {
    try {
      const search = req.query.search || '';
      const products = await Product.findAll({
        where: { //condition
          name: {
            [Op.like]: `%${search}%`, // allows Case-insensitive search
          },
        },
      });
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  };


exports.getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findOne({ where: { id } });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.createProduct = async(req, res) => {
    const {name, description, category, price, stock, image_url} = req.body;
    const newProduct = await Product.create({name, description, category, price, stock, image_url});
    res.json(newProduct);
};

exports.updateProduct = async(req, res) => {
    const {id} = req.params;
    console.log('updating', id);
    const {name, description, category, price, stock, image_url} = req.body;
    await Product.update({name, description, category, price, stock, image_url}, {where : {id}});
    res.json({message: 'Product updated'});
};

exports.deleteProduct = async(req, res) => {
    const {id} = req.params;
    await Product.destroy({where : {id}});
    res.json({message: 'Product Deleted'});
};