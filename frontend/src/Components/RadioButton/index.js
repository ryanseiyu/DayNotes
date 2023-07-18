import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import "./styles.css";

function RadioButton({ selectedValue, handleChange }) {
	const CustomRadio = withStyles({
		root: {
			color: "#ffd3ca",
			"&$checked": { color: "#eb8f7a" },
		},
		checked: {},
	})((props) => <Radio color="default" {...props} />);

	return (
		<div className="radioOptions">
			<div className="radio">
				<CustomRadio
					checked={selectedValue === "all"}
					onChange={(e) => handleChange(e.target)}
					value="all"
				/>
				<span>Todos</span>
			</div>

			<div className="radio">
				<CustomRadio
					checked={selectedValue === "true"}
					onChange={(e) => handleChange(e.target)}
					value="true"
				/>
				<span>Prioridade</span>
			</div>

			<div className="radio">
				<CustomRadio
					checked={selectedValue === "false"}
					onChange={(e) => handleChange(e.target)}
					value="false"
				/>
				<span>Normal</span>
			</div>
		</div>
	);
}

export default RadioButton;
