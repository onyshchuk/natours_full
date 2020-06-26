import React from 'react'
import PropTypes from 'prop-types'

import Button from './button'
import { SERVER_URL } from '../../utils/misc'

const TourCard = ({ tour }) => {
   const tourStartDate = new Date(tour.startDates[0])

   return (
      <div className="card">
         <div className="card__header">
            <div className="card__picture">
               <div className="card__picture-overlay">&nbsp;</div>
               <img
                  src={`${SERVER_URL}/img/tours/${tour.imageCover}`}
                  alt={tour.name}
                  className="card__picture-img"
               />
            </div>
            <h3 className="card__heading heading-green">
               <span>{tour.name}</span>
            </h3>
         </div>
         <div className="card__details">
            <h4 className="card__sub-heading">
               {`${tour.difficulty} ${tour.duration}-day tour`}
            </h4>
            <p className="card__text">{tour.summary}</p>
            <div className="card__data">
               <svg className="card__icon">
                  <use xlinkHref="/img/icons.svg#icon-map-pin" />
               </svg>
               <span>{tour.startLocation.description}</span>
            </div>
            <div className="card__data">
               <svg className="card__icon">
                  <use xlinkHref="/img/icons.svg#icon-calendar" />
               </svg>
               <span>
                  {tourStartDate.toLocaleString('en-us', {
                     month: 'long',
                     year: 'numeric',
                  })}
               </span>
            </div>
            <div className="card__data">
               <svg className="card__icon">
                  <use xlinkHref="/img/icons.svg#icon-flag" />
               </svg>
               <span>{`${tour.locations.length} stops`}</span>
            </div>
            <div className="card__data">
               <svg className="card__icon">
                  <use xlinkHref="/img/icons.svg#icon-user" />
               </svg>
               <span>{`${tour.maxGroupSize} people`}</span>
            </div>
         </div>
         <div className="card__footer">
            <p>
               <span className="card__footer-value">{`$${tour.price} `}</span>
               <span className="card__footer-text">per person</span>
            </p>
            <p className="card__ratings">
               <span className="card__footer-value">{tour.ratingsAverage}</span>
               <span className="card__footer-text">
                  {` rating (${tour.ratingsQuantity})`}
               </span>
            </p>
            <Button
               type="link"
               linkTo={`/tour/${tour.slug}`}
               color="green"
               size="small"
               title="Details"
            />
         </div>
      </div>
   )
}

TourCard.propTypes = { tour: PropTypes.object.isRequired }

export default React.memo(TourCard)
