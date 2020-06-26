import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { shallowEqual, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import NavItem from '../components/Account/nav-item'

const INITIAL_STATE = {
   settings: false,
   bookings: false,
   reviews: false,
   billing: false,
   manageTours: false,
}

const AccountLayout = ({ children }) => {
   const [activeButton, setActiveButton] = useState(INITIAL_STATE)
   const user = useSelector(state => state.user.user, shallowEqual)
   const role = user ? user.role : null
   const { pathname } = useLocation()

   useEffect(() => {
      switch (pathname) {
         case '/me':
            setActiveButton({ ...INITIAL_STATE, settings: true })
            break
         case '/me/bookings':
            setActiveButton({ ...INITIAL_STATE, bookings: true })
            break
         case '/me/reviews':
            setActiveButton({ ...INITIAL_STATE, reviews: true })
            break
         case '/me/billing':
            setActiveButton({ ...INITIAL_STATE, billing: true })
            break
         case '/manage/tours':
            setActiveButton({ ...INITIAL_STATE, manageTours: true })
            break
         default:
            break
      }
   }, [pathname])

   return (
      <div className="account">
         <div className="user-view">
            <nav className="user-view__menu">
               <ul className="side-nav">
                  <NavItem
                     link="/me"
                     text="Settings"
                     icon="settings"
                     active={activeButton.settings}
                  />
                  <NavItem
                     link="/me/bookings"
                     text="My bookings"
                     icon="briefcase"
                     active={activeButton.bookings}
                  />
                  <NavItem
                     link="/me/reviews"
                     text="My reviews"
                     icon="star"
                     active={activeButton.reviews}
                  />
                  <NavItem
                     link="#"
                     text="Billing"
                     icon="credit-card"
                     active={activeButton.billing}
                  />
                  {role && role === 'admin' && (
                     <div className="admin-nav">
                        <h5 className="admin-nav__heading">Admin</h5>
                        <ul className="side-nav">
                           <NavItem
                              link="/admin/tours"
                              text="Manage tours"
                              icon="map"
                              active={activeButton.manageTours}
                           />
                           <NavItem link="#" text="Manage users" icon="users" />
                           <NavItem
                              link="#"
                              text="Manage reviews"
                              icon="star"
                           />
                           <NavItem
                              link="#"
                              text="Manage bookings"
                              icon="briefcase"
                           />
                        </ul>
                     </div>
                  )}
               </ul>
            </nav>
            {children}
         </div>
      </div>
   )
}

AccountLayout.propTypes = {
   children: PropTypes.array.isRequired,
}

export default AccountLayout
