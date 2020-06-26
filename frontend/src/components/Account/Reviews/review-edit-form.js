import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { setAlert } from '../../../store/actions/utilsActions'
import useFormController from '../../misc/form/use-form-controller'
import FormField from '../../misc/form/form-field'
import FormFieldRating from '../../misc/form/form-field-rating'
import Button from '../../misc/button'
import LoadingSmall from '../../misc/loading-small'

import { updateReviewFromUser } from '../../../store/actions/reviewActions'

const ReviewEditForm = ({ reviewId, review, rating, cancelEdit }) => {
   const INITIAL_STATE = {
      review: '',
      rating: 0,
   }

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
      populateFields,
   } = useFormController(INITIAL_STATE)

   const dispatch = useDispatch()
   const [submit, setSubmit] = useState(false)
   const isError = Object.keys(errors).length !== 0
   const isLoading = isSubmitting || (showAlert && !isError)

   const submitCb = async formdata => {
      dispatch(updateReviewFromUser(reviewId, formdata))
   }

   useEffect(() => {
      populateFields({ review, rating })
   }, [])

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
      <form className="form form-review-edit" onSubmit={handleSubmit}>
         <FormField
            element="textarea"
            id="Review"
            name="review"
            type="text"
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
               altClass="cancel-button"
               title="Cancel"
               color="green"
               size="small"
               handleClick={cancelEdit}
            />
            <Button
               disabled={isDisabled}
               btnType="submit"
               title="Save"
               color="green"
               size="small"
               onClick={handleSubmit}
            />
         </div>
      </form>
   )
}

ReviewEditForm.propTypes = {
   reviewId: PropTypes.string.isRequired,
   review: PropTypes.string.isRequired,
   rating: PropTypes.number.isRequired,
   cancelEdit: PropTypes.func.isRequired,
}

export default ReviewEditForm
