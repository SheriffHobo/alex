const { User } = require('../models/user');
const { Category } = require('../models/category');
const { Shelf } = require('../models/shelf');
const { Item } = require('../models/item');
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

async function seedUsers() {
  const salt = await bcrypt.genSalt(10);
  
  const users = [
    {
      firstName: 'Travis',
      lastName: 'Williamson',
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
      firstName: 'Jack',
      lastName: 'Younger',
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
      firstName: 'Erik',
      lastName: 'Plaza',
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
      firstName: 'Damon',
      lastName: 'Gregory',
      username: 'satansSpawn',
      email: 'damong@emial.com',
      password: await bcrypt.hash('wa#%4dai3', salt),
      profileImg: '',
      thumbnail: '',
      country: 'USA',
      state: 'CA',
      city: 'Oakland',
    },
    {
      firstName: 'Test',
      lastName: 'User',
      username: 'spartacus',
      email: 'test@hello.world',
      password: await bcrypt.hash('postHAST3!', salt),
      profileImg: '',
      thumbnail: '',
      country: 'USA',
      state: 'OK',
      city: 'Tulsa',
    },
  ];

  return User.insertMany(users);
}

async function seedCategories() {
  const categories = [
    {
      name: 'Toys',
      description: 'A toy is an item that is used in play, especially one designed for such use.',
      subcategories: ['Figurines','Other Vehicles','Dolls','Blocks','Robots','Executive','Puzzles','Science','Wooden','Tin','Cars','Trains','Trucks','Heavy Construction Equipment','Educational','Art and Creative Toys','Electronic','Dangerous','Food','Games','Jets and Planes','Balls','Marbles','Wearables','Assembly','Music','Noisemakers','Skill','Weapons',],
      image: '',
      thumbnail: '',
    },
    {
      name: 'Watches',
      description: 'A toy is an item that is used in play, especially one designed for such use.',
      subcategories: ['Chronograph','Time Only','Dress','Sports','Diving','Military','Aviation','Digital - Electronic','Digital - Mechanical','Quartz','Automatic','Manual Wind','Luxury','Toy','Collectible','Perpetual Calendar','Unusual Complications','Moon Phase','Sun and Moon','World Time','GMT','GPS','Solar','Atomic','Field','Homage','Alarm','Minute Repeater','LED','Equation of Time','Tourbillon','Carousel','Calculator','Pocket','Fashion','Chiming'],
      image: '',
      thumbnail: '',
    },
    {
      name: 'Pens',
      description: 'A toy is an item that is used in play, especially one designed for such use.',
      subcategories: ['Fountain','Ballpoint','Fude','Brush','Dip','Glass','Multifunction','Technical','Drawing','Calligraphy','Markers','Inkless','Lettering','Erasable','Other','Ink','Weapons',],
      image: '',
      thumbnail: '',
    },
    {
      name: 'Other',
      description: 'Enter a custom category.',
      image: '',
      thumbnail: '',
    },
  ];

  return Category.insertMany(categories);
}

