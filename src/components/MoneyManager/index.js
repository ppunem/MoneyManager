import {Component} from 'react'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  changeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  changeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  changeType = event => {
    this.setState({optionId: event.target.value})
  }

  onDelete = id => {
    const {transactionsList} = this.state

    this.setState({
      transactionsList: transactionsList.filter(each => each.id !== id),
    })
  }

  onAddButtonClick = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const type = transactionTypeOptions.find(each => each.optionId === optionId)
    const {displayText} = type
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    let expenses = 0

    transactionsList.forEach(each => {
      if (each.type === transactionTypeOptions[1].displayText) {
        expenses += each.amount
      }
    })

    return expenses
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let income = 0

    transactionsList.forEach(each => {
      if (each.type === transactionTypeOptions[0].displayText) {
        income += each.amount
      }
    })
    return income
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balance = 0
    let income = 0
    let expenses = 0

    transactionsList.forEach(each => {
      if (each.type === transactionTypeOptions[0].displayText) {
        income += each.amount
      } else {
        expenses += each.amount
      }
    })
    balance = income - expenses
    return balance
  }

  render() {
    const {transactionsList, titleInput, amountInput, optionId} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()

    return (
      <div className="main-container">
        <div className="greetings-container">
          <h1 className="name">HI, Richard</h1>
          <p className="greetings">
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          balanceAmount={balanceAmount}
          incomeAmount={incomeAmount}
          expensesAmount={expensesAmount}
        />
        <div className="bottom-section">
          <div className="form-container">
            <h1 className="form-head">Add Transaction</h1>
            <form onSubmit={this.onAddButtonClick}>
              <div className="label-input">
                <label htmlFor="title-input">TITLE</label>
                <input
                  onChange={this.changeTitle}
                  type="text"
                  id="title-input"
                  placeholder="TITLE"
                  value={titleInput}
                />
              </div>
              <div className="label-input">
                <label htmlFor="amount-input">AMOUNT</label>
                <input
                  onChange={this.changeAmount}
                  type="text"
                  id="amount-input"
                  placeholder="AMOUNT"
                  value={amountInput}
                />
              </div>
              <div className="label-input">
                <label htmlFor="type-input">TYPE</label>
                <select
                  id="type-input"
                  onChange={this.changeType}
                  value={optionId}
                >
                  {transactionTypeOptions.map(each => (
                    <option value={each.optionId} id={each.optionId}>
                      {each.displayText}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
          </div>
          <div className="history-container">
            <h1 className="history-head">History</h1>
            <ul>
              <li className="columns-container">
                <p className="column-head">Title</p>
                <p className="column-head">Amount</p>
                <p className="column-head">Type</p>
              </li>
              {transactionsList.map(eachTransaction => (
                <TransactionItem
                  key={eachTransaction.id}
                  transactionDetails={eachTransaction}
                  deleteTransaction={this.onDelete}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
