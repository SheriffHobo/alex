import { getCookie } from '../API/cookies';
// const baseUrl = 'http://localhost:8080/api';
const baseUrl = '/api';

export default {
	// USER
	login: credentials => {
		if (document.cookie) {
			document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
			document.cookie = "firstName=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;"
			document.cookie = "_id=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;"
			document.location.reload(false);
		return Promise.resolve();
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
	externalAPIs: {
		audio: {
			base: () => 'https://itunes.apple.com/search?term=',
			params: () => '&entity=album',
			name: result => result.collectionName,
			nameFallback: result => result.trackName,
			artist: result => result.artistName,
			image: result => result.artworkUrl100,
			link: result => {
				return result.wrapperType === 'collection'
					? result.collectionViewUrl
					: result.wrapperType === 'track'
					? result.trackViewUrl
					: '';
			},
		},
		video: {
			base: () => 'https://itunes.apple.com/search?term=',
			params: () => '&entity=movie',
			name: result => result.trackName,
			nameFallback: result => result.collectionName,
			artist: result => result.artistName,
			image: result => result.artworkUrl100,
			link: result => {
				return result.wrapperType === 'collection'
					? result.collectionViewUrl
					: result.wrapperType === 'track'
					? result.trackViewUrl
					: '';
			},
		},
	},
	create: (obj, route) => {
		const token = getCookie('token');
    if (!token || token === 'undefined') {
    	return Promise.resolve({ message: 'You are not logged in.'});
    };
	
		return fetch(baseUrl + '/' + route, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': token,
			},
			body: JSON.stringify(obj),
		})
			.then(async res => {
				if (res.status !== 200) {
					throw new Error(res.status + ' ' + await res.text());
				};

				return res.json();
			});
	},
	getMyShelves: () => {
    const token = getCookie('token');
    if (!token || token === 'undefined') {
    	return Promise.resolve({ message: 'You are not logged in.'});
    };

		return fetch(`${baseUrl}/shelves/me`, {
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
	addToMyShelf: (data, shelfId) => {
		const token = getCookie('token');
    if (!token || token === 'undefined') {
    	return Promise.resolve({ message: 'You are not logged in.'});
    };

    return fetch(`${baseUrl}/items/me`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': token,
			},
			body: JSON.stringify({ data, shelfId }),
		})
			.then(async res => {
				if (res.status !== 200) {
					throw new Error(res.status + ' ' + await res.text());
				};

				return res.json();
			});
	}
}