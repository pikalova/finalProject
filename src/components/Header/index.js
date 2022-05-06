import React from 'react'

import s from './style.module.css'

export const Header = ({ children }) => {
    // const handleChange = (event) => {
    //     const {
    //         target: {value}, 
    //     } = event;

    //     props((prevList)=> {
    //         console.log(prevList)
    //         return [...prevList]
    //     })
    // }
    return (
        <div className={s.container}>
                    {children}
            <div className={s.rest}>
                rest button
            </div>


        </div>
    )
}
