import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import apiRoutes from './routes/api/apiRoutes';

const app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('jsonParser', bodyParser.json());
app.set('urlencodedParser', bodyParser.urlencoded({ extended: false }));


// Primary routes 
app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request`);
    next();
});


// Mount the v1 api routes
app.use('/v1', apiRoutes);


// Allows to set alternative port during launch
const altPort = (process.argv[2]) ? process.argv[2] : 8080;

const server = app.listen(process.env.PORT || altPort, () => {
    console.log(`Listening to port ${server.address().port}`);
});
