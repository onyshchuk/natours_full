import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { loginUser } from '../../../store/actions/userActions'
import { setAlert } from '../../../store/actions/utilsActions'
import useFormController from '../../misc/form/use-form-controller'
import FormField from '../../misc/form/form-field'
import Button from '../../misc/button'
import LoadingSmall from '../../misc/loading-small'

const INITIAL_STATE = {
   email: '',
   password: '',
}

const Login = () => {
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
   const history = useHistory()
   const dispatch = useDispatch()
   const isError = Object.keys(errors).length !== 0
   const isLoading = isSubmitting || (showAlert && !isError)

   const submitCb = async formdata => {
      await dispatch(loginUser(formdata))
   }

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
         const msg = isError ? errors.general : 'Login successfull'
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
               Log into your account
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
               <div className="auth-button-wrapper">
                  <Button
                     disabled={isDisabled}
                     btnType="submit"
                     title="Log in"
                     color="green"
                     size="small"
                     onClick={handleSubmit}
                  />
                  {isLoading && (
                     <div className="auth-button-wrapper__loading">
                        <LoadingSmall className="login-loading--img" />
                     </div>
                  )}
                  <Button
                     disabled={isDisabled}
                     type="text-link"
                     title="Forgot your password ?"
                     color="regular-dark"
                     size="small"
                     linkTo="/forgot-password"
                  />
               </div>
            </form>
         </div>
      </div>
   )
}

export default Login
