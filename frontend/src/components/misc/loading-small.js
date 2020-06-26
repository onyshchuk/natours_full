import React from 'react'

const LoadingSmall = () => {
   return (
      <svg
         className="loading-small"
         id="layer1"
         data-name="layer1"
         xmlns="http://www.w3.org/2000/svg"
         xlink="http://www.w3.org/1999/xlink"
         viewBox="0 0 300 150"
      >
         <defs>
            <linearGradient
               id="grad-1"
               x1="0"
               y1="0"
               x2="300"
               y2="150"
               gradientUnits="userSpaceOnUse"
            >
               <stop offset="0" stopColor="#7ed56f" />
               <stop offset="1" stopColor="#2bb584" />
            </linearGradient>
         </defs>
         <title>green logo</title>
         <polyline
            className="cls-1"
            points="3,3 225,147 150,8 75,147 225,147 297,3 75,147 3,3"
         />
      </svg>
   )
}

export default LoadingSmall
