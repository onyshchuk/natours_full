import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllTours } from '../../../../store/actions/tourActions'
import ManageTourCard from './manage-tour-card'

const ManageTours = () => {
   const tours = useSelector(state => state.tours.tours)
   const dispatch = useDispatch()

   useEffect(() => {
      if (!tours) dispatch(getAllTours())
   }, [])

   return (
      <div className="managing-tours">
         <div className="card-container">
            {tours &&
               tours.map(tour => (
                  <ManageTourCard key={tour._id}>{tour.name}</ManageTourCard>
               ))}
         </div>
      </div>
   )
}

export default ManageTours
