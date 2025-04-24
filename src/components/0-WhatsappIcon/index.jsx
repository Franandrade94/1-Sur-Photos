import "./whatsapp.css";
import React from "react";
import WappLogo from "../../assets/images/0-Whatsapp/whatsappLogo.webp";

const Whatsapp = () => {
  
  const handleClickWhatsapp = () => {
    window.open(
      "https://wa.me/50766249400"
    );
  };

  return (
    <div className="Whatsapp-container">
      <img
        className="Whatsapp-Logo"
        onClick={handleClickWhatsapp}
        alt=""
        src={WappLogo}
      />
    </div>
  );
};

export default Whatsapp;