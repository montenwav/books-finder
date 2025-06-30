import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <>{children}</>
      <Footer />
    </>
  );
}

export default Layout;
