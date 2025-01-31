import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductsPage = ({ addToCart }) => {
  // Predefined list of products with unique IDs
  const [productList, setProductList] = useState([
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      stock: 5,
      photos: ['https://i.pinimg.com/736x/0c/d3/d6/0cd3d6975f25335fef522a8c8d6100ac.jpg']
    },
    {
      id: 2,
      name: 'Product 2',
      price: 150,
      stock: 3,
      photos: ['https://i.pinimg.com/736x/7c/44/29/7c44296623995ea0e97294ac21de2e2b.jpg']
    },
    {
      id: 3,
      name: 'Product 3',
      price: 200,
      stock: 8,
      photos: ['https://i.pinimg.com/736x/67/fe/ed/67feed0cc654fd1c63f694216bc18103.jpg']
    },
    {
      id: 4,
      name: 'Product 4',
      price: 250,
      stock: 4,
      photos: ['https://i.pinimg.com/736x/72/03/0b/72030b063a09ba5464fd5f4fd9111f5e.jpg']
    },
    {
      id: 5,
      name: 'Product 5',
      price: 300,
      stock: 10,
      photos: ['https://i.pinimg.com/736x/c0/ac/d7/c0acd7ba7e6ab752c4d68cbcb5468f9e.jpg']
    },
    {
      id: 6, // Changed to make unique ID
      name: 'Product 6',
      price: 400,
      stock: 10,
      photos: ['https://i.pinimg.com/736x/86/f9/78/86f978db34bc563107a3f3c06884d016.jpg']
    },
    {
      id: 7, // Changed to make unique ID
      name: 'Product 7',
      price: 350,
      stock: 2,
      photos: ['https://i.pinimg.com/736x/16/01/89/1601895181a25ce94fbcf464af941aa8.jpg']
    }
  ]);

  // State to manage editing and viewing a product
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: '',
    price: 0,
    stock: 0,
    photos: []
  });

  const [viewingProduct, setViewingProduct] = useState(null);

  // Handle editing a product
  const handleEditProduct = (product) => {
    setEditingProduct(product.id);
    setUpdatedProduct({ ...product });
  };

  // Handle updating the product
  const handleUpdateProduct = (e) => {
    e.preventDefault();
    setProductList(
      productList.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setEditingProduct(null);
    setUpdatedProduct({ name: '', price: 0, stock: 0, photos: [] });
  };

  // Handle deleting a product
  const handleDeleteProduct = (id) => {
    setProductList(productList.filter((product) => product.id !== id));
  };

  // Handle viewing a product
  const handleViewProduct = (product) => {
    setViewingProduct(product);
  };

  return (
    <div>
      <h1>Products</h1>

      {/* View Cart Button */}
      <section style={{ marginBottom: '20px', textAlign: 'center' }}>
        <Link to="/sales">
          <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            View Cart
          </button>
        </Link>
      </section>

      {/* Display Product List in Grid View */}
      <div className="product-list">
        {productList.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.photos[0]}
              alt={product.name}
              className="product-image"
            />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>

            {/* Add to Cart Button */}
            <button
              disabled={product.stock === 0}
              onClick={() => addToCart({ ...product, quantity: 1 })}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>

            {/* View, Edit, and Delete Buttons */}
            <div className="product-actions">
              <button onClick={() => handleViewProduct(product)}>View</button>
              <button onClick={() => handleEditProduct(product)}>Edit</button>
              <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            </div>

            {/* Update Product Form appears below each product when editing */}
            {editingProduct === product.id && (
              <form onSubmit={handleUpdateProduct} style={{ marginTop: '10px' }}>
                <input
                  type="text"
                  value={updatedProduct.name}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                  required
                />
                <input
                  type="number"
                  value={updatedProduct.price}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                  required
                />
                <input
                  type="number"
                  value={updatedProduct.stock}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, stock: e.target.value })}
                  required
                />
                <input
                  type="text"
                  value={updatedProduct.photos[0] || ''}
                  onChange={(e) =>
                    setUpdatedProduct({ ...updatedProduct, photos: [e.target.value] })
                  }
                />
                <button type="submit">Update Product</button>
              </form>
            )}
          </div>
        ))}
      </div>

      {/* View Product Modal */}
      {viewingProduct && (
        <div className="view-product-modal">
          <h2>{viewingProduct.name}</h2>
          <img
            src={viewingProduct.photos[0]}
            alt={viewingProduct.name}
            style={{ width: '100%', maxWidth: '300px', margin: '10px 0' }}
          />
          <p>Price: ${viewingProduct.price}</p>
          <p>Stock: {viewingProduct.stock}</p>
          <button onClick={() => setViewingProduct(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
