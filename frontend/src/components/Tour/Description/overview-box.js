import React from 'react'
import PropTypes from 'prop-types'

const OverviewBox = ({ icon, label, text }) => {
   return (
      <div className="overview-box__detail">
         <svg className="overview-box__icon">
            <use xlinkHref={`/img/icons.svg#icon-${icon}`} />
         </svg>
         <span className="overview-box__label">{label}</span>
         <span className="overview-box__text">{text}</span>
      </div>
   )
}

OverviewBox.propTypes = {
   icon: PropTypes.string.isRequired,
   label: PropTypes.string.isRequired,
   text: PropTypes.string.isRequired,
}

export default OverviewBox
