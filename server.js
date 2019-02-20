const express = require('express');
const helmet = require('helmet');
const server = express();
const cohortRoutes = require('./routes/cohortRoutes');


server.use(helmet());
server.use(express.json());
server.use('/api/cohorts', cohortRoutes);

module.exports = server;