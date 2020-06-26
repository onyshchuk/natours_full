import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { updateMe } from '../../store/actions/userActions'

import useFormController from '../misc/form/use-form-controller'
import FormField from '../misc/form/form-field'
import FormFieldImg from '../misc/form/form-field-img'
import Button from '../misc/button'
import LoadingSmall from '../misc/loading-small'

import { setAlert } from '../../store/actions/utilsActions'
import { SERVER_URL } from '../../utils/misc'

const INITIAL_STATE = {
   name: '',
   email: '',
   photo: null,
}

const AccountSettingsForm = () => {
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

   const user = useSelector(state => state.user.user)
   const dispatch = useDispatch()
   const [submit, setSubmit] = useState(false)
   const isError = Object.keys(errors).length !== 0
   const isLoading = isSubmitting || (showAlert && !isError)

   const submitCb = async formdata => {
      const newFormdata = new FormData()
      newFormdata.append('name', formdata.name)
      newFormdata.append('email', formdata.email)
      if (formdata.photo) newFormdata.append('photo', formdata.photo.file)

      dispatch(updateMe(newFormdata))
   }

   useEffect(() => {
      if (user) populateFields(user)
   }, [user])

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
         const msg = isError ? errors.general : 'Settings updated successfully'
         dispatch(setAlert(isError, msg))
      }
   }, [showAlert])

   const handleChangeImg = e => {
      const inputNode = e.target
      const file = e.target.files[0]
      const { name } = e.target
      const img = new Image()
      img.src = window.URL.createObjectURL(file)

      img.onload = () => {
         let { width, height } = img
         let x = 0
         let y = 0

         if (height > width) {
            const scaling = 500 / width
            width *= scaling
            height *= scaling
            y = (height - width) / -2
         } else {
            const scaling = 500 / height
            height *= scaling
            width *= scaling
            x = (width - height) / -2
         }
         const elem = document.createElement('canvas')
         elem.width = 500
         elem.height = 500
         const ctx = elem.getContext('2d')
         ctx.drawImage(img, x, y, width, height)
         const imageURL = ctx.canvas.toDataURL(img, 'image/png', 1)

         const value = {
            file,
            imageURL,
            size: file.size,
            width: img.width,
            height: img.height,
         }

         if (file.size > 1024000) {
            inputNode.value = ''
            dispatch(setAlert(true, 'Max photo size is 10mb'))
            return
         }
         if (img.width < 75 || img.height < 75) {
            dispatch(setAlert(true, 'Min resolution is 75x57px'))
            return
         }

         handleChange({
            target: { value, name },
         })
      }
   }

   return (
      <div>
         <form className="form form-user-data" onSubmit={handleSubmit}>
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
            <FormFieldImg
               name="photo"
               link={user && `${SERVER_URL}/img/users/${user.photo}`}
               title="Choose new photo"
               imageURL={values.photo && values.photo.imageURL}
               change={handleChangeImg}
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

export default AccountSettingsForm
