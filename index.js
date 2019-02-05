// start - initialize module aliases
require('module-alias/register');
// end - initialize module aliases
require('./server/api/user/model');
require('./server/api/contactsList/model');

const bootstrapper = require('@core/bootstrapper');
const shutDownManager = require('@core/shutdownManager');
const logger = require('@core/logger');
const config = require('@config');
const apiRoute = require('@api');

const app = bootstrapper.initiate();
const port = process.env.PORT || config.DEFAULT_PORT;

// apis are available under /api prefix
app.use('/api', apiRoute);

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
shutDownManager.manage(server);
