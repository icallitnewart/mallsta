const express = require('express');
const app = express();
const port = 5005;
const config = require('./config/key');
const bodyParser = require('body-parser');

//body-parser
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

//mongoose
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(()=> console.log('MongoDB Connected...'))
.catch(err=> console.log(err));

//routes
app.use('/api/users', require('./routes/users'));


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});