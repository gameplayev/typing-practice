import React from "react";
import { useState } from "react";
import "./styles/main.scss";
import { Link } from "react-router-dom";


const Main = () =>{
    return (
    <div className = "main">
    
    <div className="nav">
        <div className="nav-left">
            <span>typing-rax</span>
        </div>
        <div className="nav-right">
            <span>글귀 선택</span>
            <span><Link to="/setting">설정</Link></span>
        </div>
    </div>
        
        
    </div>
    );
}

export default Main;
