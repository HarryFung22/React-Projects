import { useEffect } from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
import {useAuthContext} from '../hooks/useAuthContext'

const Home = () => {
    //access global state of all workouts
    const {workouts, dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('http://localhost:4000/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            //response returns an array of workouts
            if(response.ok){
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        //fetch data only if user is logged in
        if(user){
            fetchWorkouts()
        }
    //add dispatch into dependency array to ensure function is re-ran after dependecy/state has changed
    }, [dispatch, user])

    return(
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => {
                    return(
                        <WorkoutDetails key={workout._id} workout={workout}/>
                    )
                })}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home