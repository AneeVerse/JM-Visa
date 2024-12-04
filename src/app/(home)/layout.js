import Footer from "@/components/layout/Footer";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      {children}
      <div className="bg-gradient-to-br from-blue-900 via-blue-900 to-black">
        <Footer />
      </div>
    </div>
  );
};

export default layout;
