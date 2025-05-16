import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();

  // 🔽 Refs for scrolling
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  // Scroll functions
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false); // close mobile menu if open
  };
 
  useEffect(() => {
    getCurrentUser(); // get current user
  }, []);

  const getCurrentUser = async () => {
    if (!localStorage.getItem("restaurant-user")) {
      navigate("/login");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("restaurant-user")));
    }
  };

  return (
    <Container>
      <GlobalStyle />
      <Navbar>
        <Logo>
          <img src="/logo.png" alt="" />
        </Logo>
        <NavLinks>
          <NavLink>Home</NavLink>
          <NavLink onClick={() => navigate("/menu")}>Menu</NavLink>
          <NavLink onClick={() => scrollToSection(aboutRef)}>About</NavLink>
          <NavLink onClick={() => scrollToSection(contactRef)}>Contact</NavLink>
        </NavLinks>
        <MenuIcon onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </MenuIcon>
      </Navbar>

      {menuOpen && (
        <MobileMenu>
          <MobileNavLink>Home</MobileNavLink>
          <MobileNavLink onClick={() => navigate("/menu")}>Menu</MobileNavLink>
          <MobileNavLink onClick={() => scrollToSection(aboutRef)}>About</MobileNavLink>
          <MobileNavLink onClick={() => scrollToSection(contactRef)}>Contact</MobileNavLink>
        </MobileMenu>
      )}

      <HeroSection>
        <Overlay />
        <HeroContent
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Welcome, {currentUser.username}</h1>
          <h1>FINEST FOOD FOR YOU</h1>
          <button onClick={() => navigate("/menu")}>View Menu</button>
        </HeroContent>
      </HeroSection>

      <Section>
        <h2>ORDER ONLINE</h2>
        <p>Browse our menu and place your order from the comfort of your home.</p>
        <button onClick={() => navigate("/menu")}>Order Now</button>
      </Section>

      <Section dark ref={aboutRef}>
        <h2>OUR MENU</h2>
        <p>Explore our diverse selection of dishes, all made with the freshest ingredients.</p>
        <button onClick={() => navigate("/menu")}>View Menu</button>
      </Section>

      <Section ref={contactRef}>
        <h2>ABOUT US</h2>
        <p>
          Welcome to Nishma's Restaurant – Where Every Meal Feels Like Home.
          <br />
          At Nishma's, we believe that great food brings people together. Founded
          with love and passion for authentic, homemade flavors, our restaurant is
          a celebration of warmth, tradition, and taste. From carefully selected
          ingredients to time-tested family recipes, every dish we serve is crafted
          to delight your senses.
          <br />
          Whether you're here for a quick bite or a hearty feast, we invite you to
          relax, enjoy, and become part of the Nishma's family.
        </p>
      </Section>

      <Section dark >
        <h2>GET IN TOUCH</h2>
        <p>124 Meadowbrook Avenue 
 Sheffield, South Yorkshire 
 S11 8QT 
 United Kingdom</p> 
        <p>(129) 456-7890</p>
        <p>Email: nishmasrestaurant@gmail.com</p>

        <iframe
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d152260.04986245866!2d-1.6642604539749415!3d53.395807922508816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48790aa9fae8be15%3A0x3e2827f5af06b078!2sSheffield%2C%20UK!5e0!3m2!1sen!2sin!4v1747411508945!5m2!1sen!2sin" 
          width="100%"
          height="400"
          style={{ border: 0, marginTop: "1rem" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Section>

      <Footer>&copy; 2025 Restaurant. All rights reserved.
        Designed by NDMedia
      </Footer>
    </Container>
  );
};

/// STYLED COMPONENTS ///
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Inter;
  }
  body {
    background-color: #0e0e0e;
    color: #fff;
  }
`;

const Container = styled.div``;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  background-color: #000;
  position: fixed;
  width: 100%;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.9);
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  color: #fff;
  img{
    width: 80px;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.li`
  margin-left: 2rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #e4b95b;
  }
`;

const MenuIcon = styled.div`
  display: none;
  color: #fff;

  @media (max-width: 768px) {
    display: block;
    font-size: 2rem;
    cursor: pointer;
  }
`;

const MobileMenu = styled.ul`
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  background: #111;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 2rem 1.5rem;
  gap: 1.5rem;
  z-index: 1000;

  @media (min-width: 769px) {
    display: none;
  }
`;


const MobileNavLink = styled.li`
  font-size: 1.2rem;
  color: #fff;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #e4b95b;
  }
`;

const HeroSection = styled.section`
  height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1600891964599-f61ba0e24092");
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
`;

const HeroContent = styled(motion.div)`
  position: relative;
  text-align: center;
  z-index: 1;

  h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  button {
    margin-top: 1rem;
    padding: 0.8rem 2rem;
    font-size: 1rem;
    background: #e4b95b;
    color: #000;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    transition: background 0.3s;

    &:hover {
      background: #d4a84b;
    }
  }
`;

const Section = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background: ${({ dark }) => (dark ? "#111" : "#1a1a1a")};

  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  p {
    max-width: 600px;
    margin: 0 auto 2rem;
    line-height: 1.6;
    color: #ccc;
  }

  button {
    padding: 0.7rem 1.8rem;
    font-size: 1rem;
    background: #e4b95b;
    color: #000;
    border: none;
    cursor: pointer;
    border-radius: 6px;

    &:hover {
      background: #d4a84b;
    }
  }
`;

const Footer = styled.footer`
  padding: 2rem;
  background: #000;
  text-align: center;
  color: #aaa;
`;


export default HomePage;
