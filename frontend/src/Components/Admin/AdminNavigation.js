import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import avr from "../../img/user.png";
import { adminMenuItems } from "../../utils/adminMenuItems";
import { signout } from "../../utils/Icons";
import API from "../../utils/api";  // ✅ API import karo

function AdminNavigation({ active, setActive }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        window.location.reload();
    };

    // ✅ Yeh function add karo
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

                {/* ✅ label se img wrap karo */}
                <label htmlFor="admin-avatar-upload">
                    <img
                        src={user?.avatar || avr}
                        alt="avatar"
                    />
                </label>

                {/* ✅ Hidden file input */}
                <input
                    type="file"
                    id="admin-avatar-upload"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    hidden
                />

                <div className="text">
                    <h2>{user?.name}</h2>
                    <p>Admin Panel</p>
                </div>
            </div>

            <ul className="menu-items">
                {adminMenuItems.map((item) => {
                    return (
                        <li
                            key={item.id}
                            onClick={() => {
                                setActive(item.id);
                                navigate(item.link);
                            }}
                            className={active === item.id ? "active" : ""}
                        >
                            {item.icon}
                            <span>{item.title}</span>
                        </li>
                    );
                })}
            </ul>

            <div className="bottom-nav" onClick={handleLogout}>
                <li>
                    {signout} Sign Out
                </li>
            </div>
        </NavStyled>
    );
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

    .user-con {
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;

        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            cursor: pointer;        /* ✅ pointer cursor */
            transition: 0.3s;       /* ✅ smooth hover */
        }

        img:hover {
            transform: scale(1.05); /* ✅ hover effect */
        }

        h2 { color: rgba(34, 34, 96, 1); }
        p  { color: rgba(34, 34, 96, .6); }
    }

    .menu-items {
        flex: 1;
        display: flex;
        flex-direction: column;
        li {
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
        }
    }

    .active {
        color: rgba(34, 34, 96, 1) !important;
        &::before {
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

    .bottom-nav {
        cursor: pointer;
        li {
            display: flex;
            align-items: center;
            gap: 1rem;
            font-weight: 500;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            transition: all .4s ease-in-out;
        }
        li:hover {
            color: rgba(34, 34, 96, 1);
        }
    }
`;

export default AdminNavigation;