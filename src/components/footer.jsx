import React from 'react'
import '../styles/footer.css'
import Discord from '../pictures/Discord.png'
import Twitter from '../pictures/twitter.png'
import Instagram from '../pictures/ig.png'

export default function Footer() {
  return (
    <footer>
        <div className='footer-wrapper'>
            <div className="left-side">
                <p>Copyright © 2022 ENESCAP · All rights reserved.</p>
            </div>
            <div className="socials">
                <img src={Discord} alt="discord" />
                <img src={Instagram} alt="ig" />
                <img src={Twitter} alt="twitter" />
            </div>
            <div className="right-side">
                <p>Contact Us</p>
                <p>FAQs</p>
                <p>TOS</p>
            </div>
        </div>
    </footer>
  )
}
