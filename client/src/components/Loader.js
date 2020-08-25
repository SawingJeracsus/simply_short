import React from 'react'
export const Loader = () => {
    return(
        <div>
            <div className ="progress">
                <div className ="determinate" style={{width: "70%"}}></div>
            </div>
        </div>
    )
}