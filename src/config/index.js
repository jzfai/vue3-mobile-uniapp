//index.js
import development from './development'
import production from './production'

export default {
  development,
  production
}[import.meta.env.MODE || 'development']
