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

//POST DEBITOS

router.post('/debitos', (req,res,next) => {

    var debito = req.body;
    debito.status = 'CRIADO'

    connect.query('insert into debitos set ?', debito, (error,results) => {
        if(error){
            res.status(400).send(error)
        } else {
            debito.id = results.resultsId;

            var nextStep = {
                debito,
                status:'Debito adicionado com sucesso!',
                proximos_passos: [{
                    href: 'http://localhost:3000/api/pagamentos/debitos/' + debito.id,
                    relation: 'link para alterar o debito',
                    method: 'POST'
                },{
                    href: 'http://localhost:3000/api/pagamentos/debitos/' + debito.id,
                    relation: 'link para cancelar o debito',
                    method: 'DELETE'
                }]
            }           
            res.status(201).send(nextStep)
        }
    })
})

//POST CREDITOS ( ALTERAR DEBITOS )

router.post('/debitos/:id', (req,res,next) => {

    var debito = req.body;
    var nome_do_debito = debito.nome_do_debito;
    var data_do_debito = debito.data_do_debito;
    var vencimento_do_debito = debito.vencimento_do_debito;
    var valor_do_debito = debito.valor_do_debito;
    var debitoID = req.params.id;

    connect.query('update debitos set nome_do_debito = ?, data_do_debito = ?, vencimento_do_debito = ?, valor_do_debito = ? where id = ?', [nome_do_debito,data_do_debito,vencimento_do_debito,valor_do_debito,debitoID], (error,results) => {
        if(error){
            res.status(400).send(error);
        } else {
            debito.id = results.insertId;

            var nextStep = {
                debito,
                status: 'Debito Alterado com sucesso!',
                proximos_passos : [{
                    href: 'http://localhost:3000/api/pagamentos/debitos/' + debito.id,
                    rel: 'Para alterar novamente o debito',
                    method: 'POST'
                },{
                    href: 'http://localhost:3000/api/pagamentos/debitos/' + debito.id,
                    rel: 'Para cancelar o debito',
                    method: 'DELETE'
                }]
            }
            res.status(200).send(nextStep)
        }
    })
})


    //DELETE DEBITOS ( DELETAR DEBITOS )

    router.delete('/debitos/:id', (req,res,next) => {

        var debito = req.body;
        var  debitoID = req.params.id;
        var status = 'CANCELADO'

        connect.query('update debitos set status = ? where id = ?',[status,debitoID], (error,results) => {
            if(error){
                res.status(400).send(error);
            } else {
                var resultado = {
                    debito,
                    status: 'Debito cancelado com sucesso!'
                }

                res.status(200).send(resultado)
            }

        })

    })



module.exports = router