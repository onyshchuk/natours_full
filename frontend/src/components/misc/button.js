/* eslint-disable react/button-has-type */
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Button = ({
   type,
   btnType,
   title,
   linkTo,
   color,
   size,
   altClass,
   children,
   handleClick,
   disabled,
}) => {
   let classes = ''

   if (type === 'text' || type === 'text-link')
      classes = `btn-text btn-text--${color}${altClass ? ` ${altClass}` : ''}`
   else
      classes = `btn btn--${color}${size ? ` btn--${size}` : ''}${
         altClass ? ` ${altClass}` : ''
      }`

   if (!children) children = <span>{title}</span>
   return type === 'link' || type === 'text-link' ? (
      <Link to={linkTo} className={classes}>
         {children}
      </Link>
   ) : (
      <button
         type={btnType}
         onClick={handleClick}
         className={classes}
         disabled={disabled}
      >
         {children}
      </button>
   )
}

Button.propTypes = {
   type: PropTypes.string,
   btnType: PropTypes.string,
   title: PropTypes.string,
   linkTo: PropTypes.string,
   color: PropTypes.string.isRequired,
   size: PropTypes.string,
   altClass: PropTypes.string,
   children: PropTypes.any,
   handleClick: PropTypes.func,
   disabled: PropTypes.bool,
}

Button.defaultProps = {
   type: '',
   btnType: 'button',
   linkTo: '',
   title: '',
   size: '',
   altClass: '',
   children: undefined,
   handleClick: undefined,
   disabled: false,
}

export default React.memo(Button)
