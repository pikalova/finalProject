
const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(`${res.status}`)
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

    async auth(type, data){
        const responce = await fetch(`${this._url}/${type}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });
        const result = await onResponce(responce);
        return result;
    }

    async editUserData(data, token){
        const useToken = this.token || token || localStorage.token;
        const responce = await fetch(`${this._url}/users/me`,{
            method: 'PATCH',
            headers: {
                authorization : `Bearer ${useToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
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

   async editUserImg (avatar, token){
    const useToken = this.token || token || localStorage.token;
    const responce = await fetch(`${this._url}/users/me/avatar`,{
        method: "PATCH",
        headers: {
            authorization : `Bearer ${useToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(avatar),
    });
    const result = await onResponce(responce);
    return result;
   }
}

export default Api;

