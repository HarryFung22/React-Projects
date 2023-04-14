import { useState } from 'react'
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
import {useAuthContext} from '../hooks/useAuthContext'

const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()
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
            setError('You must be logged in')
            return
        }
        const workout = {title, load, reps}
        const response = await fetch('http://localhost:4000/api/workouts', {
            method: 'POST',
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
            //updating global state with payload as the input workout
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
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
            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm;