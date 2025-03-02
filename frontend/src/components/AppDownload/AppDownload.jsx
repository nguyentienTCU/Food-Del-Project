import { assets } from "../../assets/assets";
import "./AppDownload.css";

import React from "react";

const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <p>
        For Better Experience Please Download <br /> Food Del App
      </p>
      <div className="app-download-platforms">
        <img src={assets.play_store} />
        <img src={assets.app_store} />
      </div>
    </div>
  );
};

export default AppDownload;
