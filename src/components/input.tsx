import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

interface InputProps {
	label: string;
	name: string;
	value: string | number;
	type?: HTMLInputTypeAttribute;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	error?: string;
}

const Input = ({ name, label, type, value, onChange, error }: InputProps) => (
	<div className="form-group">
		<label htmlFor={name}>{label}</label>
		<input
			required
			className="form-control"
			id={name}
			type={type}
			name={name}
			value={value}
			onChange={onChange}
		/>
		{error && <div id={name} className="d-block invalid-feedback" children={error} />}
	</div>
);

export default Input;
