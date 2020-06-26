import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import Alert from '../../misc/alert'
import Button from '../../misc/button'
import bookTour from '../../misc/stripe'
import Review from './review'
import { SERVER_URL } from '../../../utils/misc'

const CallToAction = ({
   tourBookings,
   tourReviews,
   images,
   duration,
   tourId,
}) => {
   const [alert, setAlert] = useState(false)
   const [errorMsg, setErrorMsg] = useState('')
   const user = useSelector(state => state.user.user)

   const handleClick = () => {
      try {
         bookTour(tourId)
      } catch (e) {
         setAlert(true)
         setErrorMsg(e.message)
         setTimeout(() => {
            setAlert(false)
         }, 2000)
      }
   }

   return (
      <section className="section-cta">
         <div className="cta">
            <div className="cta__img cta__img--logo">
               <img src="/img/logo-white.png" alt="Natours logo" />
            </div>
            <img
               src={`${SERVER_URL}/img/tours/${images[1]}`}
               alt="Tour first pic"
               className="cta__img cta__img--1"
            />
            <img
               src={`${SERVER_URL}/img/tours/${images[2]}`}
               alt="Tour second pic"
               className="cta__img cta__img--2"
            />
            {tourBookings > tourReviews ? (
               <Review tourId={tourId} />
            ) : (
               <div className="cta__content">
                  <h2 className="heading-tertiary">
                     What are you waiting for ?
                  </h2>
                  <p className="cta__text">
                     {duration}
                     &nbsp;days. 1 adventure. Infinite memories. Make it yours
                     today!
                  </p>
                  {user ? (
                     <Button
                        color="green"
                        title="Book tour now !"
                        altClass="btn--blowup"
                        handleClick={handleClick}
                     />
                  ) : (
                     <Button
                        type="link"
                        color="green"
                        linkTo="/login"
                        title="Log in to book tour"
                        altClass="btn--blowup"
                     />
                  )}
               </div>
            )}
         </div>
         {alert && <Alert error failMsg={errorMsg} />}
      </section>
   )
}

CallToAction.propTypes = {
   tourBookings: PropTypes.number.isRequired,
   tourReviews: PropTypes.number.isRequired,
   images: PropTypes.array.isRequired,
   duration: PropTypes.number.isRequired,
   tourId: PropTypes.string.isRequired,
}

export default CallToAction
