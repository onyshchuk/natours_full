import React from 'react'
import PropTypes from 'prop-types'

const Alert = ({ error, msg }) => {
   const type = error ? 'error' : 'success'
   return <div className={`alert alert--${type}`}>{msg}</div>
}

Alert.propTypes = {
   error: PropTypes.bool.isRequired,
   msg: PropTypes.string.isRequired,
}

export default Alert
