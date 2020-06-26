import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../misc/button'

import { SERVER_URL } from '../../../utils/misc'

const BookingCard = ({ name, image, slug, bookingDate, price, paid }) => {
   const date = new Date(bookingDate)
   return (
      <div className="booking-card">
         <div className="booking-card__picture">
            <div className="booking-card__picture-overlay">&nbsp;</div>
            <img
               className="booking-card__picture-img"
               src={`${SERVER_URL}/img/tours/${image}`}
               alt={name}
            />
         </div>
         <h3 className="booking-card__heading heading-green">
            <span>{name}</span>
         </h3>
         <div className="booking-card__info">
            <div className="booking-card__info-wrapper">
               <span className="booking-card__info-value">Booked at&nbsp;</span>
               <span className="booking-card__info-text">
                  {date.toLocaleString('en-us', {
                     month: 'long',
                     day: 'numeric',
                     year: 'numeric',
                  })}
               </span>
            </div>
            <div className="booking-card__info-wrapper">
               <span className="booking-card__info-value">Price&nbsp;</span>
               <span className="booking-card__info-text">{`$${price}`}</span>
            </div>
            <div className="booking-card__info-wrapper">
               <span className="booking-card__info-value">Paid&nbsp;</span>
               {paid ? (
                  <svg className="booking-card__icon">
                     <use xlinkHref="/img/icons.svg#icon-check" />
                  </svg>
               ) : (
                  <svg className="booking-card__icon booking-card__icon--false">
                     <use xlinkHref="/img/icons.svg#icon-x" />
                  </svg>
               )}
            </div>
         </div>
         <div className="booking-card__btn">
            <Button
               type="text-link"
               linkTo={`/tour/${slug}`}
               color="regular"
               size="small"
               title="Tour Details"
            />
         </div>
      </div>
   )
}

BookingCard.propTypes = {
   name: PropTypes.string.isRequired,
   image: PropTypes.string.isRequired,
   slug: PropTypes.string.isRequired,
   bookingDate: PropTypes.string.isRequired,
   price: PropTypes.number.isRequired,
   paid: PropTypes.bool.isRequired,
}

export default React.memo(BookingCard)
