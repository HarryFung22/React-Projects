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
    <div className='form'>
      <h1>Add New Book</h1>
      <input type="text" placeholder="title" onChange={handleChange} name="title"/>
      <input type="text" placeholder="desc" onChange={handleChange} name="desc"/>
      <input type="number" placeholder="price" onChange={handleChange} name="price"/>
      <input type="text" placeholder="cover" onChange={handleChange} name="cover"/>
      <button onClick={handleClick}>Apply</button>
    </div>
  )
}

export default Add