import React, { useState, useEffect } from 'react'

const LikedItems = ({ userId, userObj }) => {
    const [specificUser, setSpecificUser] = useState('')
    const [personalCloset, setPersonalCloset] = useState([])
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
                .then((users) => {
                    const likedObj = users.map((user) => user)
                    console.log(likedObj)
                    // Process the retrieved data as needed
                })
        }
    }, [specificUser])

    return (
        <>
            <div className="welcomeBannerContainer">
                <img
                    src="https://static.vinted.com/assets/seller-promotion/other/banner-wide-9b45d0aa9a311c4ff6013e9cf3bc2b6646468be3d2f553192c63598685fcc177.jpg"
                    alt="smiling"
                    className="bannerPhoto"
                />
            </div>
            <div className="likedItemsContainer">hello {userId}</div>
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
        </>
    )
}

export default LikedItems
