const express = require('express');
const cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const categoryRoutes = require('./routes/category-routes');
const productRoutes = require('./routes/product-routes');
const userRoutes = require('./routes/user-routes');
const passportSetup = require('./config/passport-setup');
const nodeMailer = require("nodemailer");
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();
var apiRouter = express.Router();


var User = require('./models/user-model');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
})

// set view engine
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);
app.use('/user', userRoutes);


// create home route
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

//send mail
app.post("/sendmail", (req, res) => {
    console.log("request came");
    let invoice = req.body;
    sendMail(invoice, info => {
        console.log(`Email sent`);
        res.send(info);
    })
})

async function sendMail(invoice, callback) {
    console.log('cart items', invoice.cartItems)
    console.log('cust info', invoice.info)
    console.log('sub total', invoice.subTotal)
    var purchasedProducts = new Array();

    purchasedProducts = invoice.cartItems;

    var purchasedProductsString = '';

    for (var i = 0; i < purchasedProducts.length; i++) {
        purchasedProductsString += '<tr><td> ' + purchasedProducts[i].product.name + '</td><td>' +
            purchasedProducts[i].quantity + '</td></tr> \n';
    }
    console.log('Show string', purchasedProductsString);
    console.log('purchased products ', purchasedProducts.length);
    var transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'meansportstore@gmail.com',
            pass: '123456789a@'
        }
    })

    var mailOptions = {
        from: 'meansportstore@gmail.com',
        to: invoice.info.emailAddress,
        subject: 'Receipt for Your Payment to SPORTSTORE',
        html: `<html>
                <body>
                <h1><strong>Hello ${invoice.info.name}</strong></h1>
                <h3>This is the invoice for the order that you have placed in SPORTSTORE</h4>
                <h5>The shipping will take some days before your goods arrive to your sweet home</h5>
                <h6>Here is your order detail information:</h6>
                <table rules="all" style="border-color: #666;" cellpadding="10">
                <tr style='background: #eee;'>
                    <td><strong>Product name</strong> </td>
                    <td><strong>Quantity</strong></td>
                    ${purchasedProductsString}
                </tr>
                </table>
                <h6>Sub total: ${invoice.subTotal}</h6>
                <h6>Tax: ${invoice.tax}</h6>
                <h6>Total: ${invoice.total}</h6>
                </body>
                </html>`
    };

    let info = await transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    callback(info);
}
app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});

// Kết thúc lần 1