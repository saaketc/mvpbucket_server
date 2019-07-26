require('express-async-errors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const error = require('./middleware/error');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const projectRoute = require('./routes/projects');
const repositoryRoute = require('./routes/repository');
const searchRoute = require('./routes/search');
const allowCrossDomain = require('./middleware/crossDomain');


const startDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost/mvpbucket', { useNewUrlParser: true });
        console.log("Connected to db...");
    }
    catch (ex) {
        console.log(ex.message);
   }
}
startDb();

app.use(allowCrossDomain);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/projects', projectRoute);
app.use('/api/show-repository', repositoryRoute);
app.use('/api/search', searchRoute);
app.use(error);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port: ${port}`));