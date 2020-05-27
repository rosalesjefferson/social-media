import React from 'react'

import './custom-button.component.scss'

const CustomButton = ({children, ...otherProps}) => (
	<div className='custom-button__container'>
		<button className='custom-button' { ...otherProps }>
			{ children }
		</button>
	</div>
)

export default CustomButton