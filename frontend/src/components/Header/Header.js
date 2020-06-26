import React, { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { scroller } from 'react-scroll'

import { SERVER_URL } from '../../utils/misc'
import Button from '../misc/button'
import { logoutUser } from '../../store/actions/userActions'

const Header = ({ scrollY }) => {
   const { pathname } = useLocation()
   const [showHeader, setShowHeader] = useState(false)
   const dispatch = useDispatch()

   const user = useSelector(state => state.user.user, shallowEqual)

   useEffect(() => {
      if (scrollY > 120) setShowHeader(true)
      else setShowHeader(false)
   }, [scrollY])

   const handleClick = useCallback(() => {
      dispatch(logoutUser())
   }, [dispatch, logoutUser])

   const headerStyles = {
      position: 'fixed',
      top: `${scrollY > 210 ? 0 : scrollY - 210}px`,
      left: 0,
      right: 0,
   }

   const scrollUp = () =>
      scroller.scrollTo('welcome', {
         duration: 1500,
         delay: 100,
         smooth: true,
         offset: -50,
      })

   return (
      <header
         style={(showHeader && headerStyles) || { '': '' }}
         className={`header ${
            scrollY > 120 || pathname !== '/' ? ' header--dark' : ''
         }${scrollY > 121 ? ' header--shadow' : ''}`}
      >
         {(pathname !== '/' || showHeader) && (
            <div className="navigation-home">
               {pathname === '/' ? (
                  <Button
                     type="text"
                     title="Home"
                     color="regular"
                     handleClick={scrollUp}
                  />
               ) : (
                  <Button
                     type="text-link"
                     title="Home"
                     linkTo="/"
                     color="regular"
                  />
               )}
               <Button
                  type="text-link"
                  title="all tours"
                  linkTo="/all-tours"
                  color="regular"
               />
            </div>
         )}
         <div className="header__logo-box">
            <img
               className="header__logo"
               src="/img/logo-white.png"
               alt="logo"
            />
         </div>
         {user ? (
            <nav className="navigation-user">
               <Button
                  type="text"
                  altClass="navigation-user__el"
                  color="regular"
                  title="Log out"
                  handleClick={handleClick}
               />
               <Button
                  type="text-link"
                  color="regular"
                  linkTo="/me"
                  className="navigation-user__el"
               >
                  <img
                     className="navigation-user__img"
                     src={`${SERVER_URL}/img/users/${user.photo}`}
                     alt={user.name}
                  />
                  <span>{user.name.split(' ')[0]}</span>
               </Button>
            </nav>
         ) : (
            <nav className="navigation-user">
               <Button
                  type="text-link"
                  color="regular"
                  altClass="navigation-user__el"
                  linkTo="/login"
                  title="Log in"
               />
               <Button
                  type="link"
                  linkTo="/signup"
                  size="medium"
                  color="white"
                  title="Sign up"
                  altClass="btn--bordered"
               />
            </nav>
         )}
      </header>
   )
}

Header.propTypes = {
   scrollY: PropTypes.number.isRequired,
}

export default React.memo(Header)
