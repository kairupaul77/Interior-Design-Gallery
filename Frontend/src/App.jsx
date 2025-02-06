import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RoomList from "./components/RoomList";
import RoomCard from "./components/RoomCard";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from './pages/LogIn';
import SignUp from "./pages/SignUp";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Profile from "./pages/Profile"; 
import NoPage from './pages/NoPage';
import { UserProvider } from './context/UserContext';
import { ProductProvider } from "./context/ProductContext";

function App() {

  
  return (
  
    <BrowserRouter>
       <UserProvider>  
         <ProductProvider> 
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="landing" element={<Landing />} />
              <Route path="login" element={<Login/>} />
              <Route path="signup" element={<SignUp />} />
              <Route path="about" element={<About />} />
              <Route path="roomcard" element={< RoomCard />} />
              <Route path="roomlist" element={<RoomList/>} />
              <Route path="profile" element={<Profile />} />
              <Route path="products" element={<Products />} />
              <Route path="/sales" element={<Sales />} />

              <Route path="" element={<NoPage />} />
            </Route>
          </Routes>
         </ProductProvider>
      </UserProvider>  
    </BrowserRouter>
  );
}

// React 18 - Correct Way to Render App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;