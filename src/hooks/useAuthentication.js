import {db, app} from "../firebase/config"

import {
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    // cleanup 
    // lida com leak de memória
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth(app)

    function checkIfIsCancelled(){
        if(cancelled){
            return;
        }
    }

    // Register
    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null);

        try {
            
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {displayName: data.displayName})

            setLoading(false)

            return user

        } catch (error) {
            
            console.log(error.message)
            console.log(typeof error.message)

            let systemErroMessage

            if(error.message.includes("Password")){
                systemErroMessage = "A senha precisa conter pelo menos 6 caracteres"
            } else if(error.message.includes("email-already")) {
                systemErroMessage = "E-mail já cadastrado"
            } else {
                systemErroMessage = "Ocorreu um erro, por favor tente mais tarde"
            }
            setLoading(false)
            setError(systemErroMessage)
        }

        
    }

    // Logout - sign out

    const logout = () => {
        checkIfIsCancelled()
        signOut(auth)
    }

    // Login - sign in

    const login = async (data) => {
        checkIfIsCancelled()
        
        setLoading(true)
        setError(false)

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false)
        } catch (error) {
            let systemErroMessage;

            if(error.code.includes("auth/invalid-credential")){
                systemErroMessage = "Email ou senha incorretos"
        } else {
            systemErroMessage = "Ocorreu um erro, por favor tente mais tarde."
        }

        setError(systemErroMessage);
        setLoading(false)
    }
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {auth, createUser, logout, error, loading, login}
}