import axios from 'axios';

// protected request, setiap request perlu token

// bad idea, store in cookies (web security)
const accessToken = sessionStorage.getItem('access_token');

const request = axios.create({
    baseURL: 'http://localhost:7777/',
    
    // for token
    // headers: {
    //     'authorization': accessToken
    // }
})

request.interceptors.response.use(
    (res) => res.data,
    (err) => {
        console.log(err);

        // jika token salah, maka remove token pada localStorage lalu kembali ke halaman login
        if (err.response?.status === 403) {
            localStorage.removeItem('access_token')
            window.location.href = '/'
        }
        throw new Error(err.message || 'Error')
    }
)

export default request;