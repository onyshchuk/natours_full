/* eslint-disable import/prefer-default-export*/
import { SET_ALERT, REMOVE_ALERT } from './types'

export const setAlert = (isErr, msg) => ({
   type: SET_ALERT,
   payload: { isErr, msg },
})

export const removeAlert = () => ({
   type: REMOVE_ALERT,
   payload: null,
})
