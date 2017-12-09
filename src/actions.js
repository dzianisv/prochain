import config from '@/config.json'
import Axios from 'axios'

export default {
  vote (petitionId) {
    if (!localStorage.getItem(petitionId)) {
      return Axios.put(`${config.apiEndpoint}/petition/${petitionId}`).then(r => {
        localStorage.setItem(petitionId, true)
        console.log('you vote for', petitionId, 'has been registered')
      })
    }
    return Promise.resolve()
  }
}
