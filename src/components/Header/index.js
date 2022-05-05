import React from 'react'

import s from './style.module.css'

export const Header = () => {
    return (
        <div className={s.container}>
            <div className={s.logo}>
                logo
            </div>
            <div className={s.search}>
                <input/>
            </div>
            <div className={s.rest}>
                rest button
            </div>
        
        </div>
    )
}
