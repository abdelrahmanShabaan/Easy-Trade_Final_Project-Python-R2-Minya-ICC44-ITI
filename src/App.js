import "./App.css";
import React from "react";
// react router v6
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  CategoryProduct,
  ProductSingle,
  Cart,
  Search,
  UserLoginRegister,
  UserComponent,
  Wishlist,
} from "./pages/index";
import ProductPage from "./pages/Products/ProductPage";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import store from "./store/store";
import { Provider } from "react-redux";
import ShowBuyerProducts from "./pages/BuyersPage/Show Buyer Product/ShowBuyerProducts";
import HomePanelBuyers from "./pages/BuyersPage/Home Panel/HomePanelBuyers";
import AddBuyerProduct from "./pages/BuyersPage/Add Buyer Products/AddBuyerProduct";
import EditBuyerProducts from "./pages/BuyersPage/Edit Buyer Products/EditBuyerProducts";

function App() {
  

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
         
         <Header />
          <Sidebar />  


          <Routes>        
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductSingle />} />
            <Route path="/category/:category" element={<CategoryProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/user" element={<UserLoginRegister />} />
            <Route path="/userx" element={<UserComponent />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/search/:searchTerm" element={<Search />} />
            <Route path="/ProductPage" element={<ProductPage />} />

            <Route path="/HomePanelBuyers" element={<HomePanelBuyers />} />
            <Route path="/ShowBuyerProducts" element={<ShowBuyerProducts />} />
            <Route path="/AddBuyerProduct" element={<AddBuyerProduct />} />
            <Route path="/EditBuyerProducts/:id" element={<EditBuyerProducts />} />

          </Routes>
          <Footer />

  
        </BrowserRouter>
        
      </Provider>
      
   
    </div>
  );
}

export default App;
