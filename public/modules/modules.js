var ui = {};

ui.navigation = `
    <!-- ------------- YOUR CODE: Navigation UI ------------- --> 
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Bad Bank</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link" href="#" id="createAccount">Create Account</a>
        <a class="nav-link" href="#" id="login">Login</a>
        <a class="nav-link" href="#" id="deposit">Deposit</a>
        <a class="nav-link" href="#" id="withdraw">Withdraw</a>
        <a class="nav-link" href="#" id="transactions">Transactions</a>
        <a class="nav-link" href="#" id="balances">Balance</a>
        <a class="nav-link" href="#" id="allData">All Data</a>
      </div>
    </div>
  </nav>
  
`;

ui.createAccount = `
    <!-- ------------- YOUR CODE: Create Account UI ------------- --> 
    <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
    <div class="card-header">Create Account</div>
    <div class="card-body">
      <form>
      <div class="form-group">
        <label for="createAccountName">Name</label>
        <input type="text" class="form-control" id="createAccountName" aria-describedby="name" placeholder="Enter Name">
      </div>
        <div class="form-group">
          <label for="createAccountEmail">Email address</label>
          <input type="email" class="form-control" id="createAccountEmail" aria-describedby="emailHelp" placeholder="Enter Email">
        </div>
        <div class="form-group">
          <label for="createAccountPassword">Password</label>
          <input type="password" class="form-control" id="createAccountPassword" placeholder="Create Password">
        </div>
        <button type="submit" class="btn btn-light" onclick="create()">Create Account</button>
      </form>
    </div>
  </div>
  <script>loadCreateAccount()</script>
`;

ui.login = `
    <!-- ------------- YOUR CODE: Login UI ------------- --> 
    <div class="card text-white bg-secondary mb-3" style="max-width: 18rem;">
    <div class="card-header">Login</div>
    <div class="card-body">
    <form>
      <div class="form-group">
        <label for="loginEmail">Email address</label>
        <input type="email" class="form-control" id="loginEmail" aria-describedby="emailHelp" placeholder="Enter Email">
      </div>
      <div class="form-group">
        <label for="loginPassword">Password</label>
        <input type="password" class="form-control" id="loginPassword" placeholder="Enter Password">
      </div>
      <button type="submit" class="btn btn-light" onclick="login()">Login</button>
    </form>
    </div>
  </div>
`;

ui.deposit = `
    <!-- ------------- YOUR CODE: Deposit UI ------------- --> 
    <div class="card text-white bg-warning mb-3" style="max-width: 18rem;">
    <div class="card-header">Deposit</div>
    <div class="card-body">
    <form>
      <div class="form-group">
        <label for="depositEmail">Email address</label>
        <input type="email" class="form-control" id="depositEmail" aria-describedby="emailHelp" placeholder="Enter Email">
      </div>
      <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">$</span>
      </div>
      <input type="number" class="form-control" id="depositAmount" aria-label="Amount">
    </div>
      <button type="submit" class="btn btn-light" onclick="deposit()">Deposit</button>
    </form>
    </div>
  </div>
`;

ui.withdraw = `
    <!-- ------------- YOUR CODE: Withdraw UI ------------- --> 
    <div class="card text-white bg-success mb-3" style="max-width: 18rem;">
    <div class="card-header">Withdraw</div>
    <div class="card-body">
    <form>
      <div class="form-group">
        <label for="withdrawEmail">Email address</label>
        <input type="email" class="form-control" id="withdrawEmail" aria-describedby="emailHelp" placeholder="Enter Email">
      </div>
      <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">$</span>
      </div>
      <input type="number" class="form-control" id="withdrawAmount" aria-label="Amount">
    </div>
      <button type="submit" class="btn btn-light" onclick="withdraw()">Submit</button>
    </form>
    </div>
  </div>
   
`;

ui.transactions = `
    <!-- ------------- YOUR CODE: Transactions UI ------------- --> 
    <div class="card text-white bg-danger mb-3" style="max-width: 18rem;">
    <div class="card-header">Transactions</div>
    <div class="card-body">
    <form>
      <div class="form-group">
        <label for="transactionsEmail">Email address</label>
        <input type="email" class="form-control" id="transactionsEmail" aria-describedby="emailHelp" placeholder="Enter Email">
      </div>
      <button type="submit" class="btn btn-light" onclick="transactions()">Show Transactions</button>
    </form>
    </div>
  </div>
   
`;

ui.balance = `
    <!-- ------------- YOUR CODE: Balance UI ------------- --> 
    <div class="card text-white bg-info mb-3" style="max-width: 18rem;">
    <div class="card-header">Balance</div>
    <div class="card-body">
    <form>
      <div class="form-group">
        <label for="balanceEmail">Email address</label>
        <input type="email" class="form-control" id="balanceEmail" aria-describedby="emailHelp" placeholder="Enter Email">
      </div>
      <button type="submit" class="btn btn-light" onclick="balance()">Show Balance</button>
    </form>
    </div>
  </div>
`;

ui.default = `
    <!-- ------------- YOUR CODE: Default UI ------------- --> 
    <div class="card mb-3" style="max-width: 540px;">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src="bank.png" class="card-img" alt="Bank">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Welcome to the Bad Bank!</h5>
        <p class="card-text">Feel free to move around using the navigation bar</p>
      </div>
    </div>
  </div>
</div>
`;

ui.allData = `
    <!-- ------------- YOUR CODE: All Data UI ------------- --> 
    <div>
      <h5>All Data in Store</h5>
      <button type="button" onclick="allData()" class="btn btn-primary">Show All Data</button>
    </div>
`;

var target = document.getElementById("target");
var navigation = document.getElementById("navigation");
navigation.innerHTML += ui.navigation;

var loadCreateAccount = function () {
  target.innerHTML = ui.createAccount;
};

var loadLogin = function () {
  target.innerHTML = ui.login;
};

var loadDeposit = function () {
  target.innerHTML = ui.deposit;
};

var loadWithdraw = function () {
  target.innerHTML = ui.withdraw;
};

var loadTransactions = function () {
  target.innerHTML = ui.transactions;
};

var loadBalance = function () {
  target.innerHTML = ui.balance;
};

var defaultModule = function () {
  target.innerHTML = ui.default;
};

var loadAllData = function () {
  target.innerHTML = ui.allData;
};

function clearResults() {
  document.getElementById('results').innerHTML = '';
}

$('.nav-link').click(function() {
  $(".nav-link").removeClass("active");
  $(this).addClass("active");
  var id = $(this).attr('id');
  console.log(id)
  switch(id) {
    case 'createAccount':
      loadCreateAccount();
      break;
    case 'login':
      loadLogin();
      break;
    case 'deposit':
      loadDeposit();
      break;
    case 'withdraw':
      loadWithdraw();
      break;
    case 'transactions':
      loadTransactions();
      break;
    case 'balances':
      loadBalance();
      break;
    case 'allData':
      loadAllData();
      break;
    default:
      defaultModule();
  }
  clearResults();
  // $('.nav .nav-link').on("click", function() {
  //   $(".nav").find(".active").removeClass("active");
  //   $(this).addClass("active");
  // });
  // if (id == 'createAccount') {
  //   loadCreateAccount();
  // } 
})

defaultModule();

// loadCreateAccount();
