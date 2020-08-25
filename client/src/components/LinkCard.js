import React from 'react'

export const LinkCard = ({ link }) => {
    return (
        <div>
            <h2>Link:</h2>
            <p>Original version: <a href = {link.to} target="_blank"  rel="noopener noreferrer">{ link.to }</a></p>
            <p>To: <a href = {link.from} target="_blank"  rel="noopener noreferrer">{ link.from }</a></p>
            <p>Count of clicks: <strong>{ link.clicks }</strong></p>
            <p>Date of creation: {new Date(link.data).toLocaleDateString()}</p>
        </div>
    )
} 