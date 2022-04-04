//index.js
import development from './development'
import production from './production'

export default {
  development,
  production
}['development' || import.meta.env.MODE]
