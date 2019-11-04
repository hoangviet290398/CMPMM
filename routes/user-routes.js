const router = require('express').Router();
var User = require('../models/user-model');

router.post('/authenticate',function(req,res){
    User.findOne({
        username:req.body.username
    }).select('name username password').exec(function(err,user){
        if(err ) throw err;
        if(!user){
            res.json({
                success:false,
                message:'Authentication failed. User not found.'
            });

        }
        else if(user){
            var validPassword =user.comparePassword(req.body.password);
            if(!validPassword){
                res.json({
                    success:false,
                    message:'Authentication failed. Wrong password.'
                });
            }
            else{
                var token =jwt.sign({
                    mane:user.local.name,
                    username:user.local.username
                },superSecret,{
                    expiresIn:'24h'
                });
                res.json({
                    success:true,
    
                    message:'User da duoc cap phat token!',
                    token:token
                });
            }   
        }
    })
})


router.use(function(req,res,next){
    console.log('Dang lam tren app');

    var token =req.body.token||req.query.token||req.headers['x-access-token'];

    if(token){
        jwt.verify(token,superSecret,function(err,decoded){
            if(err){
                return res.json({success:false,message:'Failed to authenticate token'});
            }
            else{
                req.decoded =decoded;
                next();
            }
        });
    }
    else{
        return res.status(403).send({
            success:false,
            message:'No token provided.'
        });
    }
});


router.get('/',function(req,res){
    res.json({message:'Resful API! welcome to our api!'});
});
router.post('/', function(req,res){
    var user=new User();
    user.local.name=req.body.name;
    user.local.username=req.body.username;
    user.local.password=req.body.password;
    user.local.email=req.body.email;
    user.local.phonenumber=req.body.phonenumber;
    user.local.address=req.body.address;
    user.local.avatar=req.body.avatar;
    user.local.role=req.body.role;
    user.save(function(err){
        if(err){
            if(err.code==11000)
                return res.json({success:false,message:'A user with that username alredy exists.'});
            else 
                return res.send(err);
        }
        res.json({message:'user created'});
    });
})
router.get('/', function(req,res){
    User.find(function(err,users){
        if(err )res.send(err);
        res.json(users);
    });
});
router.get('/:user_id', function(req,res){
    User.findById(req.params.user_id,function(err,user){
        if(err)res.send(err);

        res.json(user);
    });
})
router.put('/:user_id', function(req,res){
    User.findById(req.params.user_id,function(err,user){
        if(err)res.send(err);
        if(req.body.name) user.local.name=req.body.name;
        if(req.body.username) user.local.username=req.body.username;
        if(req.body.password) user.local.password=req.body.password;
        if(req.body.email) user.local.email=req.body.email;
        if(req.body.phonenumber) user.local.phonenumber=req.body.phonenumber;
        if(req.body.address) user.local.address=req.body.address;
        if(req.body.avatar) user.local.avatar=req.body.avatar;
        if(req.body.role) user.local.role=req.body.role;


        user.save(function(err){
            if(err) res.send(err);
            res.json({message:'User updated!'});
        });
    })
})
router.delete('/:user_id', function(req,res){
    User.remove({
        _id:req.params.user_id
    },function(err,user){
        if(err)res.send(err);
        res.json({message:'Successfully deleted'});
    });
});

module.exports = router;
