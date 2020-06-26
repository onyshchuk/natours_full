/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'

import autoResizeTextArea from '../../../utils/autoResizeTextArea'

const FormField = ({
   element,
   label,
   name,
   type,
   placeholder,
   value,
   options,
   error,
   change,
   blur,
   id,
   required,
   touched,
   disabled,
   optional,
}) => {
   const [validIndication, setValidIndication] = useState('')
   const textareaRef = useRef(null)

   useEffect(() => {
      if (element === 'textarea') {
         autoResizeTextArea(textareaRef)
      }
   }, [value])

   const handleChange = e => {
      // console.log({ el: textareaRef.current.style })
      change(e)
   }

   // check if field is touched and if there is error and adds indication classes
   useEffect(() => {
      if (touched === true && error.length > 0)
         setValidIndication(' form__input--invalid')
      else if (touched === true && error.length === 0)
         setValidIndication(' form__input--valid')
   }, [touched, error])

   // adds indication to the first focus, after first focus indication controled
   // on effect hook
   const handleOnFocuse = useCallback(() => {
      if (!touched) setValidIndication(' form__input--valid')
   }, [touched, setValidIndication])

   let formTemplate = ''

   const defaultProps = {
      id,
      name,
      type,
      value,
      onBlur: blur,
      required,
      disabled,
   }

   switch (element) {
      case 'input':
         formTemplate = (
            <input
               // autoComplete="off"
               className={`form__input${validIndication}`}
               placeholder={placeholder}
               onFocus={handleOnFocuse}
               onChange={change}
               aria-describedby={`${id}-error`}
               {...defaultProps}
            />
         )
         break
      case 'select':
         formTemplate = (
            <select {...defaultProps}>
               <option value="">Select one</option>
               {options.map(item => (
                  <option key={item.key} value={item.key}>
                     {item.value}
                  </option>
               ))}
            </select>
         )
         break
      case 'textarea':
         formTemplate = (
            <textarea
               className={`form__textarea${validIndication}`}
               placeholder={placeholder}
               ref={textareaRef}
               onChange={handleChange}
               {...defaultProps}
            />
         )

         break
      default:
         formTemplate = ''
   }
   return (
      <div className="form__group">
         {label && label !== '' && (
            <label className="form__label" htmlFor={id}>
               {label}
            </label>
         )}
         {optional && <span>optional</span>}
         {formTemplate}
         {touched === true && error.length > 0 && (
            <p id={`${id}-error`} className="form__error">
               {error}
            </p>
         )}
      </div>
   )
}

FormField.propTypes = {
   element: PropTypes.string.isRequired,
   label: PropTypes.string,
   name: PropTypes.string.isRequired,
   placeholder: PropTypes.string,
   type: PropTypes.string.isRequired,
   value: PropTypes.string,
   options: PropTypes.array,
   error: PropTypes.string,
   change: PropTypes.func.isRequired,
   blur: PropTypes.func.isRequired,
   id: PropTypes.string.isRequired,
   required: PropTypes.bool,
   touched: PropTypes.bool.isRequired,
   disabled: PropTypes.bool,
   optional: PropTypes.bool,
}

FormField.defaultProps = {
   options: [],
   error: '',
   label: '',
   placeholder: '',
   value: undefined,
   required: false,
   disabled: false,
   optional: false,
}

export default React.memo(FormField)
