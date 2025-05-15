import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { IoMenu } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getItemsRoute, updateItemsRoute } from '../Utils/APIRoutes';
import { toast } from 'react-toastify';

const CartPage = () => {

  /// States
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isOrderFormVisible, setIsOrderFormVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const orderFormRef = useRef(null);


useEffect(()=>{
getCartItems();
  },[cartItems])

  /// Getting cart items
const getCartItems = async()=>{
   const user =await JSON.parse(localStorage.getItem('restaurant-user'));
   if(!user){
    navigate("/login")
   }else{
  setCurrentUser(user) 
     const items = await axios.post(getItemsRoute,
        {
          userId : user._id
        })
        if(!items){
          toast.error("Error getting cart items")
        } 
        setCartItems(items.data);
        setCartItems(items.data);
   }
  
}
/// Updating quantity on button click
  const updateQuantity =async (title, delta) => {
    const updated = await axios.post(updateItemsRoute,{
      title: title,
      user: currentUser._id,
      quantity: delta

    })
    setCartItems(prev =>
      prev.map(item =>
        item.title === title
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);


  // Hide form when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        orderFormRef.current &&
        !orderFormRef.current.contains(event.target)
      ) {
        setIsOrderFormVisible(false);
      }
    };

    if (isOrderFormVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOrderFormVisible]);

 return (
  <Container>
    <Navbar>
      <NavTitle>Our Menu</NavTitle>
      <NavLinks>
        <NavButton to="/"><IoHome /> Home</NavButton>
        <NavButton to="/menu"><IoMenu /> Menu</NavButton>
      </NavLinks>
    </Navbar>

    {isOrderFormVisible && (
      <OrderForm ref={orderFormRef}>
        <h3>Enter Your Details</h3>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Location" />
        <input type="text" placeholder="Contact Info" />
        <button onClick={() => setIsOrderFormVisible(false)}>Submit</button>
      </OrderForm>
    )}

    <CartWrapper>
      {cartItems.map(item => (
        <CartItem key={item.id}>
          <ItemImage src={item.img} alt={item.name} />
          <Info>
            <Name>{item.name}</Name>
            <Price>
              ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
            </Price>
          </Info>
          <QuantityControl>
            <button onClick={() => updateQuantity(item.title, -1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.title, 1)}>+</button>
          </QuantityControl>
        </CartItem>
      ))}
    </CartWrapper>

    <Footer>
      <h2>Total: ₹{total.toFixed(2)}</h2>
      <PlaceOrderButton onClick={() => setIsOrderFormVisible(true)}>
        Place Order
      </PlaceOrderButton>
    </Footer>
  </Container>
);

};

///Styled components

const Container = styled.div`
  font-family: 'Inter', sans-serif;
  background-color: #0e0e0e;
  min-height: 100vh;
  padding: 2em;
  color: #f8f8f8;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1a1a1a;
  padding: 1.2rem 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  border: 2px solid #d4a850;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const NavTitle = styled.h1`
  font-size: 2rem;
  margin: 0;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  background-color: #d4a850;
  color: #0e0e0e;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background-color: #b8903c;
  }

  svg {
    font-size: 1.2rem;
  }
`;

const CartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CartItem = styled.div`
  background: #1c1c1c;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  flex-wrap: wrap;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
`;

const Info = styled.div`
  flex: 1;
  min-width: 180px;
`;

const Name = styled.h2`
  margin: 0;
  font-size: 1.2rem;
`;

const Price = styled.p`
  margin: 0.2rem 0;
  font-weight: bold;
  color: #f8f8f8;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    padding: 0.4rem 0.8rem;
    background: #d4a850;
    color: #0e0e0e;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background: #b8903c;
    }
  }

  span {
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 2rem;

  h2 {
    color: #f8f8f8;
  }
`;

const PlaceOrderButton = styled.button`
  padding: 0.8rem 2rem;
  background-color: #d4a850;
  color: #0e0e0e;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #b8903c;
  }
`;

const OrderForm = styled.div`
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #1c1c1c;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
  z-index: 999;
  width: 90%;
  max-width: 400px;

  h3 {
    margin-bottom: 1rem;
    color: #f8f8f8;
  }

  input {
    display: block;
    width: 93%;
    padding: 0.7rem;
    margin-bottom: 1rem;
    border-radius: 8px;
    border: 1px solid #d4a850;
    background: #0e0e0e;
    color: #f8f8f8;
    font-size: 1rem;
  }

  button {
    width: 100%;
    padding: 0.8rem;
    background-color: #d4a850;
    color: #0e0e0e;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background-color: #b8903c;
    }
  }
`;

export default CartPage;