/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import LoadingSmall from '../components/misc/loading-small'
import { setFlag } from '../store/actions/userActions'

const loading = () => (
   <div className="loading">
      <LoadingSmall />
   </div>
)

const PrivateRoute = ({ component, path, exact: exactProp, admin }) => {
   const user = useSelector(state => state.user.user, shallowEqual)
   const flag = useSelector(state => state.user.flag, shallowEqual)
   const dispatch = useDispatch()
   const [isLoading, setIsloading] = useState(true)
   let shouldRedirect = !user
   if (admin) shouldRedirect = !user || user.role !== 'admin'

   useEffect(() => {
      if (flag)
         if (flag.auth === 'end') {
            setIsloading(false)
            dispatch(setFlag({ auth: null }))
         }
   }, [flag])

   const redirect = useCallback(
      () => (admin ? <Redirect to="/me" /> : <Redirect to="/login" />),
      [admin]
   )
   const componentToRender = shouldRedirect ? redirect : component

   return (
      <Route
         path={path}
         exact={exactProp}
         component={isLoading ? loading : componentToRender}
      />
   )
}

PrivateRoute.propTypes = {
   component: PropTypes.func.isRequired,
   path: PropTypes.string.isRequired,
   exact: PropTypes.bool,
   admin: PropTypes.bool,
}

PrivateRoute.defaultProps = {
   exact: false,
   admin: false,
}

export default PrivateRoute
