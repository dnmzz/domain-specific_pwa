import axios from "axios";

const generic_data = {
    endpoint: 'https://locative-displays-server.herokuapp.com/landingPageDisplays/'
}

export const getDisplaysByContext = (context) => {
    return axios.get(generic_data.endpoint + context);
}
