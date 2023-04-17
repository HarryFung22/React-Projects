import {createContext, useReducer} from 'react'

//since provider wraps the root app component, all other components will have access to this workoutscontext (used to manage the global state of workouts)
export const WorkoutsContext = createContext()

//state var represents previous state before undergoing state change
//action var represents dispatch function call (to update state), with type property (i.e UPDATE WORKOUT, DELETE WORKOUT, etc) + payload (data required for state changed) passed in
export const workoutsReducer = (state, action) => {
    //in each case (diff types + default case), we return a specific state value for workouts depending on type property (i.e a new object, an updated array)
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                //adding workouts (payload) + spreading current/pre-existing state of workouts into array
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                //filter through current workout state, keeps workouts that aren't the same id as the deleted workout (i.e the payload passed in)
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        case 'SET_ID':
            return {
                workoutID: action.payload
            }
        default:
            return state
    }
}



//need to provide context to component application tree (inside index.js)
//returning a template to wrap root app comp at the top of comp tree
//destructure children properties (app component wrapped inside the context provider) from the passed in props
export const WorkoutsContextProvider = ({children}) => {
    //state represents global state, dispatch is funciton to change state
    //useReducer hook takes in two args, reducer func name + initial state val
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null, 
        workoutID: null
    })
    return (
        //the specified value represents an object that can be used within any component to access the state of the workouts (an array of workouts objects)
        //setup dynamic state value (instead of hardcoding the workouts object since workouts state will change as more workouts are added/deleted/updated)
        //other components can use the state and dispatch function to update the global state of workouts
        //spread operator used to spread properties inside the object (i.e workout name, reps, load)
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            {/*This outputs the root app component (since app is wrapped inside within index.js)*/}
            {children}
        </WorkoutsContext.Provider>
    )
}