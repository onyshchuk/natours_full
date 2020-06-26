import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { getReviewsFromTour } from '../../store/actions/reviewActions'
import Welcome from './Welcome'
import Description from './Description'
import Picture from './Pictures'
import Mapbox from './MapBox'
import Reviews from './Reviews'
import CallToAction from './CallToAction'
import NotFound from '../404'

import { SERVER_URL } from '../../utils/misc'

const Tour = () => {
   const { slug } = useParams()
   const history = useHistory()
   const [tour, setTour] = useState(null)
   const [bookings, setBookings] = useState([])
   const [tourBookings, setTourBookings] = useState(0)
   const [tourReviews, setTourReviews] = useState(0)
   const [notFound, setNotFound] = useState(null)
   const dispatch = useDispatch()
   const reviews = useSelector(state => state.reviews.tourReviews)
   const user = useSelector(state => state.user.user)

   useEffect(() => {
      let filteredReviews = []
      if (reviews && user) {
         filteredReviews = reviews.filter(
            review => review.user._id === user._id
         )
         setTourReviews(filteredReviews.length)
      }
   }, [reviews, user])

   useEffect(() => {
      ;(async () => {
         try {
            const response = await axios.get(
               `${SERVER_URL}/api/v1/tours/slug/${slug}`
            )
            if (response.data.status === 'success') {
               setTour(response.data.data.tour)
               dispatch(getReviewsFromTour(response.data.data.tour._id))
            }
            if (response.status === 404) setNotFound(true)
         } catch (e) {
            history.push('/404')
         }
      })()
      axios
         .get(`${SERVER_URL}/api/v1/bookings/my`, { withCredentials: true })
         .then(response => {
            if (response.data.status === 'success')
               setBookings(
                  response.data.bookings.map(booking => booking.tour._id)
               )
         })
   }, [])

   useEffect(() => {
      let filteredBookings = []
      if (tour) {
         filteredBookings = bookings.filter(booking => booking === tour._id)
         setTourBookings(filteredBookings.length)
      }
   }, [tour, bookings])

   return notFound ? (
      <NotFound />
   ) : (
      <div className="tour">
         {tour && (
            <div>
               <Welcome
                  name={tour.name}
                  imageCover={tour.imageCover}
                  duration={tour.duration}
                  startLocation={tour.startLocation.description}
               />
               <Description
                  startDates={tour.startDates[0]}
                  difficulty={tour.difficulty}
                  maxGroupSize={tour.maxGroupSize}
                  ratingsAverage={tour.ratingsAverage}
                  guides={tour.guides}
                  name={tour.name}
                  description={tour.description}
               />
               <Picture images={tour.images} />
               <Mapbox locations={tour.locations} />
               <Reviews reviews={reviews} />
               <CallToAction
                  tourBookings={tourBookings}
                  tourReviews={tourReviews}
                  images={tour.images}
                  duration={tour.duration}
                  tourId={tour._id}
               />
            </div>
         )}
      </div>
   )
}

export default Tour
