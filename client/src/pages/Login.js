import React from 'react';
import Account from '../components/common/Account';
import { Input, Label, Button, ErrMsg, InputContainer } from "../styles/AccountStyle";

function Login() {

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
					/>
				</InputContainer>
                <Button type="submit">
                    LOGIN
                </Button>
            </form>
        )
    };

    return (
        <Account renderForm={renderForm} />
    )
}

export default Login;