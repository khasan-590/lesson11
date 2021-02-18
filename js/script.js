"use strict";

function isNumbers(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
function isString(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}


let start = document.getElementById('start'),
		btnPlus = document.getElementsByTagName('button'),
		incomePlus = btnPlus[0],
		expensesPlus = btnPlus[1],
		getCheckBox = document.querySelector('#deposit-check'),
		additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
		budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
		budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
		expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
		additionalIncomevalue = document.getElementsByClassName('additional_income-value')[0],
		additionalExpensesvalue = document.getElementsByClassName('additional_expenses-value')[0],
		additionalExpensesItem = document.querySelector('.additional_expenses-item'),
		incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
		targetMonthValue = document.getElementsByClassName('target_month-value')[0],
		salaryAmount = document.querySelector('.salary-amount'),
		getExpenseName = document.getElementsByClassName('expenses-title'),
		expensesItems = document.querySelectorAll('.expenses-items'),
		getTargetAmount = document.getElementsByClassName('target-amount'),
		getSum = document.querySelector('.deposit-amount'),
		additionalExpenses = document.querySelector('.additional_expenses'),
		getProcent = document.querySelector('.deposit-percent'),
		incomeItems = document.querySelectorAll('.income-items'),
		periodSelect = document.querySelector('.period-select'),
		periodAmount = document.querySelector('.period-amount');


		let appData = {
				income: {},
				addIncome: [],
				expenses: {},
				deposit: false,
				incomeMonth: 0,
				precentDeposit: 0,
				moneyDeposit: 0,
				addExpenses: [],
				budget: 0,
				budgetDay: 0,
				budgetMonth: 0,
				expensesMonth: 0,
				

				start : function() {
					salaryAmount.addEventListener('input' , function (event){
						if(salaryAmount.value === '') {
							start.removeAttribute('disabled');
						} else {
							start.setAttribute('disabled' , 'true');
						}
	
					});
					appData.budget = +salaryAmount.value;
					
					
					appData.getExpenses();
					appData.getIncome();
					appData.getExpensesMonth();
					appData.getAddExpenses();
					appData.getAddIncome();
					appData.getBudget();

					appData.showResult();
				},
				showResult: function() {
					budgetMonthValue.value = appData.budgetMonth;
					budgetDayValue.value = appData.budgetDay;
					expensesMonthValue.value = appData.expensesMonth;
					additionalExpensesvalue.value = appData.addExpenses.join(', ');
					additionalIncomevalue.value = appData.addIncome.join(', ');
					targetMonthValue.value = Math.ceil(appData.getTargetMonth());
					incomePeriodValue.value = appData.calcPeriod();
					// 
					periodSelect.addEventListener('input', function () {
					incomePeriodValue.value = appData.calcPeriod();
					});
				},
				addExpensesBlock: function(){
					let cloneExpensesItem = expensesItems[0].cloneNode(true);
					expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
					expensesItems = document.querySelectorAll('.expenses-items');
					if(expensesItems.length === 3) {
						expensesPlus.style.display = 'none';
					}
				},
				getExpenses: function(){
					expensesItems.forEach(function(item){
						let itemExpenses = item.querySelector('.expenses-title').value;
						let cashExpenses = item.querySelector('.expenses-amount').value;
						if(itemExpenses !== '' && cashExpenses !== '') {
							appData.expenses[itemExpenses] = cashExpenses;
						}
					});
				},
				addIncomeBlock: function () {
					// 
					let cloneIncomeItem = incomeItems[0].cloneNode(true);
					incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
					incomeItems = document.querySelectorAll('.income-items');
					if(incomeItems.length === 3) {
						incomePlus.style.display = 'none';
					}
					// 
				},
				getIncome: function(){
						incomeItems.forEach(function(item){
						let itemIncome = item.querySelector('.income-title').value;
						let cashIncome = item.querySelector('.income-amount').value;
						if(itemIncome !== '' && cashIncome !== '') {
							appData.income[itemIncome] = cashIncome;
						}
					});
					// 
				},
				getAddExpenses: function(){
					let addExpenses = additionalExpensesItem.value.split(", ");
					addExpenses.forEach(function(item){
						item = item.trim();
						if (item !== '' ){
							appData.addExpenses.push(item);
						}
					});
				},

				getAddIncome: function(){
					 additionalIncomeItem.forEach(function(item) {
						let itemValue = item.value.trim();
						if (itemValue !== '' ) {
							appData.addIncome.push(itemValue);
						}
					});
				},

				getExpensesMonth: function (){
					for ( let key in appData.expenses) {
						appData.expensesMonth += appData.expenses[key];
					}
				},
				getBudget: function () {
					appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
					appData.budgetDay = Math.floor(appData.budgetMonth / 30);
				},
		
				getTargetMonth: function (){
					return getTargetAmount.value / appData.budgetMonth;
				},
			
				 getStatusIncome: function () {
					if (appData.budgetDay >= 1200) {
						return("У вас высокий уровень дохода");
					} else if (appData.budgetDay > 600 && appData.budgetDay < 1200) {
						return('У вас средний уровень дохода');
					} else if (appData.budgetDay <=600 && appData.budgetDay  > 0) {
						return('К сожалению у вас уровень дохода ниже среднего');
					} else if (appData.budgetDay < 0) {
						return('Что то пошло не так');
					}
				},
				
				// getInfoDeposit: function () {
				// 	if(appData.deposit){
				// 		do{
				// 			appData.precentDeposit = +prompt('Какой годовой процент?' , "10");
				// 			 } while (!isNumbers(appData.precentDeposit));//пока пользователь не введёт число
				// 			 do{
				// 				appData.moneyDeposit = +prompt('Какая сумма заложена?' , 10000);
				// 				 } while (!isNumbers(appData.moneyDeposit));//пока пользователь не введёт число
				// 	}
				// },
				
				calcPeriod: function (e) {
					// document.querySelector('.period-select').addEventListener('input' , appData.calcSaveMoney);
					periodSelect.addEventListener('input', function () {
						periodAmount.innerHTML = periodSelect.value;
					});
					return  appData.budgetMonth * periodSelect.value;
				},
				// 
				
				// eventStart: function (event) { 
				// 	if(salaryAmount.value === '') {
				// 		start.removeEventListener('click', appData.eventStart);
				// 		return;
				// 	}
				//  }
			};
			start.setAttribute('disabled' , 'true');
			start.addEventListener('click', appData.start);
			// start.addEventListener('click', appData.eventStart);

			expensesPlus.addEventListener('click' , appData.addExpensesBlock);
			incomePlus.addEventListener('click' , appData.addIncomeBlock);

			

			

			// appData.getInfoDeposit();
			// appData.calcPeriod();
						
			// for (let keys in appData) {
			// 	console.log("Наша программа    включает в себя данные." + keys + " = " + appData[keys] + []);
			// }
			
		