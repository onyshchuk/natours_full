import React from 'react'

import Button from '../../misc/button'

const Welcome = () => {
   return (
      <section className="section-welcome">
         <div className="welcome__text-box">
            <h1 className="heading-primary">
               <span className="heading-primary--main">Outdoors</span>
               <span className="heading-primary--sub">
                  is where life happens
               </span>
            </h1>

            <Button
               type="link"
               linkTo="/all-tours"
               color="white"
               title="Discover our tours"
               altClass="btn--blowup btn--animated"
            />
         </div>
      </section>
   )
}

export default Welcome
