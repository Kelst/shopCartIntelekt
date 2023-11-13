
import axios from 'axios'


export default async function  fetchData(city) {
     
    const apiUrl = 'https://api.novaposhta.ua/v2.0/json/';
    
    const requestData = {
      apiKey: '41249e216ac722eda29376114338da90',
      modelName: 'Address',
      calledMethod: 'getWarehouses',
      methodProperties: {
        CityName: city
      }
    };
    let resp= await axios.post(apiUrl, requestData)
   return resp.data.data;

 }