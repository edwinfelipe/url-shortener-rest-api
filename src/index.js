const createServer = require('./server');
const connectToDb = require('./db');
const app = createServer();

app.listen(app.get('port'), ()=>{
    console.log(`Server is running on port ${app.get('port')}`);
});
connectToDb(process.env.DB);
