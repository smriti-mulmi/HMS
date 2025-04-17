import React from "react"
import "./App.css"
import Navbar from "./common/Navbar/Navbar"
import About from "./components/About/About"
import Gallery from "./components/gallery/Gallery"
import Home from "./components/pages/Home"
import Features from "./components/Features/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SinglePages from "./SinglePage/SinglePages"
import Blog from "./components/Blog/Blog"
import BlogSingle from "./components/Blog/blog-single-page/BlogSingle"
import Rooms from "./components/Rooms/Rooms"
import Navigation from "./components/Navigation/navigation"
import Contact from "./components/Contact/Contact"
import Payment from "./components/Payment/payment"
import Login from "./components/login/Login"
import Register from "./components/login/Register"
import Footer from "./common/footer/Footer"
import Bookingscreen from "./screens/Bookingscreen";
import Landingscreen from "./screens/Landingscreen";

function App () {
  return (
    <>
      <Router>
        <Navbar />
        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/features" element={<Features />} />
          <Route path="/singlepage/:id" element={<SinglePages />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blogsingle/:id" element={<BlogSingle />} />
          <Route path="/room" element={<Rooms />} />
          <Route path="/navigation" element={<Navigation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book/:roomid/:fromdate/:todate" component={Bookingscreen}/>
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App;
