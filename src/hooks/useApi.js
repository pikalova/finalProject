import Api from "../utils/api";

export const useApi = () => {

    const config = {
        url: "https://api.react-learning.ru",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVhNmE5NjBjZGQ3ZDNmZDUyZjgzN2EiLCJpYXQiOjE2NTAwOTI5NTEsImV4cCI6MTY4MTYyODk1MX0.M8ch7pvKTnwS7F_CbBiwpL3lVr51B28yMWLzTGz8A4U"
    }

    return new Api(config);
}