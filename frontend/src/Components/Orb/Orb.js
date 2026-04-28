
import React from "react"
import styled, { keyframes } from "styled-components"
import { useWindowSize } from "../../utils/useWindowSize"

function Orb() {

    const {width, height} = useWindowSize()

    console.log(width, height)

    const moveObj  = keyframes`
        0%{
            transform: translate(0, 0);
        }
        50%{
            transform: translate(${width}px, ${height/2}px);
        }
        100%{
            transform: translate(0, 0);
        }
    `

    const ObjStyled = styled.div`
        width: 70vh;
        height: 70vh;
        position: absolute;
        margin-top: -37vh;
        margin-left: -37vh;
        border-radius: 50%;
        background: linear-gradient(180deg, #eb0000 0%, #570505 100%);
        filter: blur(400px);
        animation: ${moveObj} 15s alternate linear infinite;
    `;

    return (
        <ObjStyled></ObjStyled>
    )
}

export default Orb