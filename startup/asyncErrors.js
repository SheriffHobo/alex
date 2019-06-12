require('express-async-errors');

module.exports = function() {
	// log here if we're logging
  
  process.on('unhandledRejection', (ex) => {
  	console.error('EXCEPTION', ex)
    throw ex;
  });
}