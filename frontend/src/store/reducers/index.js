import { combineReducers } from 'redux'
import user from './userReducer'
import tours from './tourReducer'
import reviews from './reviewReducer'
import utils from './utilsReducer'

const rootReducer = combineReducers({
   user,
   tours,
   reviews,
   utils,
})

export default rootReducer
