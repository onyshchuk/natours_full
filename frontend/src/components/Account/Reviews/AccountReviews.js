import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ReviewCard from './review-card'
import { getReviewsFromUser } from '../../../store/actions/reviewActions'

const AccountReviews = () => {
   const [editReview, setEditReview] = useState([])
   const userId = useSelector(state => state.user.user._id)
   const reviews = useSelector(state => state.reviews.userReviews)
   const dispatch = useDispatch()

   useEffect(() => {
      if (userId) dispatch(getReviewsFromUser(userId))
   }, [userId])

   useEffect(() => {
      if (reviews) setEditReview(reviews.map(() => false))
   }, [reviews])

   const handleEdit = useCallback(
      idx =>
         setEditReview(prevState => prevState.map((unusedVar, i) => i === idx)),
      [setEditReview]
   )
   const cancelEdit = useCallback(
      () => setEditReview(prevState => prevState.map(() => false)),
      [setEditReview]
   )

   return (
      <div className="user-view__content">
         <div className="user-view__reviews">
            {reviews &&
               reviews.map((review, idx) => {
                  return (
                     <ReviewCard
                        key={review._id}
                        reviewId={review._id}
                        tourName={review.tour.name}
                        tourSlug={review.tour.slug}
                        review={review.review}
                        rating={review.rating}
                        createdAt={review.createdAt}
                        editedAt={review.editedAt}
                        handleEdit={() => handleEdit(idx)}
                        cancelEdit={cancelEdit}
                        editFlag={!!editReview[idx]}
                     />
                  )
               })}
         </div>
      </div>
   )
}

export default AccountReviews
