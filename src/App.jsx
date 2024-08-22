import React from "react";

import { Outlet } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from "./ScrollToTop.jsx";
import Header from "./components/Header.jsx";

const App = () => {
  React.useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      offset: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="dark:bg-gray-950 dark:text-white duration-200 overflow-hidden">

      <ScrollToTop />
  <Header/>
      <Outlet />
      {/* <Footer /> */}
      {/* <DownFooter /> */}
    </div>
  );
};

export default App;
