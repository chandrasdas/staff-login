const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;

const morgan = require('morgan');
// const connection = require('./models/dbConn');
const student_routes = require('./routes/student_routes');
const staff_routes = require('./routes/staff_routes');


const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});
app.use('/student', student_routes);
app.use('/staff', staff_routes);
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
