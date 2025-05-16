import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaShoppingCart } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { addToCartRoute } from '../Utils/APIRoutes';
import axios from 'axios';
import { toast } from 'react-toastify';



const menuItems = [
  {
    title: "Margherita",
    desc: "Tomato, mozzarella, basil",
    price: 12.00,
    img: "https://img.freepik.com/free-photo/delicious-pizza-with-ingredients_23-2147772093.jpg"
  },
  {
    title: "Caesar Salad",
    desc: "Romaine, parmesan, croutons",
    price: 10.0,
    img: "https://img.freepik.com/free-photo/caesar-salad-with-chicken-bacon-lettuce-parmesan_2829-20475.jpg"
  },
  {
    title: "Spaghetti Bolognese",
    desc: "Pasta with meat sauce",
    price: 15.00,
    img: "https://img.freepik.com/free-photo/spaghetti-bolognese-with-parmesan-cheese-white-plate_2829-11092.jpg"
  },
  {
    title: "Grilled Salmon",
    desc: "Salmon, asparagus, lemon",
    price: 22.00,
    img: "https://img.freepik.com/free-photo/grilled-salmon-steak-asparagus-lemon_2829-19388.jpg"
  },
  {
    title: "Chicken Alfredo",
    desc: "Creamy pasta with grilled chicken",
    price: 18.00,
    img: "https://img.freepik.com/free-photo/pasta-with-chicken-broccoli-creamy-sauce_2829-19526.jpg"
  },
  {
    title: "Veggie Pizza",
    desc: "Bell peppers, olives, onions",
    price: 13.00,
    img: "https://imgs.search.brave.com/unb06Wbidut6OZW_cH3bJhakT1xMG0RLyfI6jKmfHns/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEz/NTY0NTk5NS9waG90/by92ZWdnaWUtcGl6/emEtYW5kLXRvcHBp/bmdzLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1obDdZZjhv/dTlBTVRvSFlfZHRC/OVFjZEhENnhHQU1T/U2o5eEVTQjI1d1g0/PQ"
  },
  {
    title: "Al-faham",
    desc: "deliciously smoky dish infused with warm, aromatic Middle Eastern spices.",
    price: 15.00,
    img: "https://jamilghar.com/wp-content/uploads/2023/07/Al-Faham-Chicken13-728x728.jpg.webp"
  },,
  {
    title: "Kuzhimanthi",
    desc: "Basmati rice,chicken or mutton of large piece and Mandi spices.",
    price: 15.00,
    img: "https://imgs.search.brave.com/wl42fTHUNdUL3I4efw8Oyus33r29k-TC_CEpdqGBySw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy84/Lzg3L0NoaWNrZW5f/TWFuZGlfQXRfQXJh/Ymlhbl9NYW5kaV9I/eWRlcmFiYWQuanBn"
  },
  {
    title: "Biriyani",
    desc: "Meat (chicken, goat, beef, lamb,[29] prawn or fish) is the prime ingredient with rice. ",
    price: 15.00,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg/1920px-%22Hyderabadi_Dum_Biryani%22.jpg"
  },
  {
    title: "Porotta",
    desc: " layered South Asian flatbread made from refined flour, eggs and oil.",
    price: 15.00,
    img: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Parotta.jpg"
  }, {
    title: "Chappati",
    desc: "Wheat, Atta, Oil",
    price: 15.00,
    img: "https://imgs.search.brave.com/GlhIwq0T-4NMEAcqx-jy1VRU7jlaTGIgORLLJpbrhL8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzQ0LzQzLzg2/LzM2MF9GXzQ0NDQz/ODY4MV8yclV2cUFP/UVozQnd4RUhsZnJF/bmVXcGQyNlhGcnQ0/UC5qcGc"
  }, {
    title: "Beef fry",
    desc: "beef, slow-roasted in a mixture of spices, onions, curry leaves, and coconut slivers, fried in coconut oil.",
    price: 15.00,
    img: "https://img.onmanorama.com/content/dam/mm/en/food/recipe/images/2024/1/23/beef-fry.jpg?w=1120&h=583"
  }, {
    title: "Spaghetti Bolognese",
    desc: "Pasta with meat sauce",
    price: 15.00,
    img: "https://img.freepik.com/free-photo/spaghetti-bolognese-with-parmesan-cheese-white-plate_2829-11092.jpg"
  }, {
    title: "Spaghetti Bolognese",
    desc: "Pasta with meat sauce",
    price: 15.00,
    img: "https://img.freepik.com/free-photo/spaghetti-bolognese-with-parmesan-cheese-white-plate_2829-11092.jpg"
  }, {
    title: "Spaghetti Bolognese",
    desc: "Pasta with meat sauce",
    price: 15.00,
    img: "https://img.freepik.com/free-photo/spaghetti-bolognese-with-parmesan-cheese-white-plate_2829-11092.jpg"
  }, {
    title: "Spaghetti Bolognese",
    desc: "Pasta with meat sauce",
    price: 15.00,
    img: "https://img.freepik.com/free-photo/spaghetti-bolognese-with-parmesan-cheese-white-plate_2829-11092.jpg"
  },
   {
    title: "Spaghetti Bolognese",
    desc: "Pasta with meat sauce",
    price: 15.00,
    img: "https://img.freepik.com/free-photo/spaghetti-bolognese-with-parmesan-cheese-white-plate_2829-11092.jpg"
  },
   {
    title: "Spaghetti Bolognese",
    desc: "Pasta with meat sauce",
    price: 15.00,
    img: "https://img.freepik.com/free-photo/spaghetti-bolognese-with-parmesan-cheese-white-plate_2829-11092.jpg"
  },
   {
    title: "Spaghetti Bolognese",
    desc: "Pasta with meat sauce",
    price: 15.00,
    img: "https://img.freepik.com/free-photo/spaghetti-bolognese-with-parmesan-cheese-white-plate_2829-11092.jpg"
  },
];

