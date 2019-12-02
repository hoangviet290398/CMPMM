const express = require('express');
const cookieSession = require('cookie-session');
const cors = require('cors');
var bodyParser = require('body-parser');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const categoryRoutes = require('./routes/category-routes');
const productRoutes = require('./routes/product-routes');
const userRoutes = require('./routes/user-routes');
const cartRoutes = require('./routes/cart-routes');
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
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type, Accept');

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
app.use('/cart', cartRoutes);


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
        purchasedProductsString += '<tr class="item"><td> ' + purchasedProducts[i].product.name + '</td><td> $' + purchasedProducts[i].product.price + '</td><td>' +
            purchasedProducts[i].quantity + '</td><td> $' + invoice.singleItemPrice[i] + '</td></tr> \n';
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

        html: `<!doctype html>
        <html>
        
        <head>
            <meta charset="utf-8">
            <title>A simple, clean, and responsive HTML invoice template</title>
        
            <style>
                .invoice-box {
                    max-width: 800px;
                    margin: auto;
                    padding: 30px;
                    border: 2px solid #000;
                    box-shadow: 0 0 10px rgba(0, 0, 0, .40);
                    font-size: 16px;
                    line-height: 24px;
                    font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                    color: #555;
                }
                
                .invoice-box table {
                    width: 100%;
                    line-height: inherit;
                    text-align: left;
                }
                
                .invoice-box table td {
                    padding: 5px;
                    vertical-align: top;
                }
                
                .invoice-box table tr td:nth-child(2) {
                    text-align: right;
                }
                
                .invoice-box table tr.top table td {
                    padding-bottom: 20px;
                }
                
                .invoice-box table tr.top table td.title {
                    font-size: 45px;
                    line-height: 45px;
                    color: #333;
                }
                
                .invoice-box table tr.information table td {
                    padding-bottom: 40px;
                }
                
                .invoice-box table tr.heading td {
                    background: #eee;
                    border-bottom: 1px solid #ddd;
                    font-weight: bold;
                }
                
                .invoice-box table tr.details td {
                    padding-bottom: 20px;
                }
                
                .invoice-box table tr.item td {
                    border-bottom: 1px solid #eee;
                }
                
                .invoice-box table tr.item.last td {
                    border-bottom: none;
                }
                
                .invoice-box table tr.total td:nth-child(2) {
                    border-top: 2px solid #eee;
                    font-weight: bold;
                }
                
                @media only screen and (max-width: 600px) {
                    .invoice-box table tr.top table td {
                        width: 100%;
                        display: block;
                        text-align: center;
                    }
                    .invoice-box table tr.information table td {
                        width: 100%;
                        display: block;
                        text-align: center;
                    }
                }
                /** RTL **/
                
                .rtl {
                    direction: rtl;
                    font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                }
                
                .rtl table {
                    text-align: right;
                }
                
                .rtl table tr td:nth-child(2) {
                    text-align: left;
                }
            </style>
        </head>
        
        <body>
            <div class="invoice-box">
                <table cellpadding="0" cellspacing="0">
                    <tr class="top">
                        <tr>
                            <td class="title">
                                <img src="https://i.imgur.com/TtW3s1b.png" style="width:100%; max-width:300px;">
                            </td>
                            <td></td>
                            <td></td>
                            <td>
                                Invoice #: 123<br> Created: ${invoice.createdDay}<br>
                            </td>
                        </tr>
                    </tr>
                    <br>
                    <tr class="information">
        
                        <tr>
                            <td>
                                Sportstore, Inc.<br> 01 Vo Van Ngan<br> Viet Nam, Ho Chi Minh City 700000
                            </td>
                            <td></td>
                            <td></td>
                            <td>
                                INVOICE TO:<br>
                                <strong>${invoice.info.name}</strong><br>
                                Address: ${invoice.info.address}<br>
                                 Phone number: ${invoice.info.phoneNumber}<br>
                                 Email: ${invoice.info.emailAddress}
                            </td>
        
        
                        </tr>
        
                    </tr>
        
        
        
        
                    <h1 style="">ORDER SUMMARY</h1>
                    <tr class="heading">
                        <td>
                            Item
                        </td>
                        <td>
                            Unit
                        </td>
                        <td>
                            QTY
                        </td>
                        <td>
                            Price
                        </td>
                    </tr>
        
                    ${purchasedProductsString}
        
                    <tr class="total">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            Sub total: $${invoice.subTotal}<br>
                                            Tax: $${invoice.tax}<br>
                                            <strong>Total: $${invoice.total}
                                            </strong>
                        </td>
                    </tr>
                </table>
            </div>
        
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