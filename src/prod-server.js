import express from 'express';
import compression from 'compression';

import path from 'path';

const app = express();
app.use(compression());
app.use(express.static(path.join(__dirname, 'base')));

/*
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'base/index.html'));
});
*/


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
