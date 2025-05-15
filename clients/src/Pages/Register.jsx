import React, { useState } from 'react';
import styled from 'styled-components';
import {toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { registerRoute } from '../Utils/APIRoutes';

const Register = () => {
    ///STATES///
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Checking input fields
    const handleValidation = () => {
        if (username === "") {
            toast.error("Username required");
            return false;
        } else if (password === "") {
            toast.error("Password required")
            return false;
        } else if(email === ""){
            toast.error("Email required");
        }else {
            return true;
        }
    }
    // Submit to backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { data } = await axios.post(registerRoute,
                {
                    username,
                    password,
                    email
                });
            if (data.status === false) {
                toast.error("Failed");
            }
            if (data.status === true) {
                toast.success("Login successfull");
                localStorage.setItem('restaurant-user', JSON.stringify(data.user))
                navigate('/');
            }

        }
    }
    return (
        <Wrapper>
            <FormBox>
                <Heading>Register</Heading>
                <Form onSubmit={handleSubmit}>
                    <Input onChange={(e)=>{setUserName(e.target.value)}} type="text" placeholder="Full Name" required />
                    <Input onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Email" required />
                    <Input onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" required />
                    <Button type="submit">Register</Button>
                </Form>
                <Link href="/login">Already have an account? Login</Link>
            </FormBox>
        </Wrapper>
    );
};

export default Register;

// Styled Components (Same as Login, you can extract common ones later)
const Wrapper = styled.div`
  background-color: #0e0e0e;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Georgia, serif;
`;

const FormBox = styled.div`
  background-color: #1a1a1a;
  padding: 40px;
  border-radius: 10px;
  width: 320px;
  box-shadow: 0 0 20px rgba(212, 169, 81, 0.1);
`;

const Heading = styled.h2`
  color: white;
  text-align: center;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  background: #2e2e2e;
  border: none;
  color: white;
  padding: 12px;
  margin: 10px 0;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #d4a951;
  color: black;
  font-weight: bold;
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const Link = styled.a`
  display: block;
  text-align: center;
  color: #d4a951;
  margin-top: 15px;
  font-size: 14px;
  text-decoration: none;
`;
