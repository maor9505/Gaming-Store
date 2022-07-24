import React from 'react'
import "../../styles/Heromain.css";



 export const HeroMain = () => {
    return (
        <div className="relative h-screen w-full flex items-center justify-center bg-cover bg-center text-center hero-section">
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-900 opacity-75"></div>
            <div className="hero-text">
                <h1 className="hero-header-p1">GAMING<p className="hero-header-p2">ZONE</p></h1>
                <p>BUILD YOUR GAMING EMPIRE!</p>
            </div>
        </div>

    );
}

