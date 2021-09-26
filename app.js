let express = require('express');
let todoConstoller = require('./controllers/todoController')

let app = express();

//set up template engine
app.set('view engine', 'ejs');
app.use(express.urlencoded ({extended: true}));
//static files
app.use(express.static('./public'));

//fire controllers
todoConstoller(app);

//listen to port
app.listen(3000)
console.log('You are listening to port 3000');