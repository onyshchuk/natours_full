import React from 'react'
import { Element } from 'react-scroll'

import Welcome from './Welcome'
import About from './About'
import Features from './Features'
import Tours from './Tours'
import SignUp from './SignUp'

const Home = () => {
   return (
      <div className="home">
         <Element name="welcome">
            <Welcome />
         </Element>
         <Element name="about">
            <About />
         </Element>
         <Element name="features">
            <Features />
         </Element>
         <Element name="tours">
            <Tours />
         </Element>
         <Element name="signup">
            <SignUp />
         </Element>
      </div>
   )
}

export default Home
