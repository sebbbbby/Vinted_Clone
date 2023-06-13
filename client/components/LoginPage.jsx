import React, { useState, useEffect } from 'react'

const LoginPage = ({
    userId,
    onSubmit,
    setUserResponse,
    userResponse,
    setUserResponseSignUp,
    userResponseSignUp,
    setUserId,
    setShowLogin,
}) => {
    const takeInId = (event) => {
        setUserResponse(event.target.value)
    }
    const takeInSignUp = (event) => {
        setUserResponseSignUp(event.target.value)
    }
    const submitResponse = (event) => {
        event.preventDefault()
        onSubmit(userResponse)
        setUserResponse('')
    }
    //this will log you into the existing test 'seb' account
    const submitResponseGuest = (event) => {
        event.preventDefault()
        onSubmit('seb')
        setUserResponse('')
    }
    //need this seperate for signup not sign in
    const submitResponseSignUp = (event) => {
        event.preventDefault()
        newUser(userResponseSignUp)
        setUserResponseSignUp('')
    }

    const newUser = (email) => {
        setShowLogin(false)
        setUserId(userResponse)
        setUserResponseSignUp('')
        const createNewUser = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_email: email }),
        }

        fetch('/api/newuser', createNewUser)
            .then((response) => response.json())
            .then((data) => console.log('fetch data', data))
            .catch((error) => console.log('Error:', error))
    }
    return (
        <>
            <div className="GuestBtnContainer">
                <div className="GuestBtnCard">
                    <button onClick={submitResponseGuest}>
                        Continue as Guest
                    </button>
                </div>
            </div>
            <div className="LoginContainer">
                <div className="LoginCard">
                    <h1>Log-In </h1>
                    <form
                        action="inputId"
                        onSubmit={submitResponse}
                        className="formLogin"
                    >
                        <input
                            type="text"
                            value={userResponse}
                            onChange={takeInId}
                        />
                    </form>
                </div>
            </div>

            <div className="SignUpContainer">
                <div className="SignUpCard">
                    <h1>Sign-Up</h1>
                    <form
                        action="inputId"
                        onSubmit={submitResponseSignUp}
                        className="formSignUp"
                    >
                        <input
                            type="text"
                            value={userResponseSignUp}
                            onChange={takeInSignUp}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}
export default LoginPage
