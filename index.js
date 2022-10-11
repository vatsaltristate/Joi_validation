
const express = require('express');
const Joi = require('joi');
const app = express();
const port = 7000;
const db = require('./database/db.js')


app.use(express.json());





app.get('/', (req,res) => {
    res.send('Express.js API validated with Joi');
})


app.post('/', (req,res) => {
    let insertQuery = "INSERT INTO joitab (name,age,hobby,email) VALUES ('" + req.body.name + "', '" + req.body.age + "', '" + req.body.hobby + "', '" + req.body.email + "');";

    const schema = Joi.object().keys({
        name: Joi.string().required(),
        age: Joi.number().required(),
        hobby: Joi.string().required(),
        email: Joi.string().email().required()
    })

    console.log(schema.validate(req.body));

    if (schema.validate(req.body).error) {
        res.send(schema.validate(req.body).error.details);
    }

    else {
        db.connection.query(insertQuery, (err, result, field) => {
            res.send(schema.validate(req.body));
        })
    }
})
app.listen(port, (err) => {
    if (err) throw err;
    console.log('Server is running on port: ' + port);
})
