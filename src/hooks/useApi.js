import Api from "../utils/api";

export const useApi = () => {

    const config = {
        url: "https://api.react-learning.ru",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVlMDEzNjBjZGQ3ZDNmZDUyZjg1MDgiLCJpYXQiOjE2NTAzMjc5NjAsImV4cCI6MTY4MTg2Mzk2MH0.IWjl0KoxTx5zfl6Q6NsdobLYXe-WxMdysnWvTO3QXIg"
    }

    return new Api(config);
}