import { ChangeEventHandler } from "react";
import { IEntity } from "types";

interface SelectProps {
	label: string;
	name: string;
	value: string | number;
	onChange?: ChangeEventHandler<HTMLSelectElement>;
	options: IEntity.Genre[];
	error?: string;
}

const Select = ({ name, label, value, onChange, options, error }: SelectProps) => (
	<div className="form-group">
		<label htmlFor={name}>{label}</label>
		<select id={name} name={name} value={value} className="form-select" onChange={onChange}>
			<option value="">--Select Genre--</option>
			{options.map(({ _id, name }) => (
				<option key={_id} value={_id}>
					{name}
				</option>
			))}
		</select>

		{error && <div id={name} className="d-block invalid-feedback" children={error} />}
	</div>
);

export default Select;
