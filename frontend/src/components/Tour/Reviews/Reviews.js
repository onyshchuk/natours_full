import React from 'react'
import PropTypes from 'prop-types'
import SimpleBar from 'simplebar-react'

import ReviewCard from './review-card'

const Reviews = ({ reviews }) => {
   let sortedReviews = []
   if (reviews)
      sortedReviews = reviews.sort(
         (a, b) => parseInt(b.createdAt, 10) - parseInt(a.createdAt, 10)
      )
   return (
      <section className="section-reviews">
         <SimpleBar>
            <div className="reviews">
               {reviews &&
                  sortedReviews.map(review => (
                     <ReviewCard
                        key={review._id}
                        userName={review.user.name}
                        userPhoto={review.user.photo}
                        review={review.review}
                        rating={review.rating}
                     />
                  ))}
            </div>
         </SimpleBar>
      </section>
   )
}

Reviews.propTypes = {
   reviews: PropTypes.array,
}

Reviews.defaultProps = {
   reviews: [],
}

export default Reviews
