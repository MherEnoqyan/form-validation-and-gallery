import * as React from 'react';
import { Alert, Form, FormField, FormInput, Button } from 'elemental';

import styles from './style.less';

export interface IProps {  }
export interface IState {
	fields: {};
	errors: {};
}

class LoginForm extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
		let fields = {
			"basic-form-input-email": '',
			"basic-form-input-password": ''
		};
		this.state = {
			fields: fields,
			errors: {}
		}
	}

	private validation(fields) {
		let errors = {};
		let formIsValid = true;

		if (!fields["basic-form-input-email"].match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i)) {
			formIsValid = false;
			errors["basic-form-input-email"] = "Email is invalid";
		}

		if (fields["basic-form-input-password"].length < 6) {
			formIsValid = false;
			errors["basic-form-input-password"] = "Password is invalid";
		}

		errors["form_is_valid"] = formIsValid;

		return errors;
	}

	private change(field, e) {
		let {fields} = this.state;
		fields[field] = e.target.value;
		this.setState({fields});
	}

	private onSubmit() {
		let {fields} = this.state;
		let errors = this.validation(fields);
		this.setState({errors: errors});
	}

	public render() {
		let alert;
		if (this.state.errors["form_is_valid"] === false) {
			const emailErr = this.state.errors["basic-form-input-email"] ? this.state.errors["basic-form-input-email"] : '';
			const passwordErr = this.state.errors["basic-form-input-password"] ? this.state.errors["basic-form-input-password"] : '';
			alert = <Alert type="danger">{emailErr}  <br /> {passwordErr}</Alert>;
		} else if(this.state.errors["form_is_valid"] === true) {
			alert = <Alert type="success">Success</Alert>;
		}

		return (
			<div>
				{alert}
				<Form>
					<FormField label="Email address" htmlFor="basic-form-input-email">
						<FormInput onChange={this.change.bind(this, "basic-form-input-email")} autoFocus type="email" placeholder="Enter email" name="basic-form-input-email" className={this.state.errors["basic-form-input-email"] ? styles.invalid : ''} />
					</FormField>
					<FormField label="Password" htmlFor="basic-form-input-password">
						<FormInput onChange={this.change.bind(this, "basic-form-input-password")} type="password" placeholder="Enter password" name="basic-form-input-password" className={this.state.errors["basic-form-input-password"] ? styles.invalid : ''} />
					</FormField>
					<Button type="primary" onClick={this.onSubmit.bind(this)}>Log in</Button>
				</Form>
			</div>
		);
	}
}

export default LoginForm;