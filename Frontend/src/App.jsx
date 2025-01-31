import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { UserProvider } from "./context/UserContext"; // Corrected import for UserProvider
import Header from "./components/Header";
import RoomList from "./components/RoomList";
import Footer from "./components/Footer"; // Import Footer
import RoomCard from "./components/RoomCard";
import Login from "./pages/LandingPage";
import Home from "./pages/HomePage";
import About from "./pages/AboutPage";
import Products from "./pages/ProductsPage";
import Shop from "./pages/SalesPage";
import "./App.css";
import "./index.css"

// Sample data for rooms
const rooms = [
  {
    id: 1,
    name: "Living Room",
    description: "A cozy living room with modern furniture.",
    image:
      "https://images.unsplash.com/photo-1524549207884-e7d1130ae2f3?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Bedroom",
    description: "A spacious bedroom with a minimalist design.",
    image:
      "https://images.unsplash.com/photo-1642976975710-1d8890dbf5ab?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Kitchen",
    description: "A modern kitchen with sleek finishes.",
    image: "https://i.pinimg.com/736x/c2/46/e6/c246e64d2b14c69f1a0599159396d880.jpg",
  },
];

// Sample pages
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import SalesPage from "./pages/SalesPage";
import ProfilePage from "./pages/ProfilePage"; // Import ProfilePage

const App = () => {
  const [cart, setCart] = useState([]);

  // Add product to cart
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Update product quantity in cart
  const updateQuantity = (id, quantity) => {
    if (quantity > 0) {
      setCart(
        cart.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  // Sample products with multiple images
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 10,
      stock: 5,
      photos: [
        "https://i.pinimg.com/736x/0c/d3/d6/0cd3d6975f25335fef522a8c8d6100ac.jpg",
        "https://i.pinimg.com/736x/7c/44/29/7c44296623995ea0e97294ac21de2e2b.jpg",
        "https://i.pinimg.com/736x/67/fe/ed/67feed0cc654fd1c63f694216bc18103.jpg",
        "https://i.pinimg.com/736x/72/03/0b/72030b063a09ba5464fd5f4fd9111f5e.jpg",
        "https://i.pinimg.com/736x/c0/ac/d7/c0acd7ba7e6ab752c4d68cbcb5468f9e.jpg",
      ],
    },
    {
      id: 2,
      name: "Product 2",
      price: 15,
      stock: 3,
      photos: [
        "https://i.pinimg.com/736x/16/01/89/1601895181a25ce94fbcf464af941aa8.jpg",
        "https://i.pinimg.com/736x/3a/86/df/3a86df2786edcecc6eafbd24cb04bb6f.jpg",
        "https://i.pinimg.com/736x/22/38/a4/2238a42614cf707306ab5d67ad552c4f.jpg",
        "https://i.pinimg.com/736x/97/5d/a8/975da87588eb36ec8ebb332b1fc5ea35.jpg",
      ],
    },
    {
      id: 3,
      name: "Product 3",
      price: 20,
      stock: 10,
      photos: [
        "https://i.pinimg.com/736x/1a/01/91/1a0191f24e14d7fb1b587313bd0d42a9.jpg",
        "https://i.pinimg.com/736x/86/f9/78/86f978db34bc563107a3f3c06884d016.jpg",
        "https://i.pinimg.com/736x/95/7c/55/957c553536138133237022e4f27a1cc6.jpg",
        "https://i.pinimg.com/736x/db/61/81/db6181ba673a7866db3410b24fddbb92.jpg",
        "https://i.pinimg.com/736x/c9/97/da/c997daa4fa8da1cbb008fc549e14b462.jpg",
        "https://i.pinimg.com/736x/96/71/eb/9671eb943c23c0f9514f73d27b9ce9cd.jpg",
        "https://i.pinimg.com/736x/e9/de/54/e9de5457a41a609a89e79e2de9cb4831.jpg",
        "https://i.pinimg.com/736x/82/44/5b/82445bc9a0ffa3cf1a31bcd0e10b72f7.jpg",
        "https://i.pinimg.com/736x/8f/a4/43/8fa443b785871b6e330bc41fe56cae70.jpg",
        "https://i.pinimg.com/736x/67/0c/9b/670c9b0f4f2afe5bfdb64f094b440bfe.jpg",
      ],
    },
  ];

  return (
<BrowserRouter>
  <UserProvider>
    <Header />

    {/* Navigation Links */}
    <nav>
      <Link to="/">Landing Page</Link> |
      <Link to="/home">Home</Link> |
      <Link to="/about">About</Link> |
      <Link to="/products">Products</Link> |
      <Link to="/sales">Shop</Link> |
      <Link to="/profile">Profile</Link>
    </nav>

    <Routes>
      {/* Define Routes for Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LandingPage />} />
      <Route
        path="/products"
        element={<ProductsPage products={products} addToCart={addToCart} />}
      />
      <Route
        path="/sales"
        element={
          <SalesPage
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        }
      />
      <Route path="/profile" element={<ProfilePage />} /> {/* New ProfilePage Route */}

      {/* Add a route for login if needed */}
      <Route path="/login" element={<LandingPage />} /> {/* Add a login page route if necessary */}
      
      {/* RoomList is only visible on Home Page */}
      <Route path="/home" element={<RoomList rooms={rooms} />} />
    </Routes>

    <Footer /> {/* Add Footer here */}
  </UserProvider>
</BrowserRouter>

  );
};

export default App;
