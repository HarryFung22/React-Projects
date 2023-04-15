import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"

export const useLogout = () => {
    const {dispatch} = useAuthContext()

    //destructure dispatch since cannot have two instances of dispatch name
    const {dispatch: workoutsDispatch} = useWorkoutsContext()
    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})

        //reset global state for workouts when a user logs out
        workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
    }
    return {logout}
}