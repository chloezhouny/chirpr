import { useState } from "react";
import "./index.css";

const Login = () => {
	const [userName, setUserName] = useState();
	const [password, setPassword] = useState();
	const handleClick = () => {
		alert("Sucess! " + userName + ", " + password);
	};

	const handleUsernameChange = (e) => {
		setUserName(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	return (
		<div className="login">
			<div>
				Username: <input onChange={handleUsernameChange} type="text" />
			</div>
			<div>
				Passowrd:{" "}
				<input type="password" onChange={handlePasswordChange} type="text" />
			</div>
			<div>
				<button onClick={handleClick}>Login</button>
			</div>
		</div>
	);
};

export default Login;
