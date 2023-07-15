import React from "react";
import inventoryManagementImage from "./inventory-management.png";
import image1 from './images.png';
import image2 from './Custom-inventory-management-app-with-kizeo-forms-01.jpg';

function Home() {
  return (
    <div style={containerStyles}>
      <div style={textContainerStyles}>
        <h1 style={textStyles}>Welcome to our website</h1>
        <p style={textStyles}>Discover the world of inventory management with us!</p>
      </div>

      <div style={imageContainerStyles}>
        <img src={inventoryManagementImage} alt="Inventory Management" style={imageStyles} />
        <img src={image1} alt="Image 1" style={imageStyles} />
        <img src={image2} alt="Image 2" style={imageStyles} />
      </div>
    </div>
  );
}
const containerStyles = {
  display: "flex",
  flexDirection: "column" as "column",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
};

const textContainerStyles = {
  align: "center",
  marginBottom: "2rem",
  animation: "slide-in-left 1s ease",
};

const textStyles = {
  margin: 0,
};

const imageContainerStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const imageStyles = {
  width: "300px",
  height: "300px",
  margin: "0 10px",
  border: "2px solid white",
};

export default Home;
