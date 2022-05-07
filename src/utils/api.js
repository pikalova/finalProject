
const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

class Api {
    constructor({ url, token }) {
        this._url = url;
        this._token = token;
    }

    async getData(address) {
        const responce = await fetch(`${this._url}/${address}`, {
            headers: {
                authorization: `Bearer ${this._token}`
            }
        });
        const result = await onResponce(responce);
        return result;
    }

    async addPost(data) {
        const responce = await fetch(`${this._url}/posts`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await onResponce(responce);
        return result;
    }

    async addLikes(postId) {
        const responce = await fetch(`${this._url}/posts/likes/${postId}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${this._token}`
            }
        });
        const result = await onResponce(responce);
        return result;
    }

    async deleteLikes(postId) {
        const responce = await fetch(`${this._url}/posts/likes/${postId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
            }
        });
        const result = await onResponce(responce);
        return result;
    }

    async deletePost(postId) {
        const responce = await fetch(`${this._url}/posts/${postId}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${this._token}`
            }
        });
        const result = await onResponce(responce);
        return result;
    }

   // https://api.react-learning.ru/posts/search/?query=<строка фильтрации по title>
   async searchPost(searchQuery){
    const responce = await fetch(`${this._url}/posts/search/?query=${searchQuery}`, {
        headers: {
            authorization: `Bearer ${this._token}`
        }
    });
    const result = await onResponce(responce);
    return result;
   }
}

export default Api;