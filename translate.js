const Translate = {
  portuguese() {
    document.querySelector("p.sr-only.balance").innerText = "Balanço";
    document.querySelector("#income-block-translate").innerText = "Entradas";
    document.querySelector("#expense-block-translate").innerText = "Saídas";
    document.querySelector("#total-block-translate").innerText = "Total";
    document.querySelector("p.sr-only.transactions-translate").innerText =
      "Transações";
    document.querySelector("a#new-transaction").innerText = "+ Nova transação";
    document.querySelector("tr#head th:nth-child(1)").innerText = "Descrição";
    document.querySelector("tr#head th:nth-child(2)").innerText = "Valor";
    document.querySelector("tr#head th:nth-child(3)").innerText = "Data";
    document.querySelector("div#modal-form h2").innerText = "Nova transação";
    document.querySelector("#form form input#description").placeholder =
      "Descrição";
    document.querySelector("#form form small").innerText =
      "Use o sinal - para despesas e + para ganhos";
    document.querySelector(".submit-button.cancel").innerText = "Cancelar";
    document.querySelector("#form form input#submit").value = "Enviar";
    document.querySelector("label[for = 'description']").innerText =
      "Descrição";
    document.querySelector("label[for = 'amount']").innerText = "Valor";
    document.querySelector("label[for = 'date']").innerText = "Data";
    StorageLanguage.set("pt");
    LanguageModal.toggle();
  },

  english() {
    document.querySelector("p.sr-only.balance").innerText = "Balance";
    document.querySelector("#income-block-translate").innerText = "Incomes";
    document.querySelector("#expense-block-translate").innerText = "Expenses";
    document.querySelector("#total-block-translate").innerText = "Total";
    document.querySelector("p.sr-only.transactions-translate").innerText =
      "Transactions";
    document.querySelector("a#new-transaction").innerText = "+ New transaction";
    document.querySelector("tr#head th:nth-child(1)").innerText = "Description";
    document.querySelector("tr#head th:nth-child(2)").innerText = "Value";
    document.querySelector("tr#head th:nth-child(3)").innerText = "Date";
    document.querySelector("div#modal-form h2").innerText = "New transaction";
    document.querySelector("#form form input#description").placeholder =
      "Description";
    document.querySelector("#form form small").innerText =
      "Use - for expenses and + for incomes";
    document.querySelector(".submit-button.cancel").innerText = "Cancel";
    document.querySelector("#form form input#submit").value = "Send";
    document.querySelector("label[for = 'description']").innerText =
      "Description";
    document.querySelector("label[for = 'amount']").innerText = "Amount";
    document.querySelector("label[for = 'date']").innerText = "Date";
    StorageLanguage.set("en");
    LanguageModal.toggle();
  },
};

const StorageLanguage = {
  get() {
    return localStorage.getItem("dev.finances.language") || "";
  },
  set(language) {
    localStorage.setItem("dev.finances.language", language);
  },
};

const LanguageModal = {
  toggle() {
    document.querySelector("#modal-language-set").classList.toggle("active");
  },

  remove() {
    document.querySelector("#modal-language-set").classList.remove("active");
  },
};

if (StorageLanguage.get() == "en") {
  Translate.english();
}
