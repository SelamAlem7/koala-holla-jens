const pg = require('pg');
const Pool = pg.Pool;
const config = {
    host: 'Localhost', // Location of our database.
    database: 'koalaholla'  // Name of our database.
};

// Don't overthink the ^above^ stuff. This next line of code is
// what matters. This is where we create an instance of a pool
// object that can handle our db connections:
const pool = new Pool(config);

// Optional code that logs to our console each time our pool object
// makes a connection to the database:
pool.on('connect', () => {
    console.log('server-database connection happened.');
});

// Optional code that logs to our console when something makes
// our pool error out:
pool.on('error', (poolError) => {
    console.error(poolError);
});

// Export our freshly configured pool object so we can use it whenever
// we...require...a bit of database interaction:
module.exports = pool;