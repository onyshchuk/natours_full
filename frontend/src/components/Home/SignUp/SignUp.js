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
   email: '',
   password: '',
   passwordConfirm: '',
}

const submitCb = async formdata => {
   const response = await axios.post(
      `${SERVER_URL}/api/v1/users/signup`,
      formdata
   )

   if (response.data.status === 'fail') {
      throw new Error(response.data.message)
   }

   if (response.data.status === 'error') {
      throw new Error('Something went very wrong')
   }
}

const SignUp = () => {
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
         const msg = isError ? errors.general : 'Signup successful !'
         dispatch(setAlert(isError, msg))
         if (!isError)
            setTimeout(() => {
               history.push('/login')
            }, 1500)
      }
   }, [showAlert])

   return (
      <section className="section-signup">
         <div className="signup-form">
            <div className="signup-form__wrapper">
               <h2 className="heading-secondary u-margin-bottom-medium">
                  Start booking now
               </h2>
               <form className="form " onSubmit={handleSubmit}>
                  <FormField
                     element="input"
                     id="name"
                     label="Full name"
                     name="name"
                     type="text"
                     placeholder="John Doe"
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
      </section>
   )
}

export default SignUp
