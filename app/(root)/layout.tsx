import NavBar from "@/components/NavBar";
import React from "react";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="min-h-screen bg-cream">
      <NavBar />
      {children}
    </div>
  );
};

export default layout;
