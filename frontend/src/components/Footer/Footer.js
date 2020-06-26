import React from 'react'
import { useLocation } from 'react-router-dom'

const Footer = () => {
   const { pathname } = useLocation()
   return (
      <footer className={`footer${pathname === '/' ? ' footer__dark' : ''}`}>
         <div className="footer__logo">
            <img src="/img/logo-green-small-2x.png" alt="Natours logo" />
         </div>
         <div className="footer__copyright">
            &copy; by Alexander Onyshchuk 2020
         </div>
      </footer>
   )
}

export default React.memo(Footer)
