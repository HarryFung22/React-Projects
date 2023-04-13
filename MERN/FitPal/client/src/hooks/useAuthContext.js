import { AuthContext } from "../context/AuthContext";
import {useContext} from 'react';

export const useAuthContext = () => {
    //useContext hook returns the value of the workouts context
     const context = useContext(AuthContext)

     if(!context){
        throw Error('useAuthContext must by used inside a AuthContextProvider')
     }
     
     return context
}