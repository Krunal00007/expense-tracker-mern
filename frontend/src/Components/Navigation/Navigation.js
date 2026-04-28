import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import avr from "../../img/user.png";
import { menuItems } from "../../utils/menuItems";
import { signout } from "../../utils/Icons";
import API from "../../utils/api";


function Navigation({ active, setActive }) {

    const user = JSON.parse(localStorage.getItem("user"));

    //logout
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        window.location.reload();
    };

    const handleAvatarChange = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = async () => {

            const avatarBase64 = reader.result;

            try {

                const res = await API.put("/auth/update-avatar", {
                    avatar: avatarBase64
                });

                localStorage.setItem("user", JSON.stringify(res.data));

                window.location.reload();

            } catch (err) {

                console.log(err);

            }

        };

        reader.readAsDataURL(file);

    };

    return (
        <NavStyled>
            <div className="user-con">

                <label htmlFor="avatar-upload">

                    <img
                        src={user?.avatar || avr}
                        alt="avatar"
                    />

                </label>

                <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={(e) => handleAvatarChange(e)}
                    hidden
                />

                <div className="text">
                    <h2>{user?.name}</h2>
                    <p>Expense Tracker</p>
                </div>

            </div>

            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active' : ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            <div className="bottom-nav" onClick={handleLogout} >
                <li>
                    {signout} Sign Out
                </li>
            </div>
        </NavStyled>
    )
}

const NavStyled = styled.nav`

    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;

    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2{
            color: rgba(34, 34, 96, 1);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }
    }
    
    .user-con img{
        width:80px;
        height:80px;
        border-radius:50%;
        object-fit:cover;
        cursor:pointer;
        transition:0.3s;
    }

    .user-con img:hover{
        transform:scale(1.05);
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .active{
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #0d0d42;
            border-radius: 0 10px 10px 0;
        }
    }

    .bottom-nav{
    cursor: pointer;

    li{
        display: flex;
        align-items: center;
        gap: 1rem;
        font-weight: 500;
        cursor: pointer;
        color: rgba(34, 34, 96, .6);
        padding-left: 1rem;
        transition: all .4s ease-in-out;
    }

    li:hover{
        color: rgba(34,34,96,1);
    }
}
`;

export default Navigation