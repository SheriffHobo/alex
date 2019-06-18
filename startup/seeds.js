const { User } = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = async () => {
  const salt = await bcrypt.genSalt(10);
  
  const users = [
    {
      first: 'Travis',
      last: 'Williamson',
      username: 'jobberwokker',
      email: 'travis@email.com',
      password: await bcrypt.hash('123@ertDFG', salt),
      profileImg: '',
      thumbnail: '',
      country: 'USA',
      state: 'OR',
      city: 'Portland',
    },
    {
      first: 'Jack',
      last: 'Younger',
      username: 'jackwade',
      email: 'jack@email.com',
      password: await bcrypt.hash('4RGYLE$sw3ater', salt),
      profileImg: '',
      thumbnail: '',
      country: 'USA',
      state: 'TX',
      city: 'Houston',
    },
    {
      first: 'Erik',
      last: 'Plaza',
      username: 'bearGrylls',
      email: 'erik@emial.com',
      password: await bcrypt.hash('w0keA$F^^^', salt),
      profileImg: '',
      thumbnail: '',
      country: 'USA',
      state: 'OR',
      city: 'Bend',
    },
    {
      first: 'Damon',
      last: 'Gregory',
      username: 'satansSpawn',
      email: 'damong@emial.com',
      password: await bcrypt.hash('wa#%4dai3', salt),
      profileImg: '',
      thumbnail: '',
      country: 'USA',
      state: 'CA',
      city: 'Oakland',
    },
  ];
  
  User.insertMany(users, (err, docs) => {
      if (err) throw new Error(err);
      console.log('seed users added!');
  });
}