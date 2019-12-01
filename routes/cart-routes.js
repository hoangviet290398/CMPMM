const router = require('express').Router();
var Cart = require('../models/cart-model');


router.get('/', (req,res) => {
    Cart.find(function(err,carts){
        if(err )res.send(err);
        res.json(carts);
    });
});

router.post('/', function(req,res){
      
    var category = new Category();
    category.name=req.body.name;
   
    category.save(function(){
        
        res.json({message:'category created'});
    });

});

router.get('/:category_id', (req,res) => {
    Category.findById(req.params.category_id,function(err,category){
        if(err)res.send(err);
            res.json(category);
        });
});

router.put('/:category_id',(req,res) => {
    Category.findById(req.params.category_id,function(err,category){
        if(err)res.send(err);
        if(req.body.name) category.name=req.body.name;
       
        category.save(function(err){
            if(err) res.send(err);
            res.json({message:'Category updated!'});
        });
    })
})

router.delete('/:category_id', function(req,res){
    Category.remove({
        _id:req.params.category_id
    },function(err,user){
        if(err)res.send(err);
        res.json({message:'Successfully deleted'});
    });
});
module.exports = router;
