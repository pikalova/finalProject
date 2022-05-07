
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

    async deleteLikes(itemId) {
        const responce = await fetch(`${this._url}/posts/likes/${itemId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
            }
        });
        const result = await onResponce(responce);
        return result;
    }

    async getPosts(itemId) {
        const requestURL = itemId ? `${this._url}/posts/${itemId}` : `${this._url}/posts`
        const responce = await fetch(requestURL, {
            headers: {
                authorization: `Bearer ${this._token}`
            }
        });
        const result = await onResponce(responce);
        return result;
    }

    async deletePost(itemId) {
        const responce = await fetch(`${this._url}/posts/${itemId}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${this._token}`
            }
        });
        const result = await onResponce(responce);
        return result;
    }
}

export default Api;

