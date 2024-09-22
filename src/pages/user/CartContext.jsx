import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { MyContext } from "../../components/MainContext";
export const SecondContext = createContext();
const CartContext = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { supplements, setSupplements } = useContext(MyContext);
  const getCart = async () => {
    try {
      const response = await axios.get("http://localhost:4000/cart");
      setCart(response.data);
    } catch (e) {
      console.error("Fetch error:", e.response ? e.response.data : e.message);
    }
  };
  useEffect(() => {
    getCart();
  }, []);
  const addToCart = async (id) => {
    if (cart.some((element) => element.id === id)) {
      alert("Item is already in the cart");
    } else {
      const supplement = supplements.find((supplement) => supplement.id === id);
      if (supplement) {
        try {
          const updatedItem = { ...supplement, inCart: true };

          setCart([...cart, updatedItem]);
          await axios.post("http://localhost:4000/cart", updatedItem);

          setSupplements(
            supplement.map((i) => (i.id === id ? updatedItem : i))
          );
        } catch (e) {
          console.error(
            "Error adding to cart:",
            e.response ? e.response.data : e.message
          );
        }
      }
    }
  };
  const deleteCart = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/cart/${id}`);
      setCart(cart.filter((item) => item.id !== id));
      setSupplements(
        supplements.map((supplement) =>
          supplement.id === id ? { ...supplement, inCart: false } : supplement
        )
      );
    } catch (e) {
      console.error(
        "Error deleting from cart:",
        e.response ? e.response.data : e.message
      );
    }
  };
  const values = {
    cart,
    getCart,
    addToCart,
    deleteCart,
  };
  return (
    <SecondContext.Provider value={values}>{children}</SecondContext.Provider>
  );
};

export default CartContext;
