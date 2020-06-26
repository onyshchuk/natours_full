import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'

const Mapbox = ({ locations }) => {
   mapboxgl.accessToken =
      'pk.eyJ1Ijoib251ayIsImEiOiJjandybG52MWQwMzh6NDlzNzFtc2VyeTNuIn0.4MGXzgp-J20aUqvIED7cag'

   useEffect(() => {
      const map = new mapboxgl.Map({
         container: 'mapbox',
         style: 'mapbox://styles/onuk/ck20kesxw18g21cpmd6vt6hlr',
         scrollZoom: false,
      })

      const bounds = new mapboxgl.LngLatBounds()

      locations.forEach(loc => {
         // Create marker
         const el = document.createElement('div')
         el.className = 'mapboxgl-marker'

         // Add marker
         new mapboxgl.Marker({ element: el, anchor: 'bottom' })
            .setLngLat(loc.coordinates)
            .addTo(map)

         // Add popup
         new mapboxgl.Popup({
            offset: 30,
         })
            .setLngLat(loc.coordinates)
            .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
            .addTo(map)

         // Extend map bounds to include current location
         bounds.extend(loc.coordinates)
      })

      map.fitBounds(bounds, {
         padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100,
         },
      })
   }, [])

   return (
      <section className="section-mapbox">
         <div id="mapbox" />
      </section>
   )
}

Mapbox.propTypes = {
   locations: PropTypes.array.isRequired,
}

export default Mapbox
