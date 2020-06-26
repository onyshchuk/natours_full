import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import useFormController from '../misc/form/use-form-controller'
import FormField from '../misc/form/form-field'
import Button from '../misc/button'
import LoadingSmall from '../misc/loading-small'

import { setAlert } from '../../store/actions/utilsActions'
import { SERVER_URL } from '../../utils/misc'

const INITIAL_STATE = {
   passwordCurrent: '',
   password: '',
   passwordConfirm: '',
}

const submitCb = async formdata => {
   const response = await axios.patch(
      `${SERVER_URL}/api/v1/users/updateMyPassword`,
      formdata,
      { withCredentials: true }
   )

   if (response.data.status === 'fail') {
      throw new Error(response.data.message)
   }
}

const PasswordChangeForm = () => {
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
   const isError = Object.keys(errors).length !== 0
   const isLoading = isSubmitting || (showAlert && !isError)

   const handleSubmit = useCallback(
      e => {
         e.preventDefault()
         setSubmit(true)
      },
      [setSubmit]
   )

   useEffect(() => {
      if (submit) submitFormdata(submitCb)
      setSubmit(false)
   }, [submit])

   useEffect(() => {
      if (showAlert) {
         const msg = isError ? errors.general : 'Password updated successfully'
         dispatch(setAlert(isError, msg))
      }
   }, [showAlert])

   return (
      <div>
         <form className="form form-user-data" onSubmit={handleSubmit}>
            <FormField
               element="input"
               id="passwordCurrent"
               label="Current password"
               name="passwordCurrent"
               type="password"
               placeholder="••••••••"
               value={values.passwordCurrent}
               error={errors.passwordCurrent}
               change={handleChange}
               blur={handleBlur}
               touched={touched.passwordCurrent}
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
               label="Confirm password"
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
            <div className="account-button-wrapper">
               {isLoading && (
                  <div className="account-button-wrapper__loading">
                     <LoadingSmall className="login-loading--img" />
                  </div>
               )}
               <Button
                  disabled={isDisabled}
                  btnType="submit"
                  title="Save settings"
                  color="green"
                  size="small"
                  onClick={handleSubmit}
               />
            </div>
         </form>
      </div>
   )
}

export default PasswordChangeForm
