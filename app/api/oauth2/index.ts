import { toast } from 'react-hot-toast';
import {currentAxiosClient, handleAxiosClient, intranetAxiosClient} from '../axiosClient'

const oauthApi = {
  getAccessToken: async () => {
    const response = await currentAxiosClient.get(`/api/oauth2`)

    return response
  },
}

export default oauthApi
