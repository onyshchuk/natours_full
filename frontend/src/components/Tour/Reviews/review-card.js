import React from 'react'
import PropTypes from 'prop-types'

import { SERVER_URL } from '../../../utils/misc'

const ReviewCard = ({ userName, userPhoto, review, rating }) => {
   const stars = [1, 2, 3, 4, 5]

   return (
      <div className="reviews__card">
         <div className="reviews__avatar">
            <img
               className="reviews__avatar-img"
               src={`${SERVER_URL}/img/users/${userPhoto}`}
               alt={userName}
            />
            <h6 className="reviews__user">{userName}</h6>
         </div>
         <p className="reviews__text">{review}</p>
         <div className="reviews__rating">
            {stars.map(star => (
               <svg
                  key={review + star}
                  className={`reviews__star reviews__star--${
                     rating >= star ? 'active' : 'inactive'
                  }`}
               >
                  <use xlinkHref="/img/icons.svg#icon-star" />
               </svg>
            ))}
         </div>
      </div>
   )
}

ReviewCard.propTypes = {
   userName: PropTypes.string.isRequired,
   userPhoto: PropTypes.string.isRequired,
   review: PropTypes.string.isRequired,
   rating: PropTypes.number.isRequired,
}

export default ReviewCard
