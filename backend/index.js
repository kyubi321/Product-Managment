const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require ('./models/FormData');
const Product = require('./models/server');
const ProductDetails = require('./models/server')

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/practice_mern', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.post('/register', (req, res)=>{
    // To post / insert data into database

    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Already registered")
        }
        else{
            FormDataModel.create(req.body)
            .then(log_reg_form => res.json(log_reg_form))
            .catch(err => res.json(err))
        }
    })
    
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await FormDataModel.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: 'No records found!' });
      }

      if (user.password === password) {
          return res.status(200).json({
              message: 'Login successful',
              user: {
                  id: user._id,
                  name: user.name,
                  email: user.email,
                  role: user.role || 'user',
              },
          });
      } else {
          return res.status(401).json({ message: 'Wrong password' });
      }
  } catch (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ message: 'Login error', error: err.message });
  }
});


app.post('/api/products', async (req, res) => {
    const { name, category, stock, price, image } = req.body;
  
    // Validate the data
    if (!name || !category || !stock || !price || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const newProduct = new Product({ name, category, stock, price, image });
      await newProduct.save();
      res.status(201).json(newProduct); // Return the newly created product
    } catch (err) {
      res.status(500).json({ message: 'Error adding product' });
    }
  });

  app.get('/api/products', async (req, res) => {
    try {
      const products = await Product.find(); // Fetch all products from the database
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching products' });
    }
  });

  app.get('/api/products/search', async (req, res) => {
    const { query } = req.query;
    try {
      const results = await Product.find({ name: { $regex: query, $options: 'i' } }).limit(10);
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error searching products');
    }
  });
  



  // Fetch a single product by ID
  app.get('/api/products/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching product', error: err.message });
    }
  });
  
  app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, category, stock, price, image } = req.body;
  
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, category, stock, price, image },
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json({ message: 'Error updating product', error: err.message });
    }
  });



  
  // Delete Product by ID
  app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
  
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting product' });
    }
  });

  app.get('/api/productdetails/:name', async (req, res) => {
    const { name } = req.params;
  
    try {
      const productDetails = await ProductDetails.findOne({ name });
      if (!productDetails) {
        return res.status(404).json({ message: 'Product details not found' });
      }
      res.status(200).json(productDetails);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching product details', error: err.message });
    }
  });

  app.get('/api/users', async (req, res) => {
    try {
      const users = await FormDataModel.find({}, { password: 0 }); // Exclude the password field
      res.status(200).json(users);
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
  });

  // Delete a user by ID
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await FormDataModel.findByIdAndDelete(id); // Delete user by ID

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Failed to delete user', error: err.message });
  }
});
  
  
  


app.listen(3001, () => {
    console.log("Server listining on http://127.0.0.1:3001");

});