import React, { useEffect, useState } from "react";
import styled from "styled-components";
import API from "../../utils/api";

function UsersManagement() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        API.get("/admin/users")
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    };

    const [showModal, setShowModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)

    const openDeleteModal = (user) => {

        setSelectedUser(user)
        setShowModal(true)

    }

    const confirmDelete = () => {

        API.delete(`/admin/user/${selectedUser._id}`)
            .then(() => {

                fetchUsers()
                setShowModal(false)

            })

    }

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <UsersStyled>
            <div className="top-bar">

                <h1>Users Management</h1>

                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <div className="stats">

                <div className="card">
                    <h3>Total Users</h3>
                    <p>{users.length}</p>
                </div>

                <div className="card">
                    <h3>Admins</h3>
                    <p>{users.filter(u => u.role === "admin").length}</p>
                </div>

                <div className="card">
                    <h3>Normal Users</h3>
                    <p>{users.filter(u => u.role !== "admin").length}</p>
                </div>

            </div>

            <div className="table-card">

                <table>

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {filteredUsers.map(u => (

                            <tr key={u._id}>

                                <td>{u.name}</td>
                                <td>{u.email}</td>

                                <td>
                                    <span className={`role ${u.role}`}>
                                        {u.role}
                                    </span>
                                </td>

                                <td>

                                    <button className="delete-btn" onClick={() => openDeleteModal(u)}>
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
            {
                showModal && (

                    <div className="modal-overlay">

                        <div className="modal">

                            <h3>Delete User</h3>

                            <p>
                                Are you sure you want to delete <b>{selectedUser?.name}</b> ?
                            </p>

                            <div className="modal-buttons">

                                <button
                                    className="cancel"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="delete"
                                    onClick={confirmDelete}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }
        </UsersStyled>

    );

}

const UsersStyled = styled.div`

padding:2rem;

.top-bar{

display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:20px;

}

h1{
color:#2b2d42;
}

input{

padding:8px 14px;
border-radius:10px;
border:1px solid #ccc;
outline:none;

}

.stats{

display:flex;
gap:20px;
margin-bottom:20px;

}

.card{

background:rgba(255,255,255,0.85);

border-radius:15px;

padding:15px 25px;

box-shadow:0 8px 20px rgba(0,0,0,0.08);

}

.card h3{
font-size:14px;
color:#555;
}

.card p{
font-size:22px;
font-weight:bold;
color:#4c6ef5;
}

.table-card{

background:rgba(255,255,255,0.85);

border-radius:18px;

padding:20px;

box-shadow:0 10px 25px rgba(0,0,0,0.08);

}

table{

width:100%;
border-collapse:collapse;

}

thead{

background:#f3f3f3;

}

th{

padding:12px;
text-align:left;

}

td{

padding:12px;
border-bottom:1px solid #eee;

}

tr:hover{

background:#fafafa;

}

.role{

padding:5px 10px;
border-radius:8px;
font-size:12px;
font-weight:600;

}

.role.admin{

background:#4CAF50;
color:white;

}

.role.user{

background:#6c63ff;
color:white;

}

.delete-btn{

background:#ff4d4d;
border:none;
color:white;
padding:6px 12px;
border-radius:8px;
cursor:pointer;
transition:0.2s;

}

.delete-btn:hover{

background:#ff1a1a;

}

.modal-overlay{

position:fixed;

top:0;
left:0;

width:100%;
height:100%;

background:rgba(0,0,0,0.4);

display:flex;
justify-content:center;
align-items:center;

z-index:999;

}

.modal{

background:white;

padding:25px;

border-radius:15px;

width:320px;

text-align:center;

box-shadow:0 10px 25px rgba(0,0,0,0.2);

}

.modal-buttons{

margin-top:20px;

display:flex;

justify-content:space-between;

}

.modal-buttons button{

border:none;

padding:8px 15px;

border-radius:8px;

cursor:pointer;

}

.cancel{

background:#ccc;

}

.delete{

background:#ff4d4d;

color:white;

}

`;

export default UsersManagement;