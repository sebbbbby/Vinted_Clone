import React, { useState, useEffect } from 'react'
export const SearchBar = ({
    setShowLogin,
    signedIn,
    setSignedIn,
    signOutFunction,
}) => {
    // const [signedUser, setSignedUser] = useState('')

    const handleSignUpClick = () => {
        setShowLogin(true)
    }

    return signedIn ? (
        <div className="searchBarContainer ">
            <div className="searchBar">
                <div className="photoContainer">
                    <img
                        src="https://static.vinted.com/assets/web-logo/default/logo.svg"
                        alt="Vinted"
                        className="vintedLogo"
                    />
                </div>
                <form action="" className="searchInput1">
                    <input
                        type="text"
                        placeholder="Search for Items"
                        className="searchInput"
                    ></input>
                </form>
                <div className="signUpBtnContainer">
                    <button className="signUpBtn" onClick={signOutFunction}>
                        Sign Out
                    </button>
                    <button className="sellBtn">Sell now</button>
                </div>
            </div>
        </div>
    ) : (
        <div className="searchBarContainer ">
            <div className="searchBar">
                <div className="photoContainer">
                    <img
                        src="https://static.vinted.com/assets/web-logo/default/logo.svg"
                        alt="Vinted"
                        className="vintedLogo"
                    />
                </div>
                <form action="" className="searchInput1">
                    <input
                        type="text"
                        placeholder="Search for Items"
                        className="searchInput"
                    ></input>
                </form>
                <div className="signUpBtnContainer">
                    <button className="signUpBtn" onClick={handleSignUpClick}>
                        Sign Up | Log In
                    </button>
                    <button className="sellBtn">Sell now</button>
                </div>
            </div>
        </div>
    )
}

export default SearchBar
