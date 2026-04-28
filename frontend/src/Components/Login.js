import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import API from "../utils/api";
import Loader from "./Loader/Loader";

function Login({ setIsAuth }) {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await API.post("/auth/login", form);

            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", res.data.token);

            setLoading(false);

            const role = res.data.user.role;

            console.log("ROLE:", role);

            if (role === "admin") {
                setIsAuth(true)
                navigate("/admin");
            } else {
                setIsAuth(true)
                navigate("/");
            }

        } catch (error) {

            setError("Invalid email or password");
            setLoading(false);

        }

    };

    return (
        <LoginStyled>
            <div className="login-box">

                <h2>Login</h2>

                {loading && <Loader />}

                <form onSubmit={handleSubmit}>

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

                    {error && <p className="error">{error}</p>}

                    <button type="submit">
                        Login
                    </button>

                    <p>
                        Don't have an account?
                        <Link to="/register"> Register</Link>
                    </p>

                </form>

            </div>
        </LoginStyled>
    );
}

const LoginStyled = styled.div`

height:100vh;
display:flex;
justify-content:center;
align-items:center;

background: linear-gradient(135deg,#667eea,#764ba2);

.login-box{

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

}

`;
export default Login;