import { GET_ALL_TOURS } from '../actions/types'

export default (state = {}, action) => {
   switch (action.type) {
      case GET_ALL_TOURS:
         return { ...state, tours: action.payload }
      default:
         return state
   }
}
