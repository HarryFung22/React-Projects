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

  const handleDelete = async (id) =>{
    try{
        const response = await fetch(`http://localhost:5000/books/${id}`, {
            method: 'DELETE'
        })
        if (response.ok){
            window.location.reload()
        }
    }catch(err){
        console.log(err)
    }
  }

  return (<div>
    <h1 className='text-4xl text-center font-light pt-4'>Book Review</h1>
    <div className=' m-auto py-20 px-4 grid gap-20 items-center justify-center'>
        <div className='max-w-[1400px] grid grid-cols-3 px-auto mx-auto gap-20 items-center'>
                {books.map(book=>(
                    <div key={book.id} className='w-[300px] h-[400px] bg-gray-100 border border-gray-300 rounded-md p-4'>
                        {book.cover && <img className='w[200px] h-[200px] mx-auto px-auto' src={book.cover} alt="" />}
                        <h2 className='text-lg font-bold mb-2'>{book.title}</h2>
                        <p className='text-gray-700 mb-4 overflow-hidden whitespace-normal'>{book.desc}</p>
                        <span>{book.price}</span>
                        <div className='items-right justify-between'>
                            <button onClick={() =>handleDelete(book.id)} className='material-symbols-outlined'>Delete</button>
                            <button><Link to={`/update/${book.id}`}>Update</Link></button>
                        </div>
                    </div>
                ))}
        </div>
    </div>
    <div className='w-full pb-10 flex items-center justify-center'>
        <button className='bg-blue-500 text-white py-2 px-4 rounded-full'><Link to="/add">Add new book</Link></button>
    </div>
  </div>
  )
}

export default Books