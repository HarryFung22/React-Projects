import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {useAuthContext} from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'

const WorkoutDetails = ({workout}) => {
    const {user} = useAuthContext()
    const {dispatch} = useWorkoutsContext()
    const handleClick = async () => {
        if(!user){
            return
        }
        const response = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if(response.ok){
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    const updateID = () => {
        const id = workout._id
        dispatch({type: 'SET_ID', payload: id})
        console.log(id)
    }

    return(
        <div className="workout-details">
            <h4><Link onClick={updateID} to="/update">{workout.title}</Link></h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
           <span className='material-symbols-outlined' onClick={handleClick}>Delete</span>
        </div>
    )
}

export default WorkoutDetails