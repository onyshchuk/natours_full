import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import throttle from 'lodash.throttle'
import PropTypes from 'prop-types'
import '../sass/main.scss'

import { authUser } from '../store/actions/userActions'
import { removeAlert } from '../store/actions/utilsActions'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Alert from '../components/misc/alert'

const GeneralLayout = ({ children }) => {
   const [screenWidth, setScreenWidth] = useState(0)
   const [scrollY, setScrollY] = useState(0)
   const dispatch = useDispatch()
   const { pathname } = useLocation()

   const alert = useSelector(state => state.utils.alert)

   useEffect(() => {
      if (alert)
         setTimeout(() => {
            dispatch(removeAlert())
         }, 1500)
   }, [alert])

   const breakpoints = {
      desktop: 1170,
      tablet: 900,
      tabMin: 700,
      mobile: 600,
   }

   const updateScrollY = () => setScrollY(window.scrollY)

   const updateScreenWidth = () =>
      throttle(() => {
         setScreenWidth(window.innerWidth)
      }, 200)

   useEffect(() => {
      updateScreenWidth()()
      updateScrollY()
      window.addEventListener('resize', updateScreenWidth())
      window.addEventListener('scroll', updateScrollY)

      return () => {
         window.removeEventListener('resize', updateScreenWidth())
         window.removeEventListener('scroll', updateScrollY)
      }
   }, [])

   useEffect(() => {
      dispatch(authUser())
   }, [pathname])

   return (
      <div className="App">
         <Header scrollY={scrollY} />
         <main
            id="main"
            screenwidth={screenWidth}
            scrolly={scrollY}
            breakpoints={breakpoints}
         >
            {children}
         </main>
         <Footer />
         {alert && <Alert error={alert.isErr} msg={alert.msg} />}
      </div>
   )
}

GeneralLayout.propTypes = {
   children: PropTypes.object.isRequired,
}

export default GeneralLayout
