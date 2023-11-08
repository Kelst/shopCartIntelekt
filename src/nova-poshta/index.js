import axios from "axios";

export const API_URL=`https://api.novaposhta.ua/v2.0/json/`
const $api_nova=axios.create({
    baseURL:API_URL,

})
export default $api_nova