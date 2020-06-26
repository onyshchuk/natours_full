import React, { useState, useEffect, useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import useFormController from '../../misc/form/use-form-controller'
import FormField from '../../misc/form/form-field'
import Button from '../../misc/button'
import LoadingSmall from '../../misc/loading-small'

import { setAlert } from '../../../store/actions/utilsActions'
import { SERVER_URL } from '../../../utils/misc'

const INITIAL_STATE = {
   password: '',
   passwordConfirm: '',
}

const submitCb = async (token, formdata) => {
   const response = await axios.patch(
      `${SERVER_URL}/api/v1/users/resetPassword/${token}`,
      formdata,
      {
         withCredentials: true,
      }
   )

   if (response.data.status === 'fail') {
      throw new Error(response.data.message)
   }
}

const ResetPassword = () => {
   const {
      handleChange,
      handleBlur,
      submitFormdata,
      values,
      errors,
      touched,
      isSubmitting,
      isDisabled,
      showAlert,
   } = useFormController(INITIAL_STATE)

   const [submit, setSubmit] = useState(false)
   const { token } = useParams()
   const dispatch = useDispatch()
   const history = useHistory()
   const isError = Object.keys(errors).length !== 0
   const isLoading = isSubmitting || (showAlert && !isError)

   useEffect(() => {
      if (token.length !== 64) history.push('/')
   }, [token])

   const submitCbWithToken = submitCb.bind(undefined, token)

   useEffect(() => {
      if (submit) submitFormdata(submitCbWithToken)
      setSubmit(false)
   }, [submit])

   const handleSubmit = useCallback(
      e => {
         e.preventDefault()
         setSubmit(true)
      },
      [setSubmit]
   )

   useEffect(() => {
      if (showAlert) {
         const msg = isError ? errors.general : 'Password changed'
         dispatch(setAlert(isError, msg))

         setTimeout(() => {
            if (!isError) history.push('/login')
            else history.push('/')
         }, 1500)
      }
   }, [showAlert])

   return (
      <div className="auth">
         <div className="auth-form">
            <h2 className="heading-tertiary u-margin-bottom-medium">
               Request a password restore
            </h2>
            <form className="form" onSubmit={handleSubmit}>
               <FormField
                  element="input"
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={values.password}
                  error={errors.password}
                  change={handleChange}
                  blur={handleBlur}
                  touched={touched.password}
                  required
                  disabled={isDisabled}
               />
               <FormField
                  element="input"
                  id="passwordConfirm"
                  label="Confirm Password"
                  name="passwordConfirm"
                  type="password"
                  placeholder="••••••••"
                  value={values.passwordConfirm}
                  error={errors.passwordConfirm}
                  change={handleChange}
                  blur={handleBlur}
                  touched={touched.passwordConfirm}
                  required
                  disabled={isDisabled}
               />
               <div className="auth-button-wrapper">
                  <Button
                     disabled={isDisabled}
                     btnType="submit"
                     title="Send"
                     color="green"
                     size="small"
                     onClick={handleSubmit}
                  />

                  {isLoading && (
                     <div className="auth-button-wrapper__loading">
                        <LoadingSmall className="login-loading--img" />
                     </div>
                  )}
               </div>
            </form>
         </div>
      </div>
   )
}

export default ResetPassword
