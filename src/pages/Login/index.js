import { Button, Input, Form, Dialog } from "antd-mobile";

import "./index.css";
const Login = () => {
	const [form] = Form.useForm();
	const onSubmit = () => {
		const values = form.getFieldsValue();
		Dialog.alert({
			content: <pre>{JSON.stringify(values, null, 2)}</pre>,
		});
	};
	return (
		<div className="login">
			<Form
				form={form}
				layout="horizontal"
				mode="card"
				footer={
					<Button block color="primary" onClick={onSubmit} size="large">
						Log in
					</Button>
				}
			>
				<Form.Item name="username">
					<Input placeholder="Phone, email, or username" />
				</Form.Item>
				<Form.Item name="password">
					<Input placeholder="Password" clearable type="password" />
				</Form.Item>
			</Form>
		</div>
	);
};

export default Login;
