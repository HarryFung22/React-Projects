import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Add = () => {
  const navigate = useNavigate()

  //destructure var into individual categories
  const [book, setBook] = useState({
    title:"",
    desc:"",
    price:null,
    cover:"",
  })

  const handleChange = (e) =>{
    //spreading array into each individual element (i.e title, desc, price, cover as their seperate categories) 
    setBook((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleClick = (e) => {
    //avoid page refresh
    e.preventDefault()
      const addBooks = async () =>{
        try{
          const response = await fetch("http://localhost:5000/books", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(book)
          })
          const json = await response.json()
          console.log(json)
          navigate("/")
        }catch(err){
          console.log(err)
        }
      }
      addBooks()
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='max-w-md mx-auto bg-white p-8 rounded-md shadow-md'>
        <h1 className='text-2xl font-bold mb-4'>Add New Book</h1>
        <div className='mb-4'>
          <input className='border border-gray-300 rounded-md px-3 py-2 w-full' type="text" placeholder="title" onChange={handleChange} name="title"/>
        </div>
        <div className='mb-4'>
          <input rows="4" className='border border-gray-300 rounded-md px-3 py-2 w-full' type="text" placeholder="desc" onChange={handleChange} name="desc"/>
        </div>
        <div className='mb-4'>
          <input className='border border-gray-300 rounded-md px-3 py-2 w-full' type="number" placeholder="price" onChange={handleChange} name="price"/>
        </div>
        <div className='mb-4'>
          <input className='border border-gray-300 rounded-md px-3 py-2 w-full' type="text" placeholder="cover" onChange={handleChange} name="cover"/>
        </div>
        <button className='bg-blue-500 text-white py-2 px-4 rounded-md' onClick={handleClick}>Apply</button>
      </div>
    </div>
  )
}

export default Add