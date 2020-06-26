/* eslint-disable import/prefer-default-export*/
import axios from 'axios'

import { SERVER_URL } from '../../utils/misc'
import { GET_ALL_TOURS } from './types'

export const getAllTours = async () => {
   const response = await axios.get(`${SERVER_URL}/api/v1/tours`)
   if (response.data.status === 'fail') throw new Error(response.data.message)

   return {
      type: GET_ALL_TOURS,
      payload: response.data.data.tours,
   }
}
