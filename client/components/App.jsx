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
    const [allEmails, setAllEmails] = useState([])
    const [userObj, setUserObj] = useState([])
    const [test, setTest] = useState([])

    //getting full list of users and adding them to userEmails to then check later
    useEffect(() => {
        fetch(`/api/users`)
            .then((res) => res.json())
            .then((users) => {
                const userEmailsObj = users.map((user) => user)
                // console.log(userEmailsObj)
                setAllUsers(userEmailsObj)
            })
    }, [userId])

    useEffect(() => {
        const userEmails = allUsers.map((user) => ({
            user_id: user.user_id,
            user_email: user.user_email,
        }))
        setAllEmails(userEmails)
    }, [allUsers, userId])

    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=10')
            .then((res) => res.json())
            .then((items) => {
                setItems(items)
                // console.log(items)
            })
    }, [])

    const findId = (responseText) => {
        console.log('userId', responseText)
        setUserId(responseText)
    }

    //this resets the page after a login, so maybe add sign up into this?
    const resetPage = () => {
        const foundEmailObj = allEmails.find(
            (emailObj) => emailObj.user_email === userResponse
        )

        if (foundEmailObj) {
            setSignedIn(true)
            console.log('reset', foundEmailObj)
            setShowLogin(false)
            setUserObj(foundEmailObj)
            setUserId(userResponse)
        } else {
            console.log('failed', userResponse)
        }
    }
    //signOut function clears the userResponse and setSignedin to false to allow for the main page to pop up
    const signOutFunction = () => {
        setSignedIn(false)
        setUserResponse('')
        setUserId('')
    }
    const likedItemBtn = (item) => {
        setUserId(userId)
        console.log(userId)
        console.log('BIG BALLER', userObj.user_id)

        if (userId === '') {
            alert('please sign in')
        } else {
            const likedItemList = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    clothes_id: item.id,
                    title: item.title,
                    price: item.price,
                    category: item.category,
                    description: item.description,
                    image: item.image,
                    user_id: userObj.user_id,
                }),
            }

            fetch('/api/likeditem', likedItemList)
                .then((response) => response.json())
                .then((data) => console.log('fetch data', data))
                .catch((error) => console.log('Error:', error))
        }
    }

    return showLogin ? (
        <LoginPage
            onSubmit={resetPage}
            userResponse={userResponse}
            setUserResponse={setUserResponse}
            userResponseSignUp={userResponseSignUp}
            setUserResponseSignUp={setUserResponseSignUp}
            setShowLogin={setShowLogin}
            setSignedIn={setSignedIn}
            setUserId={setUserId}
            allUsers={allUsers}
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
            <LikedItems
                userId={userId}
                likedItems={likedItems}
                userObj={userObj}
            />
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
                                    <button
                                        onClick={() => likedItemBtn(item)}
                                        className="heartBtn"
                                    >
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
