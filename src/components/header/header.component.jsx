import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './header.component.scss'

const Header = () => {
	const [hidden, setHidden] = useState(false)

 	useEffect(() => {
 		document.addEventListener('click', (e) =>{
 			if(!e.target.closest('.header__nav-button-container')){
 				setHidden(false)
 			}
 		})
 	 }, [hidden])

	const handleClick = (e) =>{
		if(hidden === false){
			setHidden(true)
		}else{
			setHidden(false)
		}
	}

	console.log('Header rendered!', hidden)
	return(
		<header className='header'>
			<div className='container'>
				<nav className='header__nav'>
					<Link to='/' className='header__logo-container'>
						<p className='header__logo'>WeConnect</p>
					</Link>
					<ul className='header__nav-lists'>
						<li className='header__nav-item'><Link to='/' className='header__nav-link'>Home</Link></li>
						<li className='header__nav-item'><Link to='/' className='header__nav-link'>Jefferson</Link></li>
						<div className={ `${ hidden ? 'active' : '' } header__nav-button-container` }>
							<span onClick={ handleClick } className='header__nav-button'>
								<i className="fas fa-chevron-down header__nav-icon"></i>
							</span>
							<div className={ `header__dropdown ${ hidden ? 'active' : '' }` }>
								<li className='header__nav-item'><Link to='/signin' className='header__nav-link'>Sign In</Link></li>
								<li className='header__nav-item'><Link to='/signin' className='header__nav-link'>Sign Out</Link></li>
							</div>
						</div>
					</ul>
				</nav>
			</div>
		</header>
)}

export default Header
