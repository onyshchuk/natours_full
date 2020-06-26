import {
   GET_REVIEWS_FROM_TOUR,
   GET_REVIEWS_FROM_USER,
   UPDATE_REVIEW_FROM_USER,
} from '../actions/types'

export default (state = {}, action) => {
   switch (action.type) {
      case GET_REVIEWS_FROM_TOUR:
         return { ...state, tourReviews: action.payload }
      case GET_REVIEWS_FROM_USER:
         return { ...state, userReviews: action.payload }
      case UPDATE_REVIEW_FROM_USER:
         return {
            ...state,
            userReviews: state.userReviews.map(review =>
               review._id === action.payload._id ? action.payload : review
            ),
         }
      default:
         return state
   }
}
