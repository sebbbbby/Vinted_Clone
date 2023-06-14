import React, { useState, useEffect } from 'react'

const LikedItems = ({ userId, userObj }) => {
    const [specificUser, setSpecificUser] = useState('')
    const [personalCloset, setPersonalCloset] = useState([])
    //use state to help display liked items later
    const [seeLikedItems, setSeeLikedItems] = useState(false)
    //need to get the personal array and add it to the liked section
    //still need delete function but will work on that later
    console.log('liked', userObj)

    useEffect(() => {
        if (userObj) {
            setSpecificUser(userObj.user_id)
        }
    }, [userObj])

    useEffect(() => {
        if (specificUser) {
            fetch(`/api/likeditems/${specificUser}`)
                .then((res) => res.json())
                .then((likedItems) => {
                    const likedObj = likedItems.map((liked) => liked)
                    console.log(likedObj, 'line 22')
                    setPersonalCloset(likedObj)
                    console.log(personalCloset)
                })
        }
    }, [specificUser])
    const openCloseCloset = () => {
        if (userId === '') {
            alert('Please Sign Up or Log in')
            return
        } else {
            if (seeLikedItems === true) {
                setSeeLikedItems(false)
            } else {
                setSeeLikedItems(true)
            }
        }
    }

    return seeLikedItems ? (
        <>
            <button onClick={openCloseCloset} className="closetBtn">
                Return Shopping
            </button>
            <div className="CardHolderContainer">
                {personalCloset.map((item) => (
                    <>
                        <div className="cardHolder">
                            <div key={crypto.randomUUID()} className="card">
                                <img
                                    className="photo"
                                    src={item.image}
                                    alt={item.title}
                                />
                                <div className="container">
                                    <span className="title">
                                        {item.title}
                                        <br></br>
                                        {item.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </>
    ) : (
        <>
            <div className="welcomeBannerContainer">
                <img
                    src="https://static.vinted.com/assets/seller-promotion/other/banner-wide-9b45d0aa9a311c4ff6013e9cf3bc2b6646468be3d2f553192c63598685fcc177.jpg"
                    alt="smiling"
                    className="bannerPhoto"
                />
            </div>
            <div className="likedItemsContainer">
                hello {userId} <br />
                <br />
                <div className="openClosetBtn">
                    <button onClick={openCloseCloset} className="closetBtn">
                        See Liked Items
                    </button>
                </div>
            </div>
        </>
    )
}

export default LikedItems
