import React from "react";
import Starter from "../components/Starter/Starter";
import AboutUs from "../components/Aboutus/AboutUs";
import Footer from "../components/Footer/Footer";
const Home = () => {
  return (
    <>
      <div className="starter-comp">
      <Starter/>
      </div>
      <div className="About-Us">
       <AboutUs/>
      </div>
      <div className="footer">
        <Footer/>
      </div>
    </>
  )
}

export default Home;