import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const MyContext = createContext();
const MainContext = ({ children }) => {
  const [supplements, setSupplements] = useState([]);
  const [originalSupplements, setOriginalSupplements] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [target, setTarget] = useState("");
  const [img, setImg] = useState("");

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/supplements");
      setSupplements(response.data);
      setOriginalSupplements(response.data);
    } catch (e) {
      console.error("Fetch error:", e.response ? e.response.data : e.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const addItem = async () => {
    try {
      const newItem = {
        title,
        price,
        target,
        img,
        inCart: false,
      };
      const res = await axios.post(
        "http://localhost:4000/supplements",
        newItem
      );
      if (res) {
        setSupplements([...supplements, newItem]);
        setTitle("");
        setPrice("");
        setTarget("");
        setImg("");
      } else {
        setSupplements([...supplements]);
      }
    } catch (e) {
      console.error("Add error:", e.response ? e.response.data : e.message);
    }
  };
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/supplements/${id}`);
      if (res) {
        const deletedItem = supplements.filter(
          (supplement) => supplement.id !== id
        );
        setSupplements(deletedItem);
      } else {
        setSupplements([...supplements]);
      }
    } catch (e) {
      console.error("Delete error:", e);
    }
  };
  const updateSupplement = async (id, updatedData) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/supplements/${id}`,
        updatedData
      );
      if (res.status === 200) {
        setSupplements(
          supplements.map((item) =>
            item.id === id ? { ...item, ...updatedData } : item
          )
        );
      } else {
        throw new Error("Failed to update supplement");
      }
    } catch (e) {
      console.error("Update error:", e);
      throw e; // Rethrow error to handle it in the form
    }
  };

  const handleSearch = (word) => {
    if (word.trim() === "") {
      setSupplements(originalSupplements);
      return;
    }
    const searchedItem = originalSupplements.filter((supplement) =>
      supplement.title.toLowerCase().includes(word.toLowerCase())
    );
    setSupplements(searchedItem);
  };
  const values = {
    supplements,
    setSupplements,
    title,
    setTitle,
    price,
    setPrice,
    target,
    setTarget,
    img,
    setImg,
    addItem,
    deleteItem,
    updateSupplement,
    handleImageChange,
    handleSearch,
    fetchData,
  };
  console.log(values);
  return <MyContext.Provider value={values}>{children}</MyContext.Provider>;
};

export default MainContext;
