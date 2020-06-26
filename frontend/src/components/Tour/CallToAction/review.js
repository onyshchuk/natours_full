import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import PropTypes from 'prop-types'

import { setAlert } from '../../../store/actions/utilsActions'
import { getReviewsFromTour } from '../../../store/actions/reviewActions'
import useFormController from '../../misc/form/use-form-controller'
import FormField from '../../misc/form/form-field'
import FormFieldRating from '../../misc/form/form-field-rating'
import Button from '../../misc/button'
import LoadingSmall from '../../misc/loading-small'

import { SERVER_URL } from '../../../utils/misc'

const INITIAL_STATE = {
   review: '',
   rating: 0,
}

const Review = ({ tourId }) => {
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

   const submitCb = async formdata => {
      const response = await axios.post(
         `${SERVER_URL}/api/v1/tours/${tourId}/reviews`,
         formdata,
         { withCredentials: true }
      )

      if (response.data.status) dispatch(getReviewsFromTour(tourId))

      if (response.data.status === 'fail')
         throw new Error(response.data.message)
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
         const msg = isError ? errors.general : 'Review saved successfully'
         dispatch(setAlert(isError, msg))
         if (!isError) setTimeout(() => {}, 1500)
      }
   }, [showAlert])

   return (
      <div className="cta__review">
         <h2 className="heading-tertiary u-margin-bottom-small">
            Please describe your journey
         </h2>
         <form className="form" onSubmit={handleSubmit}>
            <FormField
               element="textarea"
               id="review"
               name="review"
               type="review"
               placeholder="Your story..."
               value={values.review}
               error={errors.review}
               change={handleChange}
               blur={handleBlur}
               touched={touched.review}
               required
               disabled={isDisabled}
            />
            <div className="button-rating-wrapper">
               <FormFieldRating
                  value={values.rating}
                  error={errors.rating}
                  change={handleChange}
                  touched={touched.rating}
               />
               {isLoading && (
                  <div className="button-rating-wrapper__loading">
                     <LoadingSmall className="login-loading--img" />
                  </div>
               )}
               <Button
                  disabled={isDisabled}
                  btnType="submit"
                  title="Submit review"
                  color="green"
                  size="small"
                  onClick={handleSubmit}
               />
            </div>
         </form>
      </div>
   )
}

Review.propTypes = { tourId: PropTypes.string.isRequired }

export default Review
