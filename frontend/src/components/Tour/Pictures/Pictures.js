import React from 'react'
import PropTypes from 'prop-types'

import { SERVER_URL } from '../../../utils/misc'

const Pictures = ({ images }) => {
   return (
      <section className="section-pictures">
         {images.map((img, i) => (
            <div key={img} className="picture-box">
               <img
                  className={`picture-box__img picture-box__img--${i + 1}`}
                  src={`${SERVER_URL}/img/tours/${img}`}
                  alt={`The Park Camper Tour ${i + 1}`}
               />
            </div>
         ))}
      </section>
   )
}

Pictures.propTypes = {
   images: PropTypes.array.isRequired,
}

export default Pictures
