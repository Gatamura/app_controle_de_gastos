const router = require('express').Router();
router.use((req,res,next) => {
    res.setHeader('Content-Type' , 'application/json')
    res.setHeader('Accept', 'application/json')
    next();
})

router.use((req,res,next) => {
    console.log('aqui vem autenticacao')
    next();
})

var pagamentoCreditos = require('./pagamentoCreditos');
router.use('/pagamentos', pagamentoCreditos);

var pagamentoDebitos = require('./pagamentoDebitos');
router.use('/pagamentos', pagamentoDebitos);

module.exports = router