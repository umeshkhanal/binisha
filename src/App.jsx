import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollTop";
import SEOHandler from "./components/utils/SEOHandler";
import CollectionSection from "./components/CollectionSection";
import FloatingActions from "./components/utils/FloatingActions";
import CollectionPage from "./components/CollectionPage";
// ================= LAZY IMPORTS =================
const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const LandingPage = () => (
  <>
    <NavBar />
    <Home />
    <About />
    <CollectionSection />
    <Contact />
    <Footer />
  </>
);

export default function App() {
  return (
    <>
      <ScrollToTop />
      <SEOHandler />
      <FloatingActions />
      <Routes>
        {/* MAIN LANDING */}
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/collection"
          element={
            <>
              <NavBar />
              <CollectionPage />
              <Footer />
            </>
          }
        />
       
      </Routes>
    </>
  );
}
