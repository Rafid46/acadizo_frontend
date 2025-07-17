/* eslint-disable @typescript-eslint/no-explicit-any */

import type React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "antd";
import { GraduationCap, Menu, X } from "lucide-react";
import logo from "../../assets/icons/acadizo_logo.png";
interface HeaderProps {
  navigationItems: any;
}

const Homepage: React.FC<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigationItems = [
    { label: "Features", href: "/features" },
    { label: "About Us", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full  border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-all duration-300 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
        <NavLink to="/" className="flex items-center space-x-2 group">
          <GraduationCap className="h-8 w-8 text-green-600 transition-transform duration-300 group-hover:rotate-12" />
          <span className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-green-600">
            <img className="w-32" src={logo} alt="" />
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item: any, index: any) => (
            <NavLink
              key={item.label}
              to={item.href}
              className="text-sm font-medium text-gray-600 hover:text-green-600 transition-all duration-300 relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full" />
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button
            type="link"
            className="!text-primary-color hover:text-green-600 transition-all duration-300 hover:scale-105 font-semibold"
          >
            Sign In
          </Button>
          <Button className="custom_button_style custom_hover">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden transition-transform duration-300 hover:scale-110"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div
            className={`transition-transform duration-300 ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden border-t bg-white transition-all duration-300 ${
          isMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="flex flex-col space-y-4 p-4">
          {navigationItems.map((item: any, index: any) => (
            <NavLink
              key={item.label}
              to={item.href}
              className="text-sm font-medium text-gray-600 transition-all duration-300 hover:text-green-600 hover:translate-x-2"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="flex flex-col space-y-2 pt-4 border-t">
            <Button
              type="link"
              className="!text-primary-color hover:text-green-600 transition-all duration-300 hover:scale-105 font-semibold"
            >
              Sign In
            </Button>
            <Button className="custom_button_style custom_hover">
              Get Started
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Homepage;
