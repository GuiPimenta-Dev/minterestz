import React from 'react';
import './FloatingLabel.css';

const FloatingLabel = ({
	type,
	name,
	placeholder,
	value,
	onChangeText,
	isActive,
}) => {
	return (
		<div id='float-label'>
			<input
				type={type}
				name={name}
				value={value}
				onChange={onChangeText}
				className='bg-light btn-outline-secondary mb-1'
				autoComplete='off'
			/>

			<label className={isActive ? 'Active' : ''} htmlFor={type}>
				{placeholder}
			</label>
		</div>
	);
};

export default FloatingLabel;
