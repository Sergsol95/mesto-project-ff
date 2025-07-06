const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-41',
  headers: {
    authorization: '31a4b30b-4ea6-4668-a7b5-385db56e460f',
    'Content-Type': 'application/json'
  }
};

function checkResponse(res) {
  return res.ok
    ? res.json()
    : Promise.reject(`Ошибка: ${res.status}`);
}

function request(endpoint, { method = 'GET', body, headers = {} } = {}) {
  const options = { method, headers: { ...config.headers, ...headers } };
  if (body) options.body = JSON.stringify(body);
  return fetch(`${config.baseUrl}${endpoint}`, options).then(checkResponse);
}

export const getUserInfo    = () => request('/users/me');
export const updateUserInfo = (name, about) =>
  request('/users/me', { method: 'PATCH', body: { name, about } });
export const updateAvatar   = (avatar) =>
  request('/users/me/avatar', { method: 'PATCH', body: { avatar } });

export const getInitialCards = () => request('/cards');
export const addCard         = (name, link) =>
  request('/cards', { method: 'POST', body: { name, link } });
export const deleteCardApi   = (cardId) =>
  request(`/cards/${cardId}`, { method: 'DELETE' });

export const putLike    = (cardId) =>
  request(`/cards/${cardId}/likes`, { method: 'PUT' });
export const deleteLike = (cardId) =>
  request(`/cards/${cardId}/likes`, { method: 'DELETE' });
