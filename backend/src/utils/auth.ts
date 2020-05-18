import expressJWT from 'express-jwt'
import Config from '../config'
export default expressJWT({
  secret: Config.JWT_PRIVATE_KEY,
  credentialsRequired: true,
}).unless({
  path: ['/login'],
})
