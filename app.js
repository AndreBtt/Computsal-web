const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(__dirname + '/public'));
app.use(require('./routes'))

app.listen(3000, () => console.log('App listening on port 3000!'));