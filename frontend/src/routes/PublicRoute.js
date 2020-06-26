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

const PublicRoute = ({ component, path, exact: exactProp, restricted }) => {
   const user = useSelector(state => state.user.user, shallowEqual)
   const flag = useSelector(state => state.user.flag, shallowEqual)
   const dispatch = useDispatch()
   const [isLoading, setIsloading] = useState(true)
   const shouldRedirect = restricted && user && flag.auth !== 'logedIn'

   useEffect(() => {
      if (flag)
         if (flag.auth === 'end') {
            setIsloading(false)
            dispatch(setFlag({ auth: null }))
         }
   }, [flag])

   const redirect = useCallback(() => <Redirect to="/" />)

   const componentToRender = shouldRedirect ? redirect : component

   return (
      <Route
         path={path}
         exact={exactProp}
         component={isLoading ? loading : componentToRender}
      />
   )
}

PublicRoute.propTypes = {
   component: PropTypes.func.isRequired,
   path: PropTypes.string.isRequired,
   exact: PropTypes.bool,
   restricted: PropTypes.bool,
}

PublicRoute.defaultProps = {
   exact: false,
   restricted: false,
}

export default PublicRoute
