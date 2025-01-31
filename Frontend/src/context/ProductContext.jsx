import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const navigate = useNavigate();
  const { authToken } = useContext(UserContext);

  const [products, setProducts] = useState([]);
  const [onChange, setOnChange] = useState(true);

  // ================================ PRODUCTS ====================================
  useEffect(() => {
    fetch('http://127.0.0.1:5000/products', {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${authToken}`
      }
    })
    .then((response) => response.json())
    .then((response) => {
      setProducts(response);
    });
  }, [onChange]);

  // Add Product
  const addProduct = (name, description, price) => {
    toast.loading("Adding product ... ");
    fetch("http://127.0.0.1:5000/product/add", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({
        name, description, price
      })
    })
    .then((resp) => resp.json())
    .then((response) => {
      if (response.success) {
        toast.dismiss();
        toast.success(response.success);
        setOnChange(!onChange);
      } else if (response.error) {
        toast.dismiss();
        toast.error(response.error);
      } else {
        toast.dismiss();
        toast.error("Failed to add");
      }
    });
  };

  // Update Product
  const updateProduct = () => {
    console.log("Updating product");
  };

  // Delete Product
  const deleteProduct = (id) => {
    toast.loading("Deleting product ... ");
    fetch(`http://127.0.0.1:5000/product/${id}`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${authToken}`
      }
    })
    .then((resp) => resp.json())
    .then((response) => {
      if (response.success) {
        toast.dismiss();
        toast.success(response.success);
        setOnChange(!onChange);
        navigate("/");
      } else if (response.error) {
        toast.dismiss();
        toast.error(response.error);
      } else {
        toast.dismiss();
        toast.error("Failed to delete");
      }
    });
  };

  const data = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  };

  return (
    <ProductContext.Provider value={data}>
      {children}
    </ProductContext.Provider>
  );
};