async function seedShelves() {
  // seed users and categories must be in before
  const user = await User.findOne({ email: 'test@hello.world' });
  if (!user) throw new Error('seedShelves requires users and categories');
  
  const toyCat = await Category.findOne({ name: 'Toys' });
  if (!toyCat) throw new Error('seed shelves is out of order');

  const otherCat = await Category.findOne({ name: 'Other' });
  const watchCat = await Category.findOne({ name: 'Watches' });
  const penCat = await Category.findOne({ name: 'Pens' });


  const userId = user._id;
  const otherCatId = otherCat._id;
  const watchCatId = watchCat._id;

  const shelves = [
    {
      name: 'Shelf One',
      description: 'Description of shelf one, which contains some items and is super cool and all that.',
      categoryName: 'Figurines',
      categoryId: toyCat._id,
      private: false,
      nsfw: false,
      image: '',
      userId,
    },
    {
      name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis quam sit amet enim rutrum, tincidunt convallis mi ullamcorp',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis quam sit amet enim rutrum, tincidunt convallis mi ullamcorper. Mauris ut eros eros. Praesent imperdiet, ex at feugiat imperdiet, ex elit aliquam dolor, consectetur hendrerit nunc nisl non leo. Suspendisse volutpat tristique erat, quis dignissim neque posuere eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum sit amet nibh neque. Etiam vel mi lectus. Sed magna lorem, consectetur id elit eu, aliquam rutrum urna. Phasellus vel vehicula ligula. Aenean nibh nibh, ultrices sit amet hendrerit vitae, aliquet vel metus. Morbi convallis semper mauris. Nunc posuere iaculis egestas. Donec suscipit aliquet nisl ut elementum. Praesent eu nisl vitae ex malesuada vulputate. Donec scelerisque ultricies viverra. Duis porta felis faucibus purus laoreet, at bibendum nulla congue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi commodo, est ac euismod pretium, elit libero laoreet ante, ut tincidunt leo magna ac erat. Etiam id erat sed massa bibendum mollis a vel dolor. Sed a ullamcorper augue. Nullam sit amet sapien vitae turpis aliquam consequat. Vivamus convallis, magna quis finibus condimentum, ante dolor porttitor nibh, consectetur scelerisque arcu ipsum maximus neque. Donec viverra magna quis consequat tristique. In dapibus molestie lacinia. Duis eu sollicitudin turpis. Pellentesque sagittis pellentesque fringilla. Donec sodales ante a justo congue maximus. In non lorem tincidunt, eleifend mi et, aliquam purus. Donec imperdiet consectetur erat, vel lacinia turpis hendrerit eget. Quisque ac pulvinar mi. Cras bibendum tortor quam, sed maximus lacus facilisis vitae. Donec justo diam, iaculis a malesuada varius, vulputate vel libero. Nullam accumsan nibh tincidunt, consequat turpis vel, cursus arcu. Integer eu augue non metus suscipit eleifend. Duis tempus at metus a accumsan. Cras cursus, nisl accumsan molestie consequat, metus erat sodales metus, at sodales orci erat sed augue. Fusce vel egestas magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras in metus tellus. Vestibulum aliquet egestas justo, vitae lobortis justo vestibulum at. Nunc varius ultrices sem, eget cursus enim aliquam vel. Maecenas nunc eros, rutrum id egestas ac, eleifend id turpis. Vivamus non diam id purus ultrices condimentum. Etiam commodo a nisl efficitur sodales. Suspendisse lobortis felis velit, convallis consectetur velit vulputate et. Cras volutpat dapibus ornare. Phasellus vestibulum molestie sagittis. Sed elementum, lacus ac commodo pretium, tortor dui aliquet arcu, at fringilla nisi orci vitae lectus. Vivamus malesuada leo sed orci facilisis dapibus. Morbi sed commodo turpis. Nulla id gravida ipsum. Mauris sodales sem et bibendum tristique. Donec porta, justo sit amet rutrum commodo, nisl ante suscipit ligula, eget eleifend nisl ex congue urna. Ut ut dapibus augue. Etiam at congue purus. Maecenas dapibus mauris sed sem auctor, et scelerisque ex placerat. Nulla auctor lacinia massa ac hendrerit. Etiam non nibh ut ante lacinia auctor at ac leo. Mauris id quam nulla. Morbi ultricies non nibh sed sagittis. Phasellus tellus risus, hendrerit ut neque eu, vestibulum dignissim purus. Maecenas metus tortor, scelerisque in dui ut, semper feugiat felis. In ultrices ultrices ex non vestibulum. Vivamus ac sapien at massa gravida fringilla eget vitae eros. Pellentesque vulputate tempus ante eget finibus. Vestibulum et libero id tellus fermentum interdum. In tristique eleifend eros a placerat. Aenean mattis posuere augue, lobortis vehicula nibh iaculis non. Proin ante eros, varius at odio vitae, convallis maximus justo. In at diam vel leo posuere ornare. Mauris id ultricies velit. Cras eget tincidunt dui, at interdum quam. Vivamus cursus, metus in feugiat tincidunt, neque sapien blandit justo, sed ultricies sem ante tempor mi. Ut tincidunt, nunc at volutpat egestas, tellus odio mollis ante, non hendrerit purus enim in purus.',
      categoryName: 'Other',
      categoryId: otherCatId,
      customCategory: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis quam sit amet enim rutrum, tincidunt convallis mi ullamcorp',
      private: false,
      nsfw: false,
      image: '',
      userId,
    },
    {
      name: 'Violet Ray Devices',
      description: 'A violet ray is an antique medical appliance used during the early 20th century to discharge in electrotherapy.',
      categoryName: 'Other',
      categoryId: otherCatId,
      customCategory: 'Antique Medical Devices',
      private: false,
      nsfw: false,
      image: '',
      userId,
    },
    {
      name: 'Playboys',
      description: "Grandpa's nudie mags from the 60s.",
      categoryName: 'Other',
      categoryId: otherCatId,
      customCategory: 'Magazines',
      private: false,
      nsfw: true,
      image: '',
      userId,
    },
    {
      name: 'Toenail Clippings',
      description: "Nobody needs to know...",
      categoryName: 'Other',
      categoryId: otherCatId,
      customCategory: 'keratin',
      private: true,
      nsfw: false,
      image: '',
      userId,
    },
    {
      name: 'My Fountain Pens',
      description: "Collected these over the years here and there.",
      categoryName: 'Pens',
      categoryId: penCat._id,
      private: false,
      nsfw: false,
      image: '',
      userId,
    },
    {
      name: 'My Watches',
      description: "description of watch collection",
      categoryName: 'Watches',
      categoryId: watchCatId,
      private: false,
      nsfw: false,
      image: '',
      userId,
    },
  ];

  return Shelf.insertMany(shelves);
}

