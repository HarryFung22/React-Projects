import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Books = () => {
  const [books, setBooks] = useState([])  

  useEffect(() => {
    const fetchBooks = async () => {
        try{
            const response = await fetch('http://localhost:5000/books', {
                method: 'GET'
            })
            const json = await response.json()
            if(response.ok){
                setBooks(json)
            }
        }catch(err){
            console.log(err)
        }
    }
    fetchBooks()
  }, [])

  return (<div>
    <h1>My Book Review</h1>
    <div>
        {books.map(book=>(
            <div key={book.id}>
                {book.cover && <img src={book.cover} alt="" />}
                <h2>{book.title}</h2>
                <p>{book.desc}</p>
                <span>{book.price}</span>
            </div>
        ))}
    </div>
    <button><Link to="/add">Add new book</Link></button>
  </div>
  )
}

export default Books