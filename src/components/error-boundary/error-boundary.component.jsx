import React from 'react'

import './error-boundary.style.scss'

class ErrorBoundary extends React.Component{
	constructor(){
		super()
		this.state = {
			hasErrord: false
		}
	}
	static getDerivedStateFromError(error){
		return { hasErrord: true }
	}

	componentDidCatch(error, info){
		console.log(error, 'componentDidCatch')
	}
	render(){
		
		if(this.state.hasErrord){
			return (
				<div className='error__boundary'>
					<figure className='error__boundary-image-container'>
						<img src='https://i.imgur.com/yW2W9SC.png' className='error__boundary-image' alt='error boundary' />
					</figure>
					<span className='error__boundary-error-message'>Something went wrong......</span>
				</div>
			)		
		}else{
			return this.props.children
		}
	}
}

export default ErrorBoundary