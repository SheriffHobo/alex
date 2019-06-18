// == DOCUMENTATION ==
// credentials:
// 	email and password
// id:
// 	the mongodb ObjectId
// filter:
// 	object containing fields and search terms; example:
// 	{ name: 'treasure island', categoryName: 'movies' }
// user:
// 	object containing new user properties

export default {
	// USER
	login: credentials => {
		if (document.cookie) {
			// !!! CHECK to be sure it's an Alexandria cookie
			throw new Error('You are already logged in.');
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
					return res.json();
				});
	},
	// getMyShelves: filter => getMyShelves(filter),

	// PUBLIC
	// searchShelves: filter => getShelves(filter),
	// searchItems: filter => searchItems(filter),
}



// .then(
// 	result => {
// 	  document.cookie = `token=${result.token};`
// 	  document.cookie = `username=${result.user.username};`;
// 	  window.location.href = "index.html";
// 	},

// const token = getCookie('token');