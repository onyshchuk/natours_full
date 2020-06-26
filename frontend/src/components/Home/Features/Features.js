import React from 'react'

import FeatureBox from './feature-box'

const Features = () => {
   return (
      <section className="section-features">
         <div className="wrapper">
            <FeatureBox icon="icon-basic-world" heading="Explore the world">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab id
               esse incidunt beatae quaerat.
            </FeatureBox>
            <FeatureBox icon="icon-basic-compass" heading="Meet nature">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab id
               esse incidunt beatae quaerat.
            </FeatureBox>
            <FeatureBox icon="icon-basic-map" heading="Find a way">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab id
               esse incidunt beatae quaerat.
            </FeatureBox>
            <FeatureBox icon="icon-basic-heart" heading="Live a healthier life">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab id
               esse incidunt beatae quaerat.
            </FeatureBox>
         </div>
      </section>
   )
}

export default Features
