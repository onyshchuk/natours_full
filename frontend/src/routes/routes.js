import React from 'react'
import { Route, Switch } from 'react-router-dom'

import GeneralLayout from '../hoc/generalLayout'
import AccountLayout from '../hoc/accountLayout'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import Home from '../components/Home'
import Login from '../components/Auth/Login'
import Signup from '../components/Auth/Signup'
import ForgotPassword from '../components/Auth/Forgot-password'
import ResetPassword from '../components/Auth/Reset-password'
import AllTours from '../components/All-Tours'
import Tour from '../components/Tour'
import Account from '../components/Account'
import AccountBookings from '../components/Account/Bookings'
import AccountReviews from '../components/Account/Reviews'
import ManageTours from '../components/Account/Admin/ManageTours'
import NotFound from '../components/404'

const Routes = () => {
   return (
      <GeneralLayout>
         <Switch>
            <PublicRoute path="/" exact component={Home} />
            <PublicRoute path="/login" exact component={Login} restricted />
            <PublicRoute path="/signup" exact component={Signup} restricted />
            <PublicRoute
               path="/forgot-password"
               exact
               component={ForgotPassword}
               restricted
            />
            <PublicRoute
               path="/reset-password/:token"
               component={ResetPassword}
               restricted
            />
            <PublicRoute path="/all-tours" exact component={AllTours} />
            <PublicRoute path="/tour/:slug" exact component={Tour} />
            <Route
               path={['/me', '/me/bookings', '/me/reviews', '/admin/tours']}
            >
               <AccountLayout>
                  <PrivateRoute path="/me" exact component={Account} />
                  <PrivateRoute
                     path="/me/bookings"
                     exact
                     component={AccountBookings}
                  />
                  <PrivateRoute
                     path="/me/reviews"
                     exact
                     component={AccountReviews}
                  />
                  <PrivateRoute
                     path="/admin/tours"
                     exact
                     component={ManageTours}
                     admin
                  />
               </AccountLayout>
            </Route>
            <PublicRoute path="/404" exact component={NotFound} />
            <PublicRoute path="*" exact component={NotFound} />
         </Switch>
      </GeneralLayout>
   )
}

export default Routes
