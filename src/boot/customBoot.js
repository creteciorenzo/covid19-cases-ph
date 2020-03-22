import wings from 'wings4'
import Chartkick from "vue-chartkick"
import Chart from "chart.js"
// "async" is optional
export default async ({
  app,
  router,
  Vue
}) => {
  Vue.use(Chartkick.use(Chart))
}
