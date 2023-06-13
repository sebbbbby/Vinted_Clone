import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import LikedItems from './LikedItems'
import LoginPage from './LoginPage'

const App = () => {
    const [items, setItems] = useState([])
    const [userId, setUserId] = useState('')
    const [likedItems, addLikedItems] = useState([])
    const [searchinput, setSearchInput] = useState('')
    const [showLogin, setShowLogin] = useState(false)
    const [signedIn, setSignedIn] = useState(false)
    const [userResponse, setUserResponse] = useState('')
    const [userResponseSignUp, setUserResponseSignUp] = useState('')
    const [allUsers, setAllUsers] = useState([])

    //getting full list of users and adding them to userEmails to then check later
    useEffect(() => {
        fetch(`/api/users`)
            .then((res) => res.json())
            .then((users) => {
                const userEmails = users.map((user) => user.user_email)
                console.log(userEmails)
                setAllUsers(userEmails)
                console.log(allUsers)
            })
    }, [])
    //just testing all users list
    useEffect(() => {
        console.log(allUsers)
    }, [allUsers, userId])

    //10 items from clothing api
    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=10')
            .then((res) => res.json())
            .then((items) => {
                setItems(items)
                console.log(items)
            })
    }, [])

    const findId = (responseText) => {
        console.log('userId', responseText)
        setUserId(responseText)
    }

    //this resets the page after a login, so maybe add sign up into this?
    const resetPage = () => {
        if (allUsers.includes(userResponse)) {
            setSignedIn(true)
            console.log('reset', userResponse)
            setShowLogin(false)
            setUserId(userResponse)
        } else {
            console.log('failed', userResponse)
            alert('created new account')
        }
    }
    //signOut function clears the userResponse and setSignedin to false to allow for the main page to pop up
    const signOutFunction = () => {
        setSignedIn(false)
        setUserResponse('')
        setUserId('')
    }

    return showLogin ? (
        <LoginPage
            onSubmit={resetPage}
            userResponse={userResponse}
            setUserResponse={setUserResponse}
            userResponseSignUp={userResponseSignUp}
            setUserResponseSignUp={setUserResponseSignUp}
            setShowLogin={setShowLogin}
        />
    ) : (
        <main>
            <SearchBar
                searchinput={searchinput}
                setShowLogin={setShowLogin}
                showLogin={showLogin}
                signedIn={signedIn}
                signOutFunction={signOutFunction}
            />
            <LikedItems userId={userId} likedItems={likedItems} />
            <div className="CardHolderContainer">
                {items.map((item) => (
                    <>
                        <div className="cardHolder">
                            <div key={item.id} className="card">
                                <img
                                    className="photo"
                                    src={item.images}
                                    alt={item.title}
                                />
                                <div className="container">
                                    <span className="title">
                                        {item.title}
                                        <br></br>
                                        {item.price}
                                    </span>
                                    <button className="heartBtn">
                                        <i className="gg-heart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </main>
    )
}

export default App
