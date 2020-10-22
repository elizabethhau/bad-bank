// const baseURL = 'http://localhost:3001/account'
const baseURL = 'http://167.71.108.191:3001/account'
function create() {
  // -------------------------------------
  //  YOUR CODE
  //  Create user account on server
  // -------------------------------------
  console.log("hitting create!!");

  let name = document.getElementById("createAccountName").value;
  let email = document.getElementById("createAccountEmail").value;
  let password = document.getElementById("createAccountPassword").value;
  const url = `${baseURL}/create/${name}/${email}/${password}`;
  superagent
    .get(url)
    .then((res) => {
      console.log("success!!");
      console.log(res);
      if (res.text !== 'success') {
        document.getElementById("results").innerHTML = `
        <div class="alert alert-warning" role="alert">
            ${res.text} for ${email}
        </div>`;
      } else {
          document.getElementById("results").innerHTML = `
        <div class="alert alert-success" role="alert">
            Successfully created account for ${name} and ${email}!
        </div>`;
      }
      
    })
    .catch((err) => {
      console.log(err);
      document.getElementById("results").innerHTML = `
      <div class="alert alert-danger" role="alert">
        There was an error while creating an account for ${name}
      </div>`;
    });
}

function login() {
  // -------------------------------------
  //  YOUR CODE
  //  Confirm credentials on server
  // -------------------------------------
  console.log('clicked on log in')
  let email = document.getElementById("loginEmail").value
  let password = document.getElementById("loginPassword").value
  const url = `${baseURL}/login/${email}/${password}`
  superagent
    .get(url)
    .then((res) => {
        console.log('successful')
        console.log(res)
        console.log(res.body)
        document.getElementById("results").innerHTML = `
        <div class="alert alert-success" role="alert">
            Login successful!
        </div>`;
    })
    .catch((err) => {
        console.log('error')
        console.log(err)
        document.getElementById("results").innerHTML = `
            <div class="alert alert-danger" role="alert">
                Invalid email or password
            </div>`;
    })
}

function deposit() {
  // -------------------------------------
  //  YOUR CODE
  //  Deposit funds user funds on server
  // -------------------------------------
  console.log('clicked on deposit')
  let email = document.getElementById("depositEmail").value
  let amount = document.getElementById("depositAmount").value
  console.log(email)
  console.log(amount)
  const url = `${baseURL}/deposit/${email}/${amount}`
  superagent
    .get(url)
    .then((res) => {
        console.log('success')
        if (res.text !== 'success') {
            document.getElementById("results").innerHTML = `
            <div class="alert alert-warning" role="alert">
                ${res.text}
            </div>`;
          } else {
              document.getElementById("results").innerHTML = `
            <div class="alert alert-success" role="alert">
                Successfully deposited $${amount} into ${email}'s account
            </div>`;
          }
    })
    .catch((err) => {
        console.log(err)
    })
}

function withdraw() {
  // -------------------------------------
  //  YOUR CODE
  //  Withdraw funds user funds on server
  // -------------------------------------
  console.log('clicked on withdraw')
  let email = document.getElementById("withdrawEmail").value
  let amount = document.getElementById("withdrawAmount").value
  console.log(email)
  console.log(amount)
  const url = `${baseURL}/withdraw/${email}/${amount}`
  superagent
    .get(url)
    .then((res) => {
        console.log('success')
        if (res.text !== 'success') {
            document.getElementById("results").innerHTML = `
            <div class="alert alert-warning" role="alert">
                ${res.text}
            </div>`;
          } else {
              document.getElementById("results").innerHTML = `
            <div class="alert alert-success" role="alert">
                Successfully withdrew $${amount} from ${email}'s account
            </div>`;
          }
    })
    .catch((err) => {
        console.log(err)
    })
}

function transactions() {
  // -------------------------------------
  //  YOUR CODE
  //  Get all user transactions
  // -------------------------------------
  console.log('clicked on transactions')
  let email = document.getElementById("transactionsEmail").value
  console.log(email)
  const url = `${baseURL}/transactions/${email}`
  superagent
    .get(url)
    .then((res) => {
        console.log('success')
        console.log(res)
        if (res.body) {
          console.log(res.body)
          let resultsDiv = document.getElementById("results");
          resultsString = ''
        resultsString = `
            <table class="table">
              <thead>
                <tr>`;
          let tableHeaders = Object.keys(res.body[0])      
          for (let i = 0; i < tableHeaders.length; i++) {
            resultsString += `<th scope="col">${tableHeaders[i]}</th>`
          }
          resultsString += `</tr>
          </thead>
          <tbody>
          `;
          for (let i = 0; i < res.body.length; i++) {
            resultsString  += `<tr>`;
            for (let j = 0; j < tableHeaders.length; j++) {
              let currentHeader = tableHeaders[j]
              resultsString += `<td>${res.body[i][currentHeader]}</td>`
            }
            resultsString += `</tr>`
            
          }
          resultsString += `</tbody></table>`
          resultsDiv.innerHTML = resultsString;
        }
    })
    .catch((err) => {
        console.log(err)
    })
}

function balance() {
  // -------------------------------------
  //  YOUR CODE
  //  Get user balance
  // -------------------------------------
  console.log('clicked on balance')
  let email = document.getElementById("balanceEmail").value
  console.log(email)
  const url = `${baseURL}/transactions/${email}`
  superagent
    .get(url)
    .then((res) => {
        console.log('success')
        console.log(res)
        let transactions = res.body
        if (transactions) {
          let balance = transactions.reduce((acc, curr) => {return acc + curr.amount}, 0)
          document.getElementById("results").innerHTML = `
          <div class="alert alert-success" role="alert">
              ${email}'s account balance is $${balance}
          </div>`;
        }
    })
    .catch((err) => {
        console.log(err)
    })
}

function allData() {
  // -------------------------------------
  //  YOUR CODE
  //  Get all data
  // -------------------------------------
  const url = `${baseURL}/all`
  superagent
    .get(url)
    .then((res) => {
        console.log('success')
        console.log(res)
        let results = document.getElementById("results");
        let accountsInfo = res.body
        for (let i = 0; i < accountsInfo.length; i++) {
            results.innerHTML += `<p>${JSON.stringify(accountsInfo[i])}`
        }
        console.log(accountsInfo)
        // document.getElementById("results").innerHTML = accountsInfo
        
    })
    .catch((err) => {
        console.log(err)
    })
}
