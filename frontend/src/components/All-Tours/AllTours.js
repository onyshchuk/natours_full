import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import TourCard from '../misc/tour-card'
import { getAllTours } from '../../store/actions/tourActions'

const AllTours = () => {
   const tours = useSelector(state => state.tours.tours)
   const dispatch = useDispatch()

   useEffect(() => {
      if (!tours) dispatch(getAllTours())
   }, [])

   return (
      <div className="all-tours">
         <div className="card-container card-container--all-tours">
            {tours &&
               tours.map(tour => <TourCard tour={tour} key={tour._id} />)}
         </div>
      </div>
   )
}

export default AllTours
