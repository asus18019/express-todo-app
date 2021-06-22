const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//     res.end('hhh');
// })
//
// app.post('/create', async (req, res) => {
//   res.end('hhh');
// })

app.use('/api', require('./routes/item.routes'));

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://Admin:11qqaa@cluster0.huyrw.mongodb.net/garbage?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        }).then(() => {
            app.listen(port, () => {
                console.log(`Server has been started on port ${port}...`)
            });
        })
    } catch (e) {
        console.log(e);
    }
}

start();