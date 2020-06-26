import React from 'react'
import PropTypes from 'prop-types'

const FeatureBox = ({ icon, heading, children }) => {
   return (
      <div className="feature-box">
         <i className={`feature-box__icon ${icon}`} />
         <h3 className="heading-quaternary u-margin-bottom-small">{heading}</h3>
         <p className="feature-box__text">{children}</p>
      </div>
   )
}

FeatureBox.propTypes = {
   icon: PropTypes.string.isRequired,
   heading: PropTypes.string.isRequired,
   children: PropTypes.string.isRequired,
}

export default FeatureBox
