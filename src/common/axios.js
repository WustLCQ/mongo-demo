import axios from 'axios';

const instance = axios.create();

instance.interceptors.response.use((res) => {
    if (res.status === 200) {
        return res.data;
    } else {
        return Promise.reject(res.statusText);
    }
});

export default instance;