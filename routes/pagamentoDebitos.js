const router = require('express').Router();
const connect = require('../infra/connectDB');

//GET ALL

router.get('/debitos', (req,res,next) => {

    connect.query('select * from debitos', (error,results) => {
        if(error){
            res.status(400).send(error);
        } else {
            res.status(200).json(results)
        }
    })
})

//GET ID

router.get('/debitos/:id',(req,res,next) => {
    
    var id = req.params.id;

    connect.query('select * from debitos where id = ?', id, (error,results) => {
        if(error){
            res.status(400).send(error);
        } else {
            res.status(200).json(results);
        }
    })

})

module.exports = router