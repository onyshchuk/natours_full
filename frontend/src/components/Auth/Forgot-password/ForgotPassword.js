import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import useFormController from '../../misc/form/use-form-controller'
import FormField from '../../misc/form/form-field'
import Button from '../../misc/button'
import LoadingSmall from '../../misc/loading-small'

import { setAlert } from '../../../store/actions/utilsActions'
import { SERVER_URL } from '../../../utils/misc'

const INITIAL_STATE = {
   email: '',
}

const submitCb = async formdata => {
   const response = await axios.post(
      `${SERVER_URL}/api/v1/users/forgotPassword`,
      formdata,
      { withCredentials: true }
   )

   if (response.data.status === 'fail') throw new Error(response.data.message)
}

const ForgotPassword = () => {
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
   const dispatch = useDispatch()
   const history = useHistory()
   const isError = Object.keys(errors).length !== 0
   const isLoading = isSubmitting || (showAlert && !isError)

   useEffect(() => {
      if (submit) submitFormdata(submitCb)
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
         const msg = isError ? errors.general : 'Email with instructions sent'
         dispatch(setAlert(isError, msg))
         if (!isError)
            setTimeout(() => {
               history.push('/')
            }, 1500)
      }
   }, [showAlert])

   return (
      <div className="auth">
         <div className="auth-form">
            <h2 className="heading-tertiary u-margin-bottom-medium">
               Request a password reset
            </h2>
            <form className="form" onSubmit={handleSubmit}>
               <FormField
                  element="input"
                  id="email"
                  label="Email address"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={values.email}
                  error={errors.email}
                  change={handleChange}
                  blur={handleBlur}
                  touched={touched.email}
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

export default ForgotPassword
