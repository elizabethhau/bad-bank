// setup server
// YOUR CODE
var express = require('express')
var app = express();
var low     = require('lowdb');
var fs      = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db      = low(adapter);

// setup directory used to serve static files
// YOUR CODE
app.use(express.static('public'))

// data parser - used to parse post data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// setup data store
// YOUR CODE
db.defaults({ accounts: []}).write();

// required data store structure
// YOUR CODE
/*
{ 
    accounts:[
        {name        : '',
         email       : '',
         balance     : 0,
         password    : '',
         transactions: []}
    ] 
}
*/

var create_account = app.get('/account/create/:name/:email/:password', function (req, res) {

    // YOUR CODE
    // Create account route
    // return success or failure string
    let params = req.params;
    var account = {
        name: params.name,
        email: params.email,
        balance: 0,
        password: params.password,
        transactions: []
    }
    // TODO: first check if account already exists (email exists)
    // If email exists, return failure or success??
    console.log('check if email exists')
    console.log(getAccount(params.email))
    if (getAccount(params.email) != undefined) {
        console.log('account exists!')
        // res.status = 409
        // res.statusCode = 409
        res.send('failure - account already exists')
        return 'failure';
    }
    console.log('account does not exist yet!')
    // if email doesn't exist, create new account. 
    db.get('accounts').push(account).write();
    // Then check DB, if account exists - return success. Otherwise, return failure
    if (doesAccountExist(params.email)) {
        let account = getAccount(params.email)
        account.transactions.push(
            {
                action: 'create',
                amount: 0,
                timestamp: new Date()
            }
        )
        db.get('accounts').find({email: params.email}).assign(account).write()
        res.send('success')
        console.log('Account Created!')
        console.log(JSON.stringify(getAccount(params.email)));
        return 'success'
    } else {
        res.status = 400;
        res.statusCode = 400;
        res.send(`failure - failed to create account with email ${params.email}`)
        return 'failure'
    }
});

var getAccount = (email) => {
    let accounts = db.get('accounts').value();
    return accounts.find(account => account.email == email)
}



var doesAccountExist = (email) => {
    // let accounts = db.get('accounts').value();
    // let exists = accounts.filter((account) => {
    //     return account.hasOwnProperty(email);
    // });
    return getAccount(email) != undefined
}

app.get('/account/login/:email/:password', function (req, res) {
    // YOUR CODE
    // Login user - confirm credentials
    // If success, return account object    
    // If fail, return null
    console.log('in app get log in ')
    let email = req.params.email
    let password = req.params.password
    const account = getAccount(email)
    // console.log(account)
    console.log(email)
    console.log('password')
    console.log(password)
    if (account != undefined) {

        console.log('account exists!')
        // check password
        if (account.password == password) {
            console.log('password worked!')
            //TODO: Make sure the transaction updates are being updated in the DB!\
            
            account.transactions.push(
                {
                    action: 'login',
                    amount: 0,
                    timestamp: new Date()
                }
            )
            db.get('accounts').find({email: email}).assign(account).write()
            res.send(account)
            return account
        } 
    } 
    res.status = 401 // unauthorized
    res.statusCode = 401
    res.send('Invalid email or password')
    
    // failed, return null
    return null
});

app.get('/account/get/:email', function (req, res) {

    // YOUR CODE
    // Return account based on email
    const account = getAccount(req.params.email)
    if (account != undefined) {
        res.send(account)
        return account
    }
    res.status = 204 // no content
    res.statusCode = 204
    return null
});

app.get('/account/deposit/:email/:amount', function (req, res) {

    // YOUR CODE
    // Deposit amount for email
    // return success or failure string
    console.log('in app get deposit amount')
    let email = req.params.email
    let amount = parseFloat(req.params.amount)
    const account = getAccount(req.params.email)
    console.log(email)
    console.log(amount)
    if (amount > 0) {
        account.transactions.push(
            {
                action: 'deposit',
                amount,
                timestamp: new Date()
            }
        )
        db.get('accounts').find({email: email}).assign(account).write()
        console.log(getAccount(req.params.email))
        res.send('success')
        return 'success'
    }
    res.send('failure - please enter a positive amount to deposit')
    return 'failure'
});

app.get('/account/withdraw/:email/:amount', function (req, res) {

    // YOUR CODE
    // Withdraw amount for email
    // return success or failure string
    console.log('in app get withdraw amount')
    let email = req.params.email
    let amount = parseFloat(req.params.amount)
    const account = getAccount(req.params.email)
    console.log(email)
    console.log(amount)
    if (amount > 0) {
        account.transactions.push(
            {
                action: 'withdraw',
                amount: -amount,
                timestamp: new Date()
            }
        )
        db.get('accounts').find({email: email}).assign(account).write()
        console.log(getAccount(req.params.email))
        res.send('success')
        return 'success'
    }
    res.send('failure - please enter a positive amount to withdraw')
    return 'failure'
});

app.get('/account/transactions/:email', function (req, res) {

    // YOUR CODE
    // Return all transactions for account
    console.log('in app transactions')
    let email = req.params.email
    const account = getAccount(req.params.email)
    console.log(account.transactions)
    res.send(account.transactions)
    return account.transactions
});

app.get('/account/all', function (req, res) {

    // YOUR CODE
    // Return data for all accounts
    let allAccounts = db.get('accounts').value();
    console.log(allAccounts)
    res.send(allAccounts)
    return allAccounts
    
});

// start server
// -----------------------
// YOUR CODE
app.listen(3000, function() {
    console.log('Running on port 3000')
});