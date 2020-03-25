import axios from 'axios'

const http1 = axios.create({
  baseURL: 'https://corona.lmao.ninja'
});
const http2 = axios.create({
  baseURL: 'https://coronavirus-ph-api.now.sh'
});
export default {
  async phCases() {
    const {
      data
    } = await http1.get('/countries/Philippines')
    return data
  },

  async getTimeline() {
    const {
      data
    } = await http1.get('/historical/Philippines')
    return data
  },

  async getSummaryCase() {
    const {
      data
    } = await http2.get('/cases')
    return data
  },

  async getCheckpoints() {
    const {
      data
    } = await http2.get('/mm-checkpoints')
    return data
  },

  async getTestResults() {
    const {
      data
    } = await http2.get('/test-results')
    return data
  }
}
