import React from 'react'
import { Link } from 'react-router-dom';
import logotype from '../../assets/svg/free-icon-tinder-3800070.png'
import nameProject from '../../assets/logoName.gif'
import './index.css' 

export const Logo = ({className, href, ...props}) => {
	return (
		<div className='logoCont'>
		<Link to='/' href={href} className={className? className: "logo"} {...props}>
			<img src={logotype} alt="logo" className="logo"/>
			<img src={nameProject} alt="name" />
		</Link>
		</div>
	);
};


