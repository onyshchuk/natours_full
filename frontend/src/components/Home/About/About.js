import React from 'react'

import Button from '../../misc/button'

const About = () => {
   return (
      <section className="section-about">
         <div className="u-center-text u-margin-bottom-big">
            <h2 className="heading-secondary">
               Exciting tours for adventurous people
            </h2>
         </div>

         <div className="wrapper">
            <div className="wrapper__left">
               <h3 className="heading-quaternary u-margin-bottom-small">
                  You&apos;re going to fall in love with nature
               </h3>
               <p className="paragraph">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab id
                  esse incidunt beatae quaerat. Porro inventore unde repellendus
                  eaque tempora necessitatibus, magni veritatis officiis
                  explicabo et dicta expedita? Ea, eos?
               </p>
               <h3 className="heading-quaternary u-margin-bottom-small">
                  Live adventures like you never have before
               </h3>
               <p className="paragraph">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab id
                  esse incidunt beatae quaerat. Porro inventore unde repellendus
                  eaque tempora.
               </p>

               <Button
                  linkTo="/all-tours"
                  type="text-link"
                  color="green"
                  title="Learn more &rarr;"
               />
            </div>
            <div className="wrapper__right">
               <div className="composition">
                  <img
                     srcSet="./img/nat-1.jpg 300w, ./img/nat-1-large.jpg 1000w"
                     sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 18.75em"
                     alt="view 1"
                     className="composition__photo composition__photo--p1"
                     src="./img/nat-1-large.jpg"
                  />

                  <img
                     srcSet="./img/nat-2.jpg 300w, ./img/nat-2-large.jpg 1000w"
                     sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 18.75em"
                     alt="view 2"
                     className="composition__photo composition__photo--p2"
                     src="./img/nat-2-large.jpg"
                  />

                  <img
                     srcSet="./img/nat-3.jpg 300w, ./img/nat-3-large.jpg 1000w"
                     sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 18.75em"
                     alt="view 3"
                     className="composition__photo composition__photo--p3"
                     src="./img/nat-3-large.jpg"
                  />
               </div>
            </div>
         </div>
      </section>
   )
}

export default About
