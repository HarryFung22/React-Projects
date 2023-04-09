import { WorkoutsContext } from "../context/WorkoutContext";
import {useContext} from 'react';

export const useWorkoutsContext = () => {
    //useContext hook returns the value of the workouts context
     const context = useContext(WorkoutsContext)

     if(!context){
        throw Error('useWorkoutContext must by used inside a WorkoutsContextProvider')
     }
     
     return context
}