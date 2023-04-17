import { useState } from 'react'
import { Link } from 'react-router-dom'
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
import {useAuthContext} from '../hooks/useAuthContext'

const Update = () => {
    const {workoutID} = useWorkoutsContext()
    const {user} = useAuthContext()

    //state for schema properties
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')

    //manage state for errors in form
    const [error, setError] = useState(null)

    //handle error messages
    const [emptyFields, setEmptyFields] = useState([])

    //e represents event object
    const handleSubmit = async (e) => {
        //prevent default action (i.e. refresh page)
        e.preventDefault()
        if(!user){
            return
        }
        const workout = {title, load, reps}
        const response = await fetch(`http://localhost:4000/api/workouts/${workoutID}`, {
            method: 'PATCH',
            //convert object to json format
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        //returns res in json 
        const json = await response.json()
        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            //reset all properties of schema for next submission
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('Workout Updated', json)
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Update an existing Workout</h3>
            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />
            <label>Load (in kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />
            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />
            <button>Update Workout</button>
            <button>
                <Link to="/">Go Back</Link>
            </button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}


export default Update