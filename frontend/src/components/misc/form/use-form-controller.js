import { useState, useEffect, useCallback } from 'react'

import { getTouchedObject, validate } from './form-actions'

const useFormControler = initialState => {
   const [values, setValues] = useState(initialState)
   const [errors, setErrors] = useState({})
   const [touched, setTouched] = useState(getTouchedObject(initialState))
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [isDisabled, setIsDisabled] = useState(false)
   const [fieldsPopulated, setFieldsPopulated] = useState(false)
   const [showAlert, setShowAlert] = useState(false)

   const resetForm = () => {
      setValues(initialState)
      setTouched(getTouchedObject(initialState))
   }

   const populateFields = useCallback(
      fields => {
         setValues(prevValues => {
            const newValues = {}
            Object.keys(prevValues).forEach(key => {
               if (key in fields) newValues[key] = fields[key]
            })

            setFieldsPopulated(true)

            return {
               ...prevValues,
               ...newValues,
            }
         })
      },
      [values, setFieldsPopulated]
   )

   const handleBlur = useCallback(
      e => {
         const { name } = e.target

         setTouched(prevTouched => ({
            ...prevTouched,
            [name]: true,
         }))
      },
      [setTouched]
   )

   const handleChange = useCallback(
      e => {
         const { name } = e.target
         const { value } = e.target

         setValues(prevValues => ({
            ...prevValues,
            [name]: value,
         }))
      },
      [setValues]
   )

   useEffect(() => {
      if (!isSubmitting) {
         const validationErrors = validate(values)
         setErrors(validationErrors)
      }
   }, [values])

   const submitFormdata = async submitCb => {
      setIsDisabled(true)
      setShowAlert(false)
      let allTouched = true
      Object.keys(touched).forEach(key => {
         if (!touched[key]) allTouched = false
      })
      if (!allTouched) {
         const validationErrors = validate(values)
         Object.keys(values).forEach(key => {
            touched[key] = true
         })

         setErrors(validationErrors)
      }
      try {
         if (Object.keys(errors).length === 0) {
            setIsSubmitting(true)
            await submitCb(values)
            if (!fieldsPopulated) resetForm()
            setIsDisabled(false)
         } else setIsDisabled(false)
      } catch (err) {
         setErrors({ ...errors, general: err.message })
         setIsDisabled(false)
      }
      setIsSubmitting(false)
      setShowAlert(true)
      setShowAlert(false)
   }

   return {
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
   }
}

export default useFormControler
