const router = require('express').Router();
var Product = require('../models/product-model');


router.get('/', (req,res) => {
    Product.find(function(err,products){
        if(err )res.send(err);
        res.json(products);
    });
});

router.post('/', function(req,res){
      
    var product = new Product();
    product.name=req.body.name;
    product.img=req.body.img;
    product.cateId=req.body.cateId;
    product.des=req.body.des;
    product.price=req.body.price;
   
    product.save(function(){
        
        res.json({message:'product created'});
    });

});

router.get('/:product_id', (req,res) => {
    Product.findById(req.params.product_id,function(err,product){
        if(err)res.send(err);
            res.json(product);
        });
});

router.put('/:product_id',(req,res) => {
    Product.findById(req.params.product_id,function(err,product){
        if(err)res.send(err);
        if(req.body.name) product.name=req.body.name;
        if(req.body.img) product.img=req.body.img;
        if(req.body.cateId) product.cateId=req.body.cateId;
        if(req.body.des) product.des=req.body.des;
       
        product.save(function(err){
            if(err) res.send(err);
            res.json({message:'Product updated!'});
        });
    })
})

router.delete('/:product_id', function(req,res){
    Product.remove({
        _id:req.params.product_id
    },function(err,product){
        if(err)res.send(err);
        res.json({message:'Successfully deleted'});
    });
});
module.exports = router;
