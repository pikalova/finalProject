import React from 'react'
import logotype from '../../assets/svg/free-icon-tinder-3800070.png'
import './index.css'

export const Logo = ({className, href, ...props}) => {
	return (
		<a href={href} className={className? className: "logo"} {...props}>
			<img src={logotype} alt="logo" className="logo"/>
		</a>
	);
};


