/* eslint-disable import/prefer-default-export*/
import axios from 'axios'

import { SERVER_URL } from '../../utils/misc'
import {
   GET_REVIEWS_FROM_TOUR,
   GET_REVIEWS_FROM_USER,
   UPDATE_REVIEW_FROM_USER,
} from './types'

export const getReviewsFromTour = async id => {
   const response = await axios.get(`${SERVER_URL}/api/v1/tours/${id}/reviews`)
   if (response.data.status === 'fail') throw new Error(response.data.message)

   return {
      type: GET_REVIEWS_FROM_TOUR,
      payload: response.data.data.reviews,
   }
}

export const getReviewsFromUser = async id => {
   const response = await axios.get(`${SERVER_URL}/api/v1/reviews?user=${id}`, {
      withCredentials: true,
   })
   if (response.data.status === 'fail') throw new Error(response.data.message)

   return {
      type: GET_REVIEWS_FROM_USER,
      payload: response.data.data.reviews,
   }
}

export const updateReviewFromUser = async (id, updatedReview) => {
   const response = await axios.patch(
      `${SERVER_URL}/api/v1/reviews/${id}`,
      updatedReview,
      {
         withCredentials: true,
      }
   )
   if (response.data.status === 'fail') throw new Error(response.data.message)

   return {
      type: UPDATE_REVIEW_FROM_USER,
      payload: response.data.data.review,
   }
}
