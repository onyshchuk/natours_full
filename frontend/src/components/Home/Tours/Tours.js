import React, { useState, useEffect } from 'react'
import axios from 'axios'

import TourCard from '../../misc/tour-card'
import Button from '../../misc/button'
import { SERVER_URL } from '../../../utils/misc'

const Tours = () => {
   const [tours, setTours] = useState([])

   useEffect(() => {
      axios
         .get(`${SERVER_URL}/api/v1/tours?limit=3&sort=rtingsAverage`)
         .then(response => setTours(response.data.data.tours))
   }, [])

   return (
      <section className="section-tours">
         <div className="u-center-text u-margin-bottom-big">
            <h2 className="heading-secondary">Most popular tours</h2>
         </div>
         <div className="card-container">
            {tours.map(tour => (
               <TourCard tour={tour} key={tour._id} />
            ))}
         </div>
         <div className="u-center-text u-margin-top-huge">
            <Button
               type="link"
               linkTo="/all-tours"
               color="green"
               title="Discover all tours"
               altClass="btn--blowup"
            />
         </div>
      </section>
   )
}

export default Tours
