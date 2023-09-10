// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, onDelete} = props
  const {id, TITLE, amount, TYPE} = transactionDetails

  const deleteTransactionItem = () => {
    onDelete(id)
  }

  return (
    <div className="container">
      <p className="item">{TITLE}</p>
      <p className="item">{amount}</p>
      <p className="item">{TYPE}</p>
      <button type="button" onClick={deleteTransactionItem}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="del-image"
        />
      </button>
    </div>
  )
}

export default TransactionItem
