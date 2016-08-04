import express from 'express';
import compression from 'compression';
import app, { startServer } from './server';
import config from '../config';

app.use(compression());
app.use(express.static(config.paths.staticDirectoryDest));

startServer();
