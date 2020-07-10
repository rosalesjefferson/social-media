import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { selectCurrentUser } from '../../redux/user/user.selectors'
import { signOutStart } from '../../redux/user/user.actions'

import './header.component.scss'

const Header = ({ currentUser, signOutStart }) => {
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
	console.log('header component')
	return(
		<header className='header'>
			<div className='container'>
				<nav className='header__nav'>
					<Link to='/' className='header__logo-container'>
						<p className='header__logo'>WeConnect</p>
					</Link>
					{  currentUser ? 
					<ul className='header__nav-lists'>
						<li className='header__nav-item'><Link to='/' className='header__nav-link'><i className="fas fa-home"></i></Link></li>
						<li className='header__nav-item'><Link to={ `/timeline/${currentUser.UID}` } className='header__nav-link timeline'>
							<figure className='header__nav-link-image-container'>
								<img className='header__nav-link-image' src={ currentUser.userDP } alt='header' />
							</figure>
							<span className='header__nav-link-image-name'>{currentUser.firstName}</span>
						</Link></li>
						<div className={ `${ hidden ? 'active' : '' } header__nav-button-container` }>
							<span onClick={ handleClick } className='header__nav-button'>
								<i className={ `${ hidden ? 'active' : '' } fas fa-caret-down` }></i>
							</span>
							<div className={ `header__dropdown ${ hidden ? 'active' : '' }` }>
								<Link to='/suggested' className='header__dropdown-link'>Suggested</Link>
								<div onClick={ signOutStart } className='header__dropdown-link'>Sign Out</div>
							</div>
						</div>
					</ul>
					: null
				}
				</nav>
			</div>
		</header>
)}

const mapStateStateToProps = (state) =>({
	currentUser: selectCurrentUser(state)
})

const mapToDispatch = (dispatch) => ({
	signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateStateToProps, mapToDispatch)(Header)

 // <li to='/' className='header__nav-item'><div className='header__nav-link'>Timeline</div></li>
	// 							    <li to='/' className='header__nav-item'><div className='header__nav-link'>Settings</div></li>
	// 								<li onClick={ signOutStart } className='header__nav-item'><div className='header__nav-link'>Sign Out</div></li>