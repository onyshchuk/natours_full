import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

const FormFieldRating = ({ value, change, error, touched }) => {
   const stars = [1, 2, 3, 4, 5]

   const onChange = useCallback(
      star => {
         change({
            target: {
               name: 'rating',
               value: star,
            },
         })
      },
      [change]
   )

   return (
      <div className="form__group form__rating">
         <div className="form__rating-wrapper">
            {stars.map(star => (
               <svg
                  key={`reviewratingstar---${star}`}
                  className={`star star__${star} ${
                     value >= star ? 'active' : 'inactive'
                  }`}
                  onClick={() => onChange(star)}
               >
                  <use xlinkHref="/img/icons.svg#icon-star" />
               </svg>
            ))}
         </div>
         {touched === true && error.length > 0 && (
            <p className="form__error">{error}</p>
         )}
      </div>
   )
}

FormFieldRating.propTypes = {
   value: PropTypes.number.isRequired,
   change: PropTypes.func.isRequired,
   error: PropTypes.string,
   touched: PropTypes.bool.isRequired,
}

FormFieldRating.defaultProps = {
   error: '',
}

export default FormFieldRating
