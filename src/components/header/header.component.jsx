import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './header.component.scss'

const Header = () => {
	const [hidden, setHidden] = useState(false)

	const handleChange = (e) =>{
		const checkbox = e.target.checked
		setHidden(checkbox)
	}

	console.log('Header rendered!')
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
							<input onChange={ handleChange } type="checkbox" id="icon-button" className="header__nav-checkbox" />
							<label htmlFor='icon-button' className='header__nav-button'>
								<i className="fas fa-chevron-down header__nav-icon"></i>
							</label>
							<div className='header__dropdown'>
								<li className='header__nav-item'><Link to='/' className='header__nav-link'>Sign In</Link></li>
								<li className='header__nav-item'><Link to='/' className='header__nav-link'>Sign Out</Link></li>
							</div>
						</div>
					</ul>
				</nav>
			</div>
		</header>
)}

export default Header
