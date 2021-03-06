const Modal = {
  toggle() {
    document.querySelector("#modal-background").classList.toggle("active");
  },

  remove() {
    document.querySelector("#modal-background").classList.remove("active");
  },
};

const DarkMode = {
  toggleDarkMode() {
    document.getElementsByTagName("body")[0].classList.toggle("dark");
    document.getElementsByTagName("header")[0].classList.toggle("dark");
    document.getElementsByTagName("footer")[0].classList.toggle("dark");
    document.getElementsByTagName("a")[0].classList.toggle("dark");
    document.getElementsByTagName("footer")[0].classList.toggle("dark");
    document.querySelector("#modal-form").classList.toggle("dark");
    document.querySelector("#modal-language-set").classList.toggle("dark");

    const td = document.getElementsByTagName("td");
    for (let index in td) {
      td[index]?.classList?.toggle("dark");
    }
    const th = document.getElementsByTagName("th");
    for (index2 in th) {
      th[index2]?.classList?.toggle("dark");
    }

    const block = document.getElementsByClassName("block");
    for (let index3 in block) {
      block[index3]?.classList?.toggle("dark");
    }

    const ls = document.querySelectorAll(".language-selector");
    for (let index4 in ls) {
      ls[index4].classList.toggle("dark");
    }

    let source = document.querySelector("#darkmode img").getAttribute("src");
    document
      .querySelector("#darkmode img")
      .setAttribute(
        "src",
        source == "assets/darkmode.svg"
          ? "assets/lightmode.svg"
          : "assets/darkmode.svg"
      );
  },
};

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("dev.finances.transactions")) || [];
  },
  set(transactions) {
    localStorage.setItem(
      "dev.finances.transactions",
      JSON.stringify(transactions)
    );
  },
};

const transactions = Storage.get();

const Transaction = {
  income(value) {
    income += value;

    const block = document.querySelector("#income-block");
    block.innerText = `R$${income.toFixed(2)}`;
  },
  expenses(value) {
    expense += value;

    const block = document.querySelector("#expense-block");
    block.innerText = `R$${Math.abs(expense).toFixed(2)}`;
  },
  total() {
    total = income + expense;

    const block = document.querySelector("#total-block");
    block.innerText = `R$${total.toFixed(2)}`;

    if (total < 0) {
      document.querySelector(".total.block").classList.add("bad-credit");
    } else if (total >= 0) {
      document.querySelector(".total.block").classList.remove("bad-credit");
    }
  },
};

const TransactionFilter = {
  filterIncome() {
    transactionIndex = 0;
    DOM.resetTransaction();
    for (let index in transactions) {
      if (transactions[index].amount > 0) {
        DOM.addTransaction(transactions[index], transactionIndex);
      }
      transactionIndex++;
    }
  },
  filterExpense() {
    transactionIndex = 0;
    DOM.resetTransaction();
    for (let index in transactions) {
      if (transactions[index].amount < 0) {
        DOM.addTransaction(transactions[index], transactionIndex);
      }
      transactionIndex++;
    }
  },
  filterTotal() {
    transactionIndex = 0;
    DOM.resetTransaction();
    for (let index in transactions) {
      DOM.addTransaction(transactions[index], transactionIndex);
      transactionIndex++;
    }
  },
};

const DOM = {
  addTransaction(transaction, transactionIndex) {
    const container = document.querySelector("#table-container");
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, transactionIndex);
    container.appendChild(tr);
  },

  innerHTMLTransaction(transaction, transactionIndex) {
    let className;
    if (transaction.amount > 0) {
      className = "income";
    }

    if (transaction.amount < 0) {
      className = "expense";
    }
    const html = `<tr>
    <td>${transaction.description}</td>
    <td class="${className}">R$ ${transaction.amount.toFixed(2)}</td>
    <td>${transaction.date}</td>
    <td class="remove-button">
      <img src="assets/minus.svg" onclick="DOM.removeTransaction(${transactionIndex})" alt="Remover transa????o" />
    </td>
  </tr>`;

    return html;
  },
  resetTransaction() {
    let container = document.querySelector("#table-container");
    container.innerHTML = "";
  },

  resetTransactionsBlock() {
    expense = 0;
    income = 0;
    total = 0;
    Transaction.income(0);
    Transaction.expenses(0);
    Transaction.total();
  },

  removeTransaction(transactionIndex) {
    transactions.splice(transactionIndex, 1);
    workFlow.addAnother();
  },
};

const workFlow = {
  init() {
    transactionIndex = 0;
    for (let index in transactions) {
      DOM.addTransaction(transactions[index], transactionIndex);
      transactionIndex++;
      if (transactions[index].amount > 0) {
        Transaction.income(transactions[index].amount);
      } else if (transactions[index].amount < 0) {
        Transaction.expenses(transactions[index].amount);
      }
      Transaction.total();
    }
  },
  addAnother() {
    DOM.resetTransaction();
    DOM.resetTransactionsBlock();
    Storage.set(transactions);
    workFlow.init();
  },
};

const formCatcher = {
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),

  catcher(event) {
    event.preventDefault();
    transactions.push(formCatcher.getValues());
    workFlow.addAnother();
  },

  dateFormater(date) {
    const dateAux = date.split("-");
    return `${dateAux[2]}/${dateAux[1]}/${dateAux[0]}`;
  },

  getValues() {
    return {
      description: formCatcher.description.value,
      amount: Number(formCatcher.amount.value),
      date: formCatcher.dateFormater(formCatcher.date.value),
    };
  },
};

var income = 0;
var expense = 0;
var total = 0;
var transactionIndex = 0;

workFlow.init();
