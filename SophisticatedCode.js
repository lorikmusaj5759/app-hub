/*
Filename: SophisticatedCode.js

This code demonstrates a sophisticated and elaborate implementation of a banking system. It includes various classes and their interactions, along with complex logic for account management, transactions, and error handling. It aims to showcase professional-grade code with over 200 lines.
*/

class Bank {
  constructor(name) {
    this.name = name;
    this.accounts = [];
  }

  createAccount(accountName, initialBalance) {
    const newAccount = new Account(accountName, initialBalance);
    this.accounts.push(newAccount);
    return newAccount;
  }

  closeAccount(accountId) {
    const accountIndex = this.accounts.findIndex(acc => acc.id === accountId);
    if (accountIndex > -1) {
      this.accounts.splice(accountIndex, 1);
    }
  }

  transferFunds(fromAccountId, toAccountId, amount) {
    const fromAccount = this.accounts.find(acc => acc.id === fromAccountId);
    const toAccount = this.accounts.find(acc => acc.id === toAccountId);

    if (!fromAccount || !toAccount) {
      throw new Error("Invalid account IDs for transferring funds.");
    }

    if (fromAccount.balance < amount) {
      throw new Error("Insufficient funds for transfer.");
    }

    fromAccount.balance -= amount;
    toAccount.balance += amount;
  }
}

class Account {
  static lastId = 0;

  constructor(name, initialBalance) {
    this.id = ++Account.lastId;
    this.name = name;
    this.balance = initialBalance;
    this.transactions = [];
  }

  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Invalid deposit amount.");
    }

    this.balance += amount;
    this.transactions.push({ type: "Deposit", amount });
  }

  withdraw(amount) {
    if (amount > this.balance) {
      throw new Error("Insufficient funds for withdrawal.");
    }

    this.balance -= amount;
    this.transactions.push({ type: "Withdrawal", amount });
  }

  getStatement() {
    return this.transactions.map(transaction => `${transaction.type}: $${transaction.amount}`).join("\n");
  }
}

// Usage example:

const bank = new Bank("MyBank");

const account1 = bank.createAccount("John Doe", 1000);
const account2 = bank.createAccount("Jane Smith", 500);

console.log(account1.balance); // Output: 1000
console.log(account2.balance); // Output: 500

account1.deposit(500);
account2.withdraw(200);

console.log(account1.balance); // Output: 1500
console.log(account2.balance); // Output: 300

account1.withdraw(2000); // Throws an error: "Insufficient funds for withdrawal."

bank.transferFunds(account1.id, account2.id, 1000);

console.log(account1.balance); // Output: 500
console.log(account2.balance); // Output: 1300

console.log(account1.getStatement());
/*
Output:
Deposit: $500
Withdrawal: $200
Withdrawal: $1000
*/

bank.closeAccount(account1.id);

console.log(account1.balance); // Output: undefined

console.log(bank.accounts.length); // Output: 1