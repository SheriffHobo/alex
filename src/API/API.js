import { getCookie } from '../API/cookies';
const baseUrl = 'http://localhost:8080/api';

// == DOCUMENTATION ==
// credentials:
// 	email and password
// id:
// 	the mongodb ObjectId
// info:
// 	user signup info
// filter:
// 	object containing fields and search terms; example:
// 	{ name: 'treasure island', categoryName: 'movies' }
// user:
// 	object containing new user properties

export default {
	// USER
	login: credentials => {
		if (document.cookie) {
			return Promise.resolve({ message: 'You are already logged in.'});
		};
	
		return fetch(baseUrl + '/auth', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
		})
			.then(async res => {
				if (res.status !== 200) {
					throw new Error(res.status + ' ' + await res.text());
				};
				
				return res.json();
			});
	},
	loginWithToken: () => {
		const token = getCookie('token');
    if (!token || token === 'undefined') return Promise.resolve();

		return fetch(baseUrl + '/auth', {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': token,
			},
		})
			.then(async res => {
				if (res.status !== 200) {
					throw new Error(res.status + ' ' + await res.text());
				};

				return res.json();
			});
	},
	signUp: user => {
		if (document.cookie) {
			return Promise.resolve({ message: 'You are already logged in.'});
		};
	
		return fetch(baseUrl + '/users', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		})
			.then(async res => {
				if (res.status !== 200) {
					throw new Error(res.status + ' ' + await res.text());
				};

				return res.json();
			});
	},
	newItem: (item, itemType) => {
		const token = getCookie('token');
    if (!token || token === 'undefined') {
    	return Promise.resolve({ message: 'You are not logged in.'});
    };
	
		return fetch(baseUrl + '/' + itemType, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': token,
			},
			body: JSON.stringify(item),
		})
			.then(async res => {
				if (res.status !== 200) {
					throw new Error(res.status + ' ' + await res.text());
				};

				return res.json();
			});
	},
	search: (collection, query) => {
    const token = getCookie('token');
    if (!token || token === 'undefined') {
    	return Promise.resolve({ message: 'You are not logged in.'});
    };

		if (!Object.keys(query).length || !collection) {
    	return Promise.resolve({ message: 'Invalid search.' });
    };

    let queryString = '';
    for (let key in query) {
    	queryString += `&${key}=${query[key]}`;
    }

    if (queryString) queryString = '?' + queryString.slice(1);

		return fetch(`${baseUrl}/${collection}${queryString}`, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': token,
			},
		})
			.then(async res => {
				if (res.status !== 200) {
					throw new Error(res.status + ' ' + await res.text());
				};

				return res.json();
			});
	},
}
