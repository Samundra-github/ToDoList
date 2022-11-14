import React, { useState, useEffect } from 'react'
import "./style.css"

const getLocalData = () => {
    const Lists = localStorage.getItem("mytodolist")

    if(Lists) {
        return JSON.parse(Lists)
    } else {
        return []
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState("")
    const [items, setItems] = useState(getLocalData())
    const addItem = () => {
        if (!inputData) {
            alert("List is Empty")
        } else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            }
            setItems([...items, myNewInputData])
            setInputData("")
        }
    }
    console.log(inputData)

    // delete items
    const deleteItem = (index) => {
        const updateItem = items.filter((curElem) => {
            return curElem.id !== index
        })
        setItems(updateItem)
    }

    // Delete all
    const removeAll = () => {
        setItems([])
    }

    // Refresh Data Not remove
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items))
    }, [items])
    

    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src="./images/todo.svg" alt="To DO LOGO" />
                        <figcaption>Add Your List Here.</figcaption>
                    </figure>

                    <div className='addItems'>
                        <input type="text" placeholder='Add Item' className='form-control' value={inputData} onChange={(event) => setInputData(event.target.value)} />
                        <i className="fa fa-plus add-btn" onClick={addItem}></i>
                    </div>
                    {/* Show Items */}

                    <div className='showItems'>
                        {items.map((curElem, index) => {
                            return (
                                <div className='eachItem' key={curElem.id}>
                                    <h3>{curElem.name}</h3>
                                    <div className='todo-btn'>
                                        <i className="far fa-edit add-btn"></i>
                                        <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>
                                    </div>
                                </div>
                            )
                        })}

                    </div>

                    <div className='showItems'>
                        <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                            <span>CHECK LIST</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo