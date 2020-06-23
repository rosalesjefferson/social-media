import React, { useState } from 'react'

import './about.style.scss'

const About = ({ timelineUser }) =>{
	console.log('about')
	const { email, firstName, lastName, created_at } = timelineUser
	return(
		<div className='about'>
			<div className='about__header-container'>
				<span className='about__icon-container'>
					<i className="fas fa-user"></i>
				</span>
				<h3 className='about__title header-3'>About</h3>
				<span className='about__icon-container'><i className="far fa-edit"></i></span>
			</div>
			<div className='about__info-container'>
				<p className='about__info'><span>Name: </span>{ firstName } { lastName }</p>
				<p className='about__info'><span>Email: </span>{ email }</p>
				<p className='about__info'><span>Address: </span>Lumban, Laguna</p>
				<p className='about__info'><span>Contact Number: </span>09543772956</p>
				<p className='about__info'><span>Birthday: </span>January 1, 2003</p>
				<p className='about__info'><span>Education: </span>LANS</p>
				<p className='about__info'><span>Work: </span>Software Engineer</p>
				<p className='about__info'><span>Joined: </span>{ created_at }</p>
				<p className='about__info'><span>Bio: </span>When a man learns to love, he must bear the risk of hatred</p>
			</div>
		</div>
	)
}

export default About