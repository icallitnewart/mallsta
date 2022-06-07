import React from 'react';
import Account from '../components/common/Account';
import useInputs from '../hooks/useInputs';
import { Input, Label, Button, ErrMsg, InputContainer } from "../styles/AccountStyle";

function Login() {
	const [ values, handleChange ] = useInputs({
		username : "",
		password : ""
	});

    const renderForm = ()=> {
        return (
            <form>
				<InputContainer>
					<Label htmlFor="username">
						USERNAME
					</Label>
					<Input
						type="text"
						name="username"
						id="username"
						placeholder="Username"
						value={values.username}
						onChange={handleChange}
					/>
				</InputContainer>
				<InputContainer>
					<Label htmlFor="password">
						PASSWORD
					</Label>
					<Input
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						value={values.password}
						onChange={handleChange}
					/>
				</InputContainer>
                <Button type="submit">
                    login
                </Button>
            </form>
        )
    };

    return (
        <Account renderForm={renderForm} />
    )
}

export default Login;