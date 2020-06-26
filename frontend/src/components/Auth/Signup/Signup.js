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
   name: '',
   lastname: '',
   email: '',
   password: '',
   passwordConfirm: '',
}

const submitCb = async formdata => {
   const dataToSubmit = {}
   Object.keys(formdata).forEach(key => {
      if (key !== 'name' && key !== 'lastname')
         dataToSubmit[key] = formdata[key]
   })
   dataToSubmit.name = `${formdata.name}${formdata.lastname &&
      ` ${formdata.lastname}`}`

   const response = await axios.post(
      `${SERVER_URL}/api/v1/users/signup`,
      dataToSubmit
   )

   if (response.data.status === 'fail') {
      throw new Error(response.data.message)
   }
}

const Signup = () => {
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
         const msg = isError ? errors.general : 'Signup successful'
         dispatch(setAlert(isError, msg))
         if (!isError)
            setTimeout(() => {
               history.push('/login')
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
                  id="name"
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="John"
                  value={values.name}
                  error={errors.name}
                  change={handleChange}
                  blur={handleBlur}
                  touched={touched.name}
                  required
                  disabled={isDisabled}
               />
               <FormField
                  element="input"
                  id="lastname"
                  label="Lastname"
                  name="lastname"
                  type="text"
                  placeholder="Doe"
                  value={values.lastname}
                  error={errors.lastname}
                  change={handleChange}
                  blur={handleBlur}
                  touched={touched.lastname}
                  disabled={isDisabled}
                  optional
               />
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
                     title="Sign Up"
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

export default Signup
