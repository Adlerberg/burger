import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burger-builder-b5adf.firebaseio.com/'
});

export default instance;