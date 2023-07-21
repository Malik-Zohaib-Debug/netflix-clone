import React, {useState, useEffect} from 'react'
import netflix_logo from './img/netflix-logo.png';
import profile_logo from './img/profile-logo.png';
import './css/Nav.css';

export default function Navbar() {
    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100){
                handleShow(true);
            } else {
                handleShow(false);
            }
        });
        return () => {
            window.removeEventListener("scroll");
        }
    }, [])

  return (
    <div className={` navbar ${show && "nav__black"} `}>
        <img 
            className='navbar__logo'
            src={netflix_logo}
            alt='Netflix Logo'
        />
        <img
            className='navbar__profile-logo'
            src={profile_logo}
            alt='Profile Logo'
        />
    </div>
  )
}
