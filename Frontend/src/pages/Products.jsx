import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Products = ({ addToCart }) => {
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
      id: 6,
      name: 'Product 6',
      price: 400,
      stock: 10,
      photos: ['https://i.pinimg.com/736x/86/f9/78/86f978db34bc563107a3f3c06884d016.jpg']
    },
    {
      id: 7,
      name: 'Product 7',
      price: 350,
      stock: 2,
      photos: ['https://i.pinimg.com/736x/16/01/89/1601895181a25ce94fbcf464af941aa8.jpg']
    }
  ]);

  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: '',
    price: 0,
    stock: 0,
    photos: []
  });

  const [viewingProduct, setViewingProduct] = useState(null);

  const handleEditProduct = (product) => {
    setEditingProduct(product.id);
    setUpdatedProduct({ ...product });
  };

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

  const handleDeleteProduct = (id) => {
    setProductList(productList.filter((product) => product.id !== id));
  };

  const handleViewProduct = (product) => {
    setViewingProduct(product);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {/* View Cart Button */}
      <section className="mb-6 text-center">
        <Link to="/sales">
          <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
            View Cart
          </button>
        </Link>
      </section>

      {/* Display Product List in Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productList.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
            <img
              src={product.photos[0]}
              alt={product.name}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-700">Price: ${product.price}</p>
            <p className="text-gray-700">Stock: {product.stock}</p>

            {/* Add to Cart Button */}
            <button
              disabled={product.stock === 0}
              onClick={() => addToCart({ ...product, quantity: 1 })}
              className={`mt-4 w-full py-2 rounded-lg font-semibold ${product.stock > 0 ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-400 cursor-not-allowed'}`}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>

            {/* View, Edit, and Delete Buttons */}
            <div className="mt-4 flex space-x-3 justify-center">
              {/* View Product Button */}
              <button
                onClick={() => handleViewProduct(product)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                View
              </button>
              
              {/* Edit Product Button */}
              <button
                onClick={() => handleEditProduct(product)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button>
              
              {/* Delete Product Button */}
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>

            {/* Update Product Form appears below each product when editing */}
            {editingProduct === product.id && (
              <form onSubmit={handleUpdateProduct} className="mt-4 space-y-3">
                <input
                  type="text"
                  value={updatedProduct.name}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  value={updatedProduct.price}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  value={updatedProduct.stock}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, stock: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={updatedProduct.photos[0] || ''}
                  onChange={(e) =>
                    setUpdatedProduct({ ...updatedProduct, photos: [e.target.value] })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
                >
                  Update Product
                </button>
              </form>
            )}
          </div>
        ))}
      </div>

      {/* View Product Modal */}
      {viewingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-semibold mb-4">{viewingProduct.name}</h2>
            <img
              src={viewingProduct.photos[0]}
              alt={viewingProduct.name}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-700">Price: ${viewingProduct.price}</p>
            <p className="text-gray-700">Stock: {viewingProduct.stock}</p>
            {/* Close Modal Button */}
            <button
              onClick={() => setViewingProduct(null)}
              className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
