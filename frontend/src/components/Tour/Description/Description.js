import React from 'react'
import PropTypes from 'prop-types'

import OverviewBox from './overview-box'

import { SERVER_URL } from '../../../utils/misc'

const Description = ({
   startDates,
   difficulty,
   maxGroupSize,
   ratingsAverage,
   guides,
   name,
   description,
}) => {
   const date = new Date(startDates).toLocaleString('en-us', {
      month: 'long',
      year: 'numeric',
   })
   const paragraphs = description.split('\n')
   return (
      <section className="section-description">
         <div className="overview-box">
            <div>
               <div className="overview-box__group">
                  <h2 className="heading-tertiary u-margin-bottom-medium">
                     Quick facts
                  </h2>
                  <OverviewBox label="Next date" text={date} icon="calendar" />
                  <OverviewBox
                     label="Difficulty"
                     text={difficulty}
                     icon="trending-up"
                  />
                  <OverviewBox
                     label="Participants"
                     text={`${maxGroupSize} people`}
                     icon="user"
                  />
                  <OverviewBox
                     label="Rating"
                     text={`${ratingsAverage} / 5`}
                     icon="star"
                  />
               </div>
               <div className="overview-box__group">
                  <h2 className="heading-tertiary u-margin-bottom-medium">
                     Your tour guides
                  </h2>
                  {guides.map(guide => (
                     <div className="overview-box__detail" key={guide._id}>
                        <img
                           className="overview-box__img"
                           src={`${SERVER_URL}/img/users/${guide.photo}`}
                           alt={guide.name}
                        />
                        {guide.role === 'lead-guide' && (
                           <span className="overview-box__label">
                              Lead guide
                           </span>
                        )}
                        {guide.role === 'guide' && (
                           <span className="overview-box__label">
                              Tour guide
                           </span>
                        )}
                        <span className="overview-box__text">{guide.name}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
         <div className="description-box">
            <h2 className="heading-tertiary u-margin-bottom-medium">
               {`About ${name} tour`}
            </h2>
            {paragraphs.map(paragraph => (
               <p key={paragraph} className="description__text">
                  {paragraph}
               </p>
            ))}
         </div>
      </section>
   )
}

Description.propTypes = {
   startDates: PropTypes.string.isRequired,
   difficulty: PropTypes.string.isRequired,
   maxGroupSize: PropTypes.number.isRequired,
   ratingsAverage: PropTypes.number.isRequired,
   guides: PropTypes.array.isRequired,
   name: PropTypes.string.isRequired,
   description: PropTypes.string.isRequired,
}

export default Description
