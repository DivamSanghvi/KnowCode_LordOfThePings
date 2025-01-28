import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { Menu, X, ChevronDown, Flame } from 'lucide-react';
import { useSelector } from "react-redux";

const navLinks = {
  "Teacher Vacancy": "/teacher-vacancy",
  "Art & Craft": "/art-craft",
  IMO: "/imo",
  "JEE NEET Classes": "/jee-neet-classes",
  "Logical Reasoning": "/logical-reasoning",
  "JEE Main preparation": "/jee-main-preparation",
  "English++": "/english-advanced",
  "GK Videos": "/gk-videos",
  IEO: "/ieo",
  "IGCSE and IB classes": "/igcse-ib-classes",
  Fitness: "/fitness",
  Teachers: "/teachers",
  Testimonials: "/testimonials",
  FAQ: "/faq",
  Blogs: "/blogs",
  Resources: "/resources",
  Team: "/team",
  GK: "/gk",
};

const Navbar = () => {
  const navigate =useNavigate()
  const [activeSection, setActiveSection] = useState("Home");
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const moreButtonRef = useRef(null);
  const user = useSelector((state) => state.user.user);

  const navItems = {
    PlantDoc: "/test",
    KhetDost : "/lifecycle",
    "Krushi-Store": "/product",
    CattleDoc:  "/cattle",
    KhetMadat : "/gmaps",
    More: "/", // You can customize this route or leave it empty for a dropdown toggle
  };

  const colors = {
    primary: "#FF6B35", // Vibrant Orange
    secondary: "#2B2D42", // Dark Blue-Gray
    background: "#FFFFFF", // White
    text: "#2B2D42", // Dark Blue-Gray
    lightText: "#8D99AE", // Light Blue-Gray
  };

  useEffect(() => {
    if (moreButtonRef.current) {
      const rect = moreButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isMoreOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMoreOpen(false);
  };

  return (
    <div className="w-full flex justify-center pt-6 px-4">
      <nav
        style={{
          background: colors.background,
          boxShadow: `0 4px 6px -1px ${colors.primary}20, 0 2px 4px -1px ${colors.primary}10`,
        }}
        className="w-full max-w-6xl rounded-full px-6 py-3 flex items-center justify-between relative"
      >
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <div
            style={{ background: colors.primary }}
            className="w-10 h-10 rounded-full flex items-center justify-center"
          >
            <Flame size={24} color={colors.background} />
          </div>
          <Link to="/">
            <span
              style={{ color: colors.secondary }}
              className="text-xl font-semibold"
            >
              Krushi Kranti
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Items */}
        <div className="hidden mdNav:flex items-center space-x-1">
          {Object.entries(navItems).map(([item, link]) => (
            <motion.button
              key={item}
              ref={item === "More" ? moreButtonRef : null}
              onClick={() =>
                item === "More"
                  ? setIsMoreOpen(!isMoreOpen)
                  : setActiveSection(item)
              }
              style={{
                color:
                  activeSection === item || (item === "More" && isMoreOpen)
                    ? colors.primary
                    : colors.text,
              }}
              className={`relative px-4 py-2 rounded-full transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item === "More" ? (
                <span className="relative z-10 flex items-center">
                  {item}
                  <ChevronDown
                    size={16}
                    className={`ml-1 transform transition-transform ${
                      isMoreOpen ? "rotate-180" : ""
                    }`}
                  />
                </span>
              ) : (
                <Link to={link} className="relative z-10">
                  {item}
                </Link>
              )}
              {(activeSection === item || (item === "More" && isMoreOpen)) && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute left-0 bottom-0 w-full h-1 rounded-full"
                  style={{ background: colors.primary }}
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="mdNav:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
          >
            {isMobileMenuOpen ? (
              <X size={24} color={colors.text} />
            ) : (
              <Menu size={24} color={colors.text} />
            )}
          </button>
        </div>

        {/* CTA Button (hidden on mobile) */}
        {user ? (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    style={{ background: colors.secondary, color: colors.background }}
    className="hidden mdNav:block px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-md"
  >
    Logout
  </motion.button>
) : (
  <div className="flex px-2 justify-between space-x-4">

  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    style={{ background: colors.secondary, color: colors.background }}
    className="hidden mdNav:block px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-md"
    onClick={() => navigate("/login")}
  >
    Login
  </motion.button>
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    style={{ background: colors.secondary, color: colors.background }}
    className="hidden mdNav:block px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-md"
    onClick={() => navigate("/aadhar")}
  >
    Signup
  </motion.button>
</div>

)}

      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="mdNav:hidden absolute top-20 left-0 right-0 bg-white shadow-lg rounded-b-2xl z-50"
            style={{ background: colors.background }}
          >
            {Object.entries(navItems).map(([item, link]) => (
              <Link
                key={item}
                to={link}
                className="block px-4 py-2 text-lg"
                style={{ color: colors.text }}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setActiveSection(item);
                }}
              >
                {item}
              </Link>
            ))}
            <button
              className="w-full text-left px-4 py-2 text-lg"
              style={{ color: colors.text }}
              onClick={() => {
                setIsMoreOpen(!isMoreOpen);
                setIsMobileMenuOpen(false);
              }}
            >
              More
            </button>
            <button
              className="w-full text-center py-3 mt-2"
              style={{ background: colors.secondary, color: colors.background }}
            >
              Get In Touch
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dropdown Menu */}
      <Dropdown
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        navLinks={navLinks}
        colors={colors}
        position={dropdownPosition}
      />
    </div>
  );
};

export default Navbar;