const MenuPage = () => {
  ////STATES////
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentUser, setCurrentUser] = useState("");

useEffect(()=>{
  getCurrentUser();
},[])

  const handleOrderClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
    setQuantity(1); // Reset quantity on new open
  };

///GETTING USER///
  const getCurrentUser = async () => {
    if (!localStorage.getItem('restaurant-user')) {
      navigate("/login");
    } else {
      const user =await JSON.parse(localStorage.getItem('restaurant-user'));
      setCurrentUser(user) 
          
    }
  }
  //// HANDLING ORDER PLACEMENT TO CART///
  const handleConfirm =async(title,desc,quantity,price,img) => {
      const data  = await axios.post(addToCartRoute,
        {
          title,
          desc,
          quantity,
          price,
          img,
          user : currentUser._id
        });
      if (data === false) {
        toast.error(data.msg);
      }else{
        alert(`Added ${quantity} x ${title} to cart.`);
    setActiveIndex(null); // Close slider
      }
    

    
    
  };

  return (
    <Container>
      <Navbar>
        <NavTitle>Our Menu</NavTitle>
        <NavLinks>
          <NavButton to="/"><IoHome /> Home</NavButton>
          <NavButton to="/cart"><FaShoppingCart /> Cart</NavButton>
        </NavLinks>
      </Navbar>
      <ScrollWrapper>
        <Grid>
          {menuItems.map((item, index) => (
            <Card key={index}>
              <Image src={item.img} alt={item.title} />
              <ItemTitle>{item.title}</ItemTitle>
              <Description>{item.desc}</Description>
              <Price>₹{item.price}</Price>
              <Button onClick={() => handleOrderClick(index)}>
                {activeIndex === index ? "Cancel" : "Order Now"}
              </Button>

              {activeIndex === index && (
                <SliderContainer>
                  <QuantityLabel>Quantity: {quantity}</QuantityLabel>
                  <Slider
                    type="range"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                  <ConfirmButton onClick={() => handleConfirm(item.title,item.desc,quantity,item.price,item.img )}>
                    Confirm
                  </ConfirmButton>
                </SliderContainer>
              )}
            </Card>
          ))}
        </Grid>
      </ScrollWrapper>
    </Container>
  );
};
///STYLED COMPONENTS///
const Container = styled.div`
  font-family: 'Inter', sans-serif;
  background-color: #1c1c1c;
  min-height: 100vh;
  padding: 2em;
  color: #fff;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2a2a2a;
  padding: 1.2rem 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const NavTitle = styled.h1`
  font-size: 2rem;
  margin: 0;
  color: #c89b3c;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
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
  background-color: #c89b3c;
  color: #1c1c1c;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background-color: #b98c30;
  }

  svg {
    font-size: 1.2rem;
  }
`;

const ScrollWrapper = styled.div`
  overflow-x: auto;
max-height: 90vh;
    overflow: auto;
  @media (min-width: 481px) {
    overflow-x: visible;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;

  @media (max-width: 480px) {
    display: flex;
    flex-wrap: nowrap;
    gap: 1rem;
    width: max-content;
  }
`;

const Card = styled.div`
  background: #2a2a2a;
  border-radius: 12px;
  min-width: 260px;
  max-width: 280px;
  flex-shrink: 0;
  height: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  text-align: center;
  overflow: hidden;
  transition: transform 0.3s ease;
  padding-bottom: 1rem;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const ItemTitle = styled.h2`
  margin: 0.8rem 0 0.3rem;
  font-size: 1.25rem;
  color: #fff;
`;

const Description = styled.p`
  margin: 0.25rem 0;
  color: #ccc;
`;

const Price = styled.p`
  font-weight: bold;
  margin: 0.4rem 0;
  color: #c89b3c;
`;

const Button = styled.button`
  background-color: #c89b3c;
  color: #1c1c1c;
  border: none;
  padding: 0.6rem 1.2rem;
  margin-top: 1rem;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  transition: background 0.3s;

  &:hover {
    background-color: #b98c30;
  }
`;

const SliderContainer = styled.div`
  margin-top: 1rem;
  padding: 0 1rem;
`;

const Slider = styled.input`
  width: 100%;
  margin-top: 0.5rem;
`;

const QuantityLabel = styled.p`
  margin: 0.3rem 0;
  font-weight: bold;
`;

const ConfirmButton = styled(Button)`
  margin-top: 0.5rem;
`;

export default MenuPage;
