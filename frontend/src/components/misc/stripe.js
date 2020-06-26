import axios from 'axios'

import { SERVER_URL } from '../../utils/misc'

// eslint-disable-next-line no-undef
const stripe = Stripe('pk_test_Pa9ZPWGpgwE4uoqyaa21SMuX00q8x85C6G')

const bookTour = async tourId => {
   try {
      // Get checkout session from API
      const session = await axios(
         `${SERVER_URL}/api/v1/bookings/checkout-session/${tourId}`,
         { withCredentials: true }
      )

      // Create checkout form + charge credit card
      await stripe.redirectToCheckout({
         sessionId: session.data.session.id,
      })
   } catch (err) {
      throw new Error(err)
   }
}

export default bookTour
