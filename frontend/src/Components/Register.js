import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import API from "../utils/api";
import Loader from "./Loader/Loader";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setLoading(true);

            await API.post("/auth/register", form);

            setSuccess("Registration Successful");

            setTimeout(() => {

                navigate("/");

            }, 1500);

        } catch (err) {

            setLoading(false);
            setError("User already exists");

        }
    };

    return (

        <RegisterStyled>

            <div className="register-box">

                <h2>Register</h2>

                {loading && <Loader />}

                {error && <p className="error">{error}</p>}

                {success && <p className="success">{success}</p>}

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Register
                    </button>

                    <p>
                        Already have an account?
                        <Link to="/"> Login</Link>
                    </p>

                </form>

            </div>

        </RegisterStyled>

    );
}

const RegisterStyled = styled.div`
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;

    background: linear-gradient(135deg,#667eea,#764ba2);

    .register-box{

    width:380px;
    padding:40px;

    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(12px);

    border-radius:20px;

    box-shadow:0 8px 32px rgba(0,0,0,0.3);

    display:flex;
    flex-direction:column;
    align-items:center;

    }

    h2{
    margin-bottom:25px;
    color:white;
    font-size:28px;
    }

    input{

    width:100%;
    padding:12px;

    margin-bottom:15px;

    border:none;
    border-radius:12px;

    background: rgba(255,255,255,0.8);

    font-size:14px;

    }

    button{

    width:100%;
    padding:12px;

    border:none;
    border-radius:12px;

    background: linear-gradient(135deg,#6c63ff,#5a52d6);

    color:white;
    font-size:16px;

    cursor:pointer;

    transition:0.3s;

    }

    button:hover{

    transform:scale(1.03);

    }

    p{

    margin-top:10px;
    color:white;

    }

    a{
    color:#fff;
    font-weight:bold;
    }

    .error{

    color:#ff4d4d;
    font-size:14px;
    margin-bottom:10px;

    }

    .success{
    color:white;
    font-size:14px;
    margin-bottom:10px;
    background:rgba(108,99,255,0.3);
    padding:12px;
    border-radius:12px;
    }


    `;

export default Register;