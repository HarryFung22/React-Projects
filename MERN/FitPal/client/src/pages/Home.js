import { useEffect } from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'

const Home = () => {
    //access global state of all workouts
    const {workouts, dispatch} = useWorkoutsContext()
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('http://localhost:4000/api/workouts')
            const json = await response.json()

            //response returns an array of workouts
            if(response.ok){
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        fetchWorkouts()
    //add dispatch into dependency array to ensure function is re-ran after dependecy/state has changed
    }, [dispatch])

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