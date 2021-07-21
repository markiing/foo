import React from 'react'
import QRCode from 'easyqrcodejs'
import {useRef, useEffect, useState} from 'react'
import v4 from 'uuid/v4'
import styled from 'styled-components'
import { Button } from '@material-ui/core'



const QRCodeContainer = styled.div`
    border: 5px solid #dedede;
    border-radius: 6px;
    width: 170px;
    position: fixed;
    padding: 10px;
    bottom: 0;
    right: 0;
    transition: 0.9s;
    z-index: 999;
    background-color: #fff;
    p {
        text-align: right;
        padding: 0px;
        margin: 0px;
        font-weight: bolder;
        cursor: pointer;
    }

    #qr {
        margin: 18px
    }

    &.closed {
        transform: translateY(83%);
    }

    &.opened {
        transform: translateY(0%);
    }

`


const QRCodeGenerator = (props) => {
    const el = useRef(null)
    const [authCode, setAuthCode] = useState()
    const [modalState, setModalState] = useState(false) //true = closed | false = opened

    useEffect(() => {
        if(authCode){
            const canvas = document.querySelector("canvas")
            if(canvas) canvas.remove()
            new QRCode(el.current, {text: authCode, width: 120, height: 120});
        }else {
            generateQR()
        }
    }, [authCode])

    const generateQR = () => {
        const authCode = v4()
        setAuthCode(authCode)
        props.update(authCode)    
    }

    const toggle = () => {
        setModalState(!modalState)
    }


    return (
        <QRCodeContainer className={modalState ? "closed" : "opened"}>
            <p onClick={toggle}> {modalState? "+" : "-"} </p>
            <div id="qr" ref={el}></div>
            <Button variant="contained" onClick={generateQR}>Generate</Button>
        </QRCodeContainer>
    )
}

export default QRCodeGenerator