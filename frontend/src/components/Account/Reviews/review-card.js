import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import ReviewEditForm from './review-edit-form'
import Button from '../../misc/button'

const ReviewCard = ({
   reviewId,
   tourName,
   tourSlug,
   review,
   rating,
   createdAt,
   editedAt,
   handleEdit,
   cancelEdit,
   editFlag,
}) => {
   const stars = [1, 2, 3, 4, 5]
   const date = new Date(createdAt)
   let editDate = ''
   if (editedAt) editDate = new Date(editedAt)
   return (
      <div className="review-card">
         <div className="review-card__tour-wrapper">
            <Link to={`/tour/${tourSlug}`}>
               <h6 className="review-card__tourname heading-tertiary u-margin-bottom-small">
                  {tourName}
               </h6>
            </Link>
            <div className="review-card__date-wrapper">
               <div className="review-card__date">
                  <span className="review-card__date-value">
                     Posted at&nbsp;
                  </span>
                  <span className="review-card__date-text">
                     {date.toLocaleString('en-us', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                     })}
                  </span>
               </div>
               {editDate && (
                  <div className="review-card__date">
                     <span className="review-card__date-value">
                        Edited at&nbsp;
                     </span>
                     <span className="review-card__date-text">
                        {date.toLocaleString('en-us', {
                           month: 'long',
                           day: 'numeric',
                           year: 'numeric',
                        })}
                     </span>
                  </div>
               )}
            </div>
         </div>
         {editFlag ? (
            <ReviewEditForm
               reviewId={reviewId}
               review={review}
               rating={rating}
               cancelEdit={cancelEdit}
            />
         ) : (
            <div>
               <p className="review-card__text u-margin-bottom-small">
                  {review}
               </p>
               <div className="review-card__edit-rating">
                  <div className="reviews-card__rating">
                     {stars.map(star => (
                        <svg
                           key={reviewId + star}
                           className={`review-card__star review-card__star--${
                              rating >= star ? 'active' : 'inactive'
                           }`}
                        >
                           <use xlinkHref="/img/icons.svg#icon-star" />
                        </svg>
                     ))}
                  </div>

                  <Button
                     color="green"
                     title="Edit"
                     size="small"
                     handleClick={handleEdit}
                  />
               </div>
            </div>
         )}
      </div>
   )
}

ReviewCard.propTypes = {
   reviewId: PropTypes.string.isRequired,
   tourName: PropTypes.string.isRequired,
   tourSlug: PropTypes.string.isRequired,
   review: PropTypes.string.isRequired,
   rating: PropTypes.number.isRequired,
   createdAt: PropTypes.string.isRequired,
   editedAt: PropTypes.string,
   handleEdit: PropTypes.func.isRequired,
   cancelEdit: PropTypes.func.isRequired,
   editFlag: PropTypes.bool.isRequired,
}

ReviewCard.defaultProps = {
   editedAt: '',
}

export default ReviewCard
