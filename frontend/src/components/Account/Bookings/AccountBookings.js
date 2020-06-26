import React, { useState, useEffect } from 'react'
import axios from 'axios'

import BookingCard from './booking-card'

import { SERVER_URL } from '../../../utils/misc'

const AccountBookings = () => {
   const [bookings, setBookings] = useState([])

   useEffect(() => {
      axios
         .get(`${SERVER_URL}/api/v1/bookings/my`, { withCredentials: true })
         .then(response => setBookings(response.data.bookings))
   }, [])

   return (
      <div className="user-view__content">
         <div className="user-view__bookings">
            {bookings.map(booking => (
               <BookingCard
                  key={booking._id}
                  image={booking.tour.imageCover}
                  name={booking.tour.name}
                  slug={booking.tour.slug}
                  bookingDate={booking.createdAt}
                  price={booking.price}
                  paid={booking.paid}
               />
            ))}
         </div>
      </div>
   )
}

export default AccountBookings
