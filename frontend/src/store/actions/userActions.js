/* eslint-disable import/prefer-default-export*/
import axios from 'axios'

import { SERVER_URL } from '../../utils/misc'
import {
   LOGIN_USER,
   AUTH_USER,
   LOGOUT_USER,
   UPDATE_ME,
   USER_FLAG,
} from './types'

export const setFlag = flag => ({
   type: USER_FLAG,
   payload: flag,
})

export const loginUser = async dataToSubmit => async dispatch => {
   const response = await axios.post(
      `${SERVER_URL}/api/v1/users/login`,
      dataToSubmit,
      { withCredentials: true }
   )

   if (response.data.status === 'fail') throw new Error(response.data.message)

   dispatch(setFlag({ auth: 'logedIn' }))
   dispatch({
      type: LOGIN_USER,
      payload: response.data.data.user,
   })
}

export const authUser = async () => async dispatch => {
   dispatch(setFlag({ auth: 'start' }))

   axios.interceptors.response.use(
      res => res,
      err => err.response
   )

   const response = await axios.get(`${SERVER_URL}/api/v1/users/me`, {
      withCredentials: true,
   })

   if (response.status !== 200) dispatch({ type: AUTH_USER, payload: null })
   else
      dispatch({
         type: AUTH_USER,
         payload: response.data.data.user,
      })
   dispatch(setFlag({ auth: 'end' }))
}

export const logoutUser = async () => {
   const response = await axios.get(`${SERVER_URL}/api/v1/users/logout`, {
      withCredentials: true,
   })

   if (response.data.status === 'success')
      return {
         type: LOGOUT_USER,
         payload: null,
      }
}

export const updateMe = async dataToSubmit => {
   const response = await axios.patch(
      `${SERVER_URL}/api/v1/users/updateMe`,
      dataToSubmit,
      { withCredentials: true }
   )

   if (response.data.status === 'success')
      return {
         type: UPDATE_ME,
         payload: response.data.data.user,
      }
}
