const router = require('express').Router();
const connect = require('../infra/connectDB')

//GET ALL

router.get('/creditos', (req,res,next) => {
    
    connect.query('select * from creditos', (error,result) => {
        if(error){
            res.status(400).send(error)
        } else {
            res.status(200).json(result);
        }
    })

})

//GET ID

router.get('/creditos/:id',(req,res,next) => {
    
    var id = req.params.id;

    connect.query('select * from creditos where id = ?', id, (error,results) => {
        if(error){
            res.status(400).send(error);
        } else {
            res.status(200).json(results);
        }
    })

})

//POST CREDITOS

router.post('/creditos', (req,res,next) => {

    var credito = req.body;
    credito.status = 'CRIADO'

    connect.query('insert into creditos set ?', credito, (error,results) => {
        if(error){
            res.status(400).send(error);
        } else {
            credito.id = results.insertId;

            var nextStep = {
                credito,
                status: 'Credito adicionado com sucesso!',
                proximos_passos: [{
                    href: 'http://localhost:3000/api/pagamentos/creditos/' + credito.id,
                    relation: 'link para alterar o credito',
                    method:'POST'
                },{
                    href:'http://localhost:3000/api/pagamentos/creditos/' + credito.id,
                    relation:'link para cancelar o credito',
                    method:'DELETE'
                }]
            }

            res.status(201).send(nextStep)
        }
    })
})

//POST CREDITOS ( ALTERAR CREDITOS )

router.post('/creditos/:id', (req,res,next) => {

    var credito = req.body;
    var nome_do_credito = credito.nome_do_credito;
    var data_do_credito = credito.data_do_credito;
    var valor_do_credito = credito.valor_do_credito;
    var creditoID = req.params.id;

    connect.query('update creditos set nome_do_credito = ?, data_do_credito = ?, valor_do_credito = ? where id = ?',[nome_do_credito,data_do_credito,valor_do_credito,creditoID], (error,results) => {
        if(error){
            res.status(400).send(error);
        } else {
            credito.id = results.insertId;

            var nextStep = {
                credito,
                status: 'Credito Alterado com sucesso!',
                proximos_passos : [{
                    href: 'http://localhost:3000/api/pagamentos/creditos/' + credito.id,
                    rel: 'Para alterar novamente o credito',
                    method: 'POST'
                },{
                    href: 'http://localhost:3000/api/pagamentos/creditos/' + credito.id,
                    rel: 'Para cancelar o credito',
                    method: 'DELETE'
                }]
            }

            res.status(200).send(nextStep);
        }
    }
        
    )

})

//DELETE CREDITOS ( DELETAR CREDITOS )

router.delete('/creditos/:id', (req,res,next) => {

    var credito = req.body;
    var creditoID = req.params.id;
    var status = 'CANCELADO'

    connect.query('update creditos set status = ? where id = ?',[status,creditoID], (error,results) => {
        if(error){
            res.status(400).send(error);
        } else {

            var resultado = {
                credito,
                status: 'Credito cancelado com sucesso!'
            }

            res.status(200).send(resultado)
        }
    })
    
})

module.exports = router;