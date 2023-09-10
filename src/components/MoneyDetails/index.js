// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {TOTALAMOUNT, INCOME, EXPENSES} = props

  return (
    <div className="container">
      <div className="title-image-money-green">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="image"
        />
        <div className="title-money">
          <p className="container-title">Your Balance</p>
          <p className="container-money">{TOTALAMOUNT}</p>
        </div>
      </div>
      <div className="title-image-money-blue">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png "
          alt="income"
          className="image"
        />
        <div className="title-money">
          <p className="container-title">Your Income</p>
          <p className="container-money">{INCOME}</p>
        </div>
      </div>
      <div className="title-image-money-lavender">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png "
          alt="expenses"
          className="image"
        />
        <div className="title-money">
          <p className="container-title">Your Expenses</p>
          <p className="container-money">{EXPENSES}</p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
