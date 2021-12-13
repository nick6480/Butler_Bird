import axios from 'axios';

const URL = 'http://localhost:4000/fetchReq/style';
const API_KEY = 'f33a484cf794d08d0148764789aaba32';

export const fetchStyle = async (query) => {
    const { data } = await axios.get(URL);

    return data;
}
