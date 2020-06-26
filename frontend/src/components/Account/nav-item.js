import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const NavItem = ({ link, text, icon, active }) => {
   return (
      <li className={`${active && 'side-nav--active'}`}>
         <Link to={link}>
            <svg>
               <use xlinkHref={`/img/icons.svg#icon-${icon}`} />
            </svg>
            {text}
         </Link>
      </li>
   )
}

NavItem.propTypes = {
   link: PropTypes.string.isRequired,
   text: PropTypes.string.isRequired,
   icon: PropTypes.string.isRequired,
   active: PropTypes.bool,
}

NavItem.defaultProps = {
   active: false,
}

export default NavItem
