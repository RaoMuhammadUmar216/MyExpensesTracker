import React, { useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import edit from './Images/edit.svg';



// -------------- IMPROVEMENTS --------------
// 1. Input Capital Letters
// 2. Empty Inputs cannot be Added
// 3. if Balance == 0, then expenses cannot be added
// 4. Border Colors Changes base on prices.
// 5. -ve +ve symbols.
// 6. update

const AddTransaction = () => {
    const { addTransaction, transactions, deleteTransaction } = useContext(AppContext);

    const [toggleBTN, setToggleBTN] = useState(true);
    const [text, setText] = useState("");
    const [price, setPrice] = useState(0);
    const [selectedID, setSelectedID] = useState(null);

    const amounts = transactions.map(transaction => transaction.price)
    const income = +amounts.filter(amount => amount > 0).reduce((prev, next) => (prev += parseInt(next)), 0);

    const prices = transactions.map(transaction => transaction.price)
    const expenses = +prices.filter(price => price < 0).reduce((prev, next) => (prev -= next), 0);

    const priceList = transactions.map(transaction => transaction.price);
    const totalPrice = +priceList.reduce((prev, next) => (prev += parseInt(next)), 0);

    const subHandler = (e) => {


        e.preventDefault();

        if (+price < 0 && Math.abs(price) > totalPrice) {
            alert("Sorry, You don't have enough balance.")
        } else {
            const newTransaction = {
                text: text,
                price: parseInt(price),
                id: Math.floor(Math.random(new Date().getTime()) * 1000000)
            }
            if (toggleBTN) {
                if (price === 0 && text === '' || text === "" && price === "") {
                    alert("Please, Enter the Description & Price for transaction.");
                } else if (text === "") {
                    alert("Please add transaction description.");
                } else if (price === 0 || price === " ") {
                    alert("Sorry, You can't add 0 transaction");
                } else if (transactions.length === 0 && parseInt(price) < 0) {
                    alert("Sorry, You have insuficient balance.");
                } else {
                    addTransaction(newTransaction)
                }
            } else if (text && price && !toggleBTN) {
                setText(
                    transactions.map((transaction) => {
                        if (transaction.id === selectedID) {
                            return transaction.text = text;
                        }
                    })
                );

                setPrice(
                    transactions.map((transaction) => {
                        if (transaction.id === selectedID) {
                            return transaction.price = price;
                        }
                        return transaction;
                    })
                );
                setText("");
                setPrice("");
                setToggleBTN(true);

            }
        };

    }
    const editBTN = (transactionID) => {
        const transactionOBJ = transactions.find((transOBJ) => {
            return transOBJ.id === transactionID;
        });
        setText(transactionOBJ.text);
        setPrice(transactionOBJ.price);
        setSelectedID(transactionID);
        setToggleBTN(false);
    }

    return (
        <>
            {/* Header */}
            <div style={{ textAlign: 'center', marginTop: '34px' }}>
                <h2>
                    Expense Tracker App By
                </h2>
                <h4>"Rao Muhammad Umar Farooq"</h4>
                <br></br>
                <h2 >CURRENT BALANCE</h2>
                <h1>${totalPrice}</h1>
            </div>
            {/* Balance  & Expenses*/}
            <div className='IncomeExpense-container'>
                <div>
                    <h4>INCOME </h4>
                    <p style={{ textAlign: "center", color: "green" }}>${+income}</p>
                </div>
                <div className='vertical-bar'></div>
                <div>
                    <h4>EXPENSE</h4>
                    <p style={{ textAlign: "center", color: "red" }}>
                        ${+expenses}
                    </p>
                </div>
            </div >
            {/* Form */}
            <div className='form-header'>
                <div className='transaction-header'>
                    Add New Transaction
                </div>
                <br />
                <hr />
                <form onSubmit={subHandler}>
                    <div className='description-container'>
                        <h4>Description</h4>
                        <input
                            type='text'
                            placeholder='Enter Description...'
                            value={text}
                            name="text"
                            onChange={(e) => setText(e.target.value)}
                            style={{ textTransform: "capitalize" }}
                        />
                    </div>
                    <div className='price-container'>
                        <h4>Transaction Amount</h4>
                        <input
                            type='number'
                            placeholder='Enter USD Amount...'
                            value={price}
                            name='price'
                            autoCapitalize=''
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    {toggleBTN ? <button>Add Transaction</button> : <button>Edit Transaction</button>}
                </form>
                {/* List */}
                <div className='TransactionsList-container'>
                    <h4>Transaction History</h4>
                    <br />
                    <hr />
                    <br />
                    <div className='test'>
                        <ul >
                            {
                                transactions.map(transaction =>
                                    <li key={transaction.id} id="list-style" className={transaction.price > 0 ? 'list-style-green transaction-item' : "list-style-red transaction-item"}>

                                        <span style={{ textTransform: "capitalize" }}>{transaction.text}</span>
                                        <span>{transaction.price > 0 ? "+" : "-"}${Math.abs(+transaction.price)} </span>
                                        <div id='absolute'>
                                            <button className='delete-btn' onClick={() => deleteTransaction(transaction.id)}>X</button>
                                            <button className='edit-btn' onClick={() => editBTN(transaction.id)} ><img src={edit} /></button>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div >
            </div >
        </>
    )
}

export default AddTransaction