const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');

const app = express();

//Body parser middleware
app.use(bodyParser.json());

//DB Config 
const db = require('./config/keys').mongoURI;

//connect to mongdb
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true  })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

    //Use Routes
    app.use('/api/items', items);

    // Server static assets if in production
    if(process.env.NODE_ENV === 'production'){
        //set static folder
        app.use(express.static('client/build'));

        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });
    }
    const port = process.env.PORT || 5000;

    app.listen(port, () => console.log(`Server started on port ${port} `));
