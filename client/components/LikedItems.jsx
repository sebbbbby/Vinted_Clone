import React from 'react'
export const LikedItems = ({ userId }) => {
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
        </>
    )
}

export default LikedItems
