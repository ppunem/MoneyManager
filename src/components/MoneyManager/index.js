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
    userTitle: '',
    userAmount: '',
    userType: '',
    transactionsList: [],
    totalAmount: 0,
    income: 0,
    expenses: 0,
  }

  changeTitle = event => {
    this.setState({userTitle: event.target.value})
  }

  changeAmount = event => {
    this.setState({userAmount: event.target.value})
  }

  changeType = event => {
    this.setState({userType: event.target.value})
  }

  onDelete = id => {
    const {transactionsList} = this.state

    this.setState({
      transactionsList: transactionsList.filter(each => each.id !== id),
    })
  }

  onAddButtonClick = event => {
    event.preventDefault()
    const {
      userTitle,
      userAmount,
      userType,
      totalAmount,
      income,
      expenses,
    } = this.state

    const newTransaction = {
      id: v4(),
      title: userTitle,
      amount: userAmount,
      type: userType,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      userTitle: '',
      userAmount: '',
      userType: '',
    }))

    if (newTransaction.type === 'Income') {
      this.setState(prevState => ({
        totalAmount: prevState.totalAmount + newTransaction.amount,
        income: prevState.income + newTransaction.amount,
        expenses: prevState.expenses,
      }))
    } else {
      this.setState(prevSate => ({
        totalAmount: prevSate.totalAmount - newTransaction.amount,
        income: prevSate.income,
        expenses: prevSate.expenses + newTransaction.amount,
      }))
    }

    return (
      <MoneyDetails
        TOTALAMOUNT={totalAmount}
        INCOME={income}
        EXPENSES={expenses}
      />
    )
  }

  render() {
    const {transactionsList} = this.state

    return (
      <div className="main-container">
        <div className="greetings-container">
          <h1 className="name">HI, Richard</h1>
          <p className="greetings">
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        {this.onAddButtonClick()}
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
                />
              </div>
              <div className="label-input">
                <label htmlFor="amount-input">AMOUNT</label>
                <input
                  onChange={this.changeAmount}
                  type="text"
                  id="amount-input"
                  placeholder="AMOUNT"
                />
              </div>
              <div className="label-input">
                <label htmlFor="type-input">TITLE</label>
                <select id="type-input" onChange={this.changeType}>
                  {transactionTypeOptions.map(each => (
                    <option value={each.displayText} id={each.optionId}>
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
            <div className="columns-container">
              <h1 className="column-head">Title</h1>
              <h1 className="column-head">Amount</h1>
              <h1 className="column-head">Type</h1>
            </div>
            {transactionsList.map(eachTransaction => (
              <TransactionItem
                key={eachTransaction.id}
                transactionDetails={eachTransaction}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
