export const getTouchedObject = initialState => {
   const result = {}
   Object.keys(initialState).forEach(key => {
      result[key] = false
   })
   return result
}

export const validate = values => {
   const errors = {}

   if ('email' in values) {
      if (!values.email) {
         errors.email = 'Email is required'
      } else if (
         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
         errors.email = 'Invalid email address'
      }
   }

   if ('password' in values) {
      if (!values.password) {
         errors.password = 'Password is required'
      } else if (values.password.length < 8) {
         errors.password = 'password must be at least 8 characters long'
      }
   }

   if ('passwordConfirm' in values) {
      if (!values.passwordConfirm) {
         errors.passwordConfirm = 'Confirm password is required'
      } else if (values.password !== values.passwordConfirm) {
         errors.passwordConfirm = 'Passwords does not match'
      }
   }

   if ('name' in values) {
      if (!values.name) {
         errors.name = 'Name is required'
      } else if (values.name.length < 4) {
         errors.name = 'Name must be at least 4 characters long'
      }
   }

   if ('review' in values) {
      if (!values.review) errors.review = 'Write a review first'
   }

   if ('rating' in values) {
      if (!values.rating) errors.rating = 'Rate tour first'
   }

   return errors
}

////////////////////////////////// old

export const oldValidate = (element, formdata = []) => {
   let error = [true, '']

   if (element.validation.email) {
      const valid = /\S+@\S+\.\S+/.test(element.value)
      const message = `${!valid ? 'Must be a valid email' : ''}`
      error = !valid ? [valid, message] : error
   }

   if (element.validation.confirm) {
      const valid =
         element.value.trim() === formdata[element.validation.confirm].value
      const message = `${!valid ? 'Passwords do not match' : ''}`
      error = !valid ? [valid, message] : error
   }

   if (element.validation.required) {
      const valid = element.value.trim() !== ''
      const message = `${!valid ? 'This field is required' : ''}`
      error = !valid ? [valid, message] : error
   }

   return error
}

export const update = (element, formdata) => {
   const newFormdata = { ...formdata }
   const newElement = { ...newFormdata[element.id] }

   newElement.value = element.event.target.value
   const validData = validate(newElement, formdata)
   newElement.valid = validData[0]
   if (element.blur) {
      newElement.validationMessage = validData[1]
   }

   if (!newElement.touched) newElement.touched = element.blur
   newFormdata[element.id] = newElement

   return newFormdata
}

export const generateData = formdata => {
   const dataToSubmit = {}

   Object.keys(formdata).forEach(key => {
      if (key !== 'confirmPassword') dataToSubmit[key] = formdata[key].value
   })

   return dataToSubmit
}

export const isFormValid = formdata => {
   let formIsValid = true
   Object.keys(formdata).forEach(key => {
      formIsValid = formdata[key].valid && formIsValid
   })
   return formIsValid
}

export const populateOptionFields = (formdata, arrayData = [], field) => {
   const newArray = []
   const newFormdata = { ...formdata }

   arrayData.forEach(item => newArray.push({ key: item._id, value: item.name }))

   newFormdata[field].config.options = newArray
   return newFormdata
}

export const oldResetFields = formdata => {
   const newFormdata = { ...formdata }

   Object.keys(newFormdata).forEach(key => {
      if (key === 'images') newFormdata[key].value = []
      else newFormdata[key].value = ''

      newFormdata[key].valid = false
      newFormdata[key].rouched = false
      newFormdata[key].validationMessage = ''
   })

   return newFormdata
}

export const populateFields = (formdata, fields) => {
   Object.keys(formdata).forEach(key => {
      formdata[key].value = fields[key]
      formdata[key].valid = true
      formdata[key].touched = true
      formdata[key].validationMessage = ''
   })
   return formdata
}