async function seedItems() {
  // Shelves must be in before
  const watchShelf = await Shelf.findOne({ categoryName: 'Watches' });
  if (!watchShelf) throw new Error('seedItems requires shelves');
  
  const user = await User.findOne({ email: 'test@hello.world' });
  const otherCat = await Category.findOne({ name: 'Other' });
  const watchCat = await Category.findOne({ name: 'Watches' });
  const testShelf = await Shelf.findOne({ name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis quam sit amet enim rutrum, tincidunt convallis mi ullamcorp' });
  const violetShelf = await Shelf.findOne({ name: 'Violet Ray Devices' });
  const toeShelf = await Shelf.findOne({ name: 'Toenail Clippings' });

  const userId = user._id;
  const watchShelfId = watchShelf._id;
  const otherCatId = otherCat._id;
  const watchCatId = watchCat._id;

  const items = [
    {
      name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis quam sit amet enim rutrum, tincidunt convallis mi ullamcorp',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis quam sit amet enim rutrum, tincidunt convallis mi ullamcorper. Mauris ut eros eros. Praesent imperdiet, ex at feugiat imperdiet, ex elit aliquam dolor, consectetur hendrerit nunc nisl non leo. Suspendisse volutpat tristique erat, quis dignissim neque posuere eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum sit amet nibh neque. Etiam vel mi lectus. Sed magna lorem, consectetur id elit eu, aliquam rutrum urna. Phasellus vel vehicula ligula. Aenean nibh nibh, ultrices sit amet hendrerit vitae, aliquet vel metus. Morbi convallis semper mauris. Nunc posuere iaculis egestas. Donec suscipit aliquet nisl ut elementum. Praesent eu nisl vitae ex malesuada vulputate. Donec scelerisque ultricies viverra. Duis porta felis faucibus purus laoreet, at bibendum nulla congue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi commodo, est ac euismod pretium, elit libero laoreet ante, ut tincidunt leo magna ac erat. Etiam id erat sed massa bibendum mollis a vel dolor. Sed a ullamcorper augue. Nullam sit amet sapien vitae turpis aliquam consequat. Vivamus convallis, magna quis finibus condimentum, ante dolor porttitor nibh, consectetur scelerisque arcu ipsum maximus neque. Donec viverra magna quis consequat tristique. In dapibus molestie lacinia. Duis eu sollicitudin turpis. Pellentesque sagittis pellentesque fringilla. Donec sodales ante a justo congue maximus. In non lorem tincidunt, eleifend mi et, aliquam purus. Donec imperdiet consectetur erat, vel lacinia turpis hendrerit eget. Quisque ac pulvinar mi. Cras bibendum tortor quam, sed maximus lacus facilisis vitae. Donec justo diam, iaculis a malesuada varius, vulputate vel libero. Nullam accumsan nibh tincidunt, consequat turpis vel, cursus arcu. Integer eu augue non metus suscipit eleifend. Duis tempus at metus a accumsan. Cras cursus, nisl accumsan molestie consequat, metus erat sodales metus, at sodales orci erat sed augue. Fusce vel egestas magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras in metus tellus. Vestibulum aliquet egestas justo, vitae lobortis justo vestibulum at. Nunc varius ultrices sem, eget cursus enim aliquam vel. Maecenas nunc eros, rutrum id egestas ac, eleifend id turpis. Vivamus non diam id purus ultrices condimentum. Etiam commodo a nisl efficitur sodales. Suspendisse lobortis felis velit, convallis consectetur velit vulputate et. Cras volutpat dapibus ornare. Phasellus vestibulum molestie sagittis. Sed elementum, lacus ac commodo pretium, tortor dui aliquet arcu, at fringilla nisi orci vitae lectus. Vivamus malesuada leo sed orci facilisis dapibus. Morbi sed commodo turpis. Nulla id gravida ipsum. Mauris sodales sem et bibendum tristique. Donec porta, justo sit amet rutrum commodo, nisl ante suscipit ligula, eget eleifend nisl ex congue urna. Ut ut dapibus augue. Etiam at congue purus. Maecenas dapibus mauris sed sem auctor, et scelerisque ex placerat. Nulla auctor lacinia massa ac hendrerit. Etiam non nibh ut ante lacinia auctor at ac leo. Mauris id quam nulla. Morbi ultricies non nibh sed sagittis. Phasellus tellus risus, hendrerit ut neque eu, vestibulum dignissim purus. Maecenas metus tortor, scelerisque in dui ut, semper feugiat felis. In ultrices ultrices ex non vestibulum. Vivamus ac sapien at massa gravida fringilla eget vitae eros. Pellentesque vulputate tempus ante eget finibus. Vestibulum et libero id tellus fermentum interdum. In tristique eleifend eros a placerat. Aenean mattis posuere augue, lobortis vehicula nibh iaculis non. Proin ante eros, varius at odio vitae, convallis maximus justo. In at diam vel leo posuere ornare. Mauris id ultricies velit. Cras eget tincidunt dui, at interdum quam. Vivamus cursus, metus in feugiat tincidunt, neque sapien blandit justo, sed ultricies sem ante tempor mi. Ut tincidunt, nunc at volutpat egestas, tellus odio mollis ante, non hendrerit purus enim in purus.',
      paid: '0.25',
      shelfId: testShelf._id,
      categoryName: 'Other',
      categoryId: otherCatId,
      customCategory: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis quam sit amet enim rutrum, tincidunt convallis mi ullamcorp',
      private: false,
      nsfw: false,
      quantity: 1,
      currentlyOwn: true,
      tags: ['tag1','tag2','tag3','tag4','tag5'],
      // masterItemId: ,
      // masterItemSource: ,
      // masterItemLink: ,
      userId,
    },
    {
      name: 'Cartier Tank',
      description: 'In gold with alligator strap.',
      paid: '3300',
      shelfId: watchShelfId,
      categoryName: 'Dress',
      categoryId: watchCatId,
      quantity: 1,
      currentlyOwn: true,
      tags: ['cartier'],
      image: '/pictures/cartiertank.jpg',
      userId,
    },
    {
      name: 'Renulife Violet Ray',
      description: 'Didnt work so I sold it.',
      paid: '175',
      soldFor: '150',
      shelfId: violetShelf._id,
      categoryName: 'Other',
      categoryId: otherCatId,
      customCategory: 'Antique Medical Devices',
      quantity: 1,
      currentlyOwn: false,
      tags: ['quackery', 'antique'],
      image: '/pictures/violetray.jpg',
      userId,
    },
    {
      name: 'Watch Two',
      description: 'So shiny',
      shelfId: watchShelfId,
      categoryName: 'Moon Phase',
      categoryId: watchCatId,
      quantity: 1,
      currentlyOwn: true,
      userId,
    },
    {
      name: 'Watch Three',
      paid: '4080',
      description: 'More shiny',
      shelfId: watchShelfId,
      categoryName: 'Chronograph',
      categoryId: watchCatId,
      quantity: 1,
      currentlyOwn: true,
      userId,
    },
    {
      name: 'Watch Four',
      paid: '30000',
      soldFor: '31000',
      description: 'Super shiny',
      shelfId: watchShelfId,
      categoryName: 'Tourbillon',
      categoryId: watchCatId,
      quantity: 1,
      currentlyOwn: false,
      userId,
    },
    {
      name: 'Toenail Clipping',
      description: 'For a rainy day',
      shelfId: toeShelf._id,
      categoryId: otherCatId,
      customCategory: 'keratin',
      quantity: 2978,
      currentlyOwn: true,
      userId,
    },
  ];

  return Item.insertMany(items);
}

module.exports = async () => {
  await seedUsers();
  console.log('seed users added!');

  await seedCategories();
  console.log('seed categories added!');

  await seedShelves();
  console.log('seed shelves added!');

  await seedItems();
  console.log('seed items added!');
}