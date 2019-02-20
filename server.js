const express = require('express');
const helmet = require('helmet');
const server = express();
const cohortRoutes = require('./routes/cohortRoutes');
const studentRoutes = require('./routes/studentRoutes');

server.use(helmet());
server.use(express.json());
server.use('/api/cohorts', cohortRoutes);
server.use('/api/students', studentRoutes);
module.exports = server;