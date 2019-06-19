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
			return Promise.resolve('You are already logged in.');
		}
	
		return fetch('http://localhost:8080/api/auth', {
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
					}
					const result = res.json();

					document.cookie = `token=${result.token};`;
					document.cookie = `username=${result.user.username};`;

					return result;
				})
	},
	loginWithToken: token => {
		return fetch('http://localhost:8080/api/auth', {
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
				})
	},
	signUp: info => {

	},
	// getMyShelves: filter => {},

	// PUBLIC
	// searchShelves: filter => {},
	// searchItems: filter => {},
}
