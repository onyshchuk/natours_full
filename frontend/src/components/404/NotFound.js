import React from 'react'

const NotFound = () => {
   return (
      <div className="not-found">
         <div className="not-found__message">
            <h3>
               <span className="not-found__primary-message">404</span>
               <span className="not-found__secondary-message">
                  Page not found
               </span>
            </h3>
            <p className="not-found__text-message">
               The Page you are looking for does not exist or some other error
               occurred
            </p>
         </div>
      </div>
   )
}

export default NotFound
