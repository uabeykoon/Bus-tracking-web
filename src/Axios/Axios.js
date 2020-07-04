import axios from 'axios';


const instanse = axios.create({
    baseURL:"https://bus-track-8b429.firebaseio.com/"
});

export default instanse;