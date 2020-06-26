import React from 'react'
import PropTypes from 'prop-types'

const FormFieldImg = ({ name, link, title, imageURL, change }) => {
   return (
      <div className="form__group form__image-upload">
         <img src={imageURL || link} alt="" className="form__img" />
         <input
            name={name}
            id="uploadImage"
            type="file"
            accept="image/*"
            className="form__upload"
            onChange={change}
         />
         <label htmlFor="uploadImage" className="btn-text btn-text--green">
            {title}
         </label>
      </div>
   )
}

FormFieldImg.propTypes = {
   name: PropTypes.string.isRequired,
   link: PropTypes.string,
   title: PropTypes.string,
   imageURL: PropTypes.string,
   change: PropTypes.func.isRequired,
}

FormFieldImg.defaultProps = {
   link: null,
   title: null,
   imageURL: null,
}

export default FormFieldImg
