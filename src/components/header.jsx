import React from 'react'
import Logo from '../pictures/Logo.png'
import '../styles/header.css'
const scrollToTop = () =>{
  window.scrollTo({
    top: 0, 
    behavior: 'smooth'
    /* you can also use 'auto' behaviour
       in place of 'smooth' */
  });
};

export default function Header() {
  return (
    <header>
      <img onClick={scrollToTop} className='logo' src={Logo} style={{width: "50px"}} alt="" />
    </header>
  )
}
