// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {id, title, amount, type} = transactionDetails

  const deleteTransactionItem = () => {
    deleteTransaction(id)
  }

  return (
    <li className="container">
      <p className="item">{title}</p>
      <p className="item">Rs {amount}</p>
      <p className="item">{type}</p>
      <button
        type="button"
        onClick={deleteTransactionItem}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="del-image"
        />
      </button>
    </li>
  )
}

export default TransactionItem
