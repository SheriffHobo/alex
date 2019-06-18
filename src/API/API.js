import { login, getMyShelves } from './user';

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

export default = {
	// USER
	login: credentials => login(credentials),
	getMyShelves: filter => getMyShelves(filter),

	// PUBLIC
	searchShelves: filter => getShelves(filter),
	searchItems: filter => searchItems(filter),
}

import API from '../../API/API';

credentials = {
	email: 'email@example.com',
	password: '69slutsyeahhhh',
};

API.login(credentials)
	.then(hfsdkdjfsh)
	.catch(err => console.error(err));