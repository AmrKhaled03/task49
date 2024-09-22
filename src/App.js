import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Dashboard from "./pages/admin/Dashboard";
import FormScreen from "./pages/admin/FormScreen";
import HomeScreen from "./pages/user/HomeScreen";
import CartScreen from "./pages/user/CartScreen";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import UpdateForm from "./pages/admin/UpdateForm";
import Supplements from "./pages/user/Supplements";
import SupplementDetails from "./pages/user/SupplementDetails";
import Error from "./Error";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/admin" element={<Dashboard />} />
        <Route exact path="/admin/form" element={<FormScreen />} />
        <Route exact path="/admin/update/:id" element={<UpdateForm />} />
        <Route exact path="/user" element={<HomeScreen />} />
        <Route exact path="/user/cart" element={<CartScreen />} />
        <Route exact path="/user/supplements" element={<Supplements />} />
        <Route
          exact
          path="/user/supplements/:id"
          element={<SupplementDetails />}
        />
        <Route exact path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default App;
