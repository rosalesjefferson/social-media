import React from 'react'

import './form-input.component.scss'

const FormInput = ({label, ...otherprops }) =>(
	<div className='form-input'>
		<input className='form-input__field'
			{ ...otherprops }
		/>
		<label id='form-input__label' className={`${ otherprops.value.length ? 'has-value' : ''} form-input__label` }>{ label }</label>
		<label className={`${ otherprops.value.length ? 'has-value' : ''} form-input__label--2` }>{ label }</label>
	</div>
)

export default React.memo(FormInput)

        // const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
