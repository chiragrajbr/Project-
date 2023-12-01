import React from "react";
import "./Home.css";
import pic1 from "../Images/pic1.jpg";

const Home = () => {
  return (
    <React.Fragment>
        <div>
        <div className="text-animation-container">
          <div className="animated-text">
            You don't worry about your Apartment Tenant detail, We will manage!
          </div>
          <div className="image-container">
            <img src={pic1} alt="pic" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
