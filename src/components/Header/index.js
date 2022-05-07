import React from 'react'
import s from './style.module.css'

export const Header = ({ children }) => {

    return (
        <div className={s.container}>
            {children}
        </div>
    )
}
