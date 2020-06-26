import React from 'react'
import PropTypes from 'prop-types'

import { SERVER_URL } from '../../../utils/misc'

const Welcome = ({ name, imageCover, duration, startLocation }) => {
   return (
      <section className="section-welcome">
         <div className="welcome__hero">
            <div className="welcome__hero-overlay">&nbsp;</div>
            <img
               src={`${SERVER_URL}/img/tours/${imageCover}`}
               alt={name}
               className="welcome__hero-img"
            />
         </div>
         <div className="heading-box">
            <h1 className="heading-box--heading heading-green">
               <span>{`${name} tour`}</span>
            </h1>
            <div className="heading-box__group">
               <div className="heading-box__detail">
                  <svg className="heading-box__icon">
                     <use xlinkHref="/img/icons.svg#icon-clock" />
                  </svg>
                  <span className="heading-box__text">{`${duration} days`}</span>
               </div>
               <div className="heading-box__detail">
                  <svg className="heading-box__icon">
                     <use xlinkHref="/img/icons.svg#icon-map-pin" />
                  </svg>
                  <span className="heading-box__text">{startLocation}</span>
               </div>
            </div>
         </div>
      </section>
   )
}

Welcome.propTypes = {
   name: PropTypes.string.isRequired,
   imageCover: PropTypes.string.isRequired,
   duration: PropTypes.number.isRequired,
   startLocation: PropTypes.string.isRequired,
}

export default Welcome
