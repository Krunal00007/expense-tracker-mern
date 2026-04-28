import React from "react";
import styled from "styled-components";

function Loader() {
    return (
        <LoaderStyled>
            <div className="spinner"></div>
        </LoaderStyled>
    );
}

const LoaderStyled = styled.div`

display:flex;
justify-content:center;
margin:10px;

.spinner{

width:40px;
height:40px;

border:4px solid rgba(255,255,255,0.3);
border-top:4px solid #6c63ff;

border-radius:50%;

animation:spin 0.8s linear infinite;

}

@keyframes spin{

0%{transform:rotate(0deg)}
100%{transform:rotate(360deg)}

}

`;

export default Loader;