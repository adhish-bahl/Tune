import React, { useState } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import logo from "../images/tune.jpg";
import "./Login.css";
import "./Signin.css";
import showPassword from "../images/show-password.svg";
import hidePassword from "../images/hide-password.svg";
import axios from "axios";
import axiosbaseurl from "./axiosbaseurl"; 

function Login(props) {
	const [signInMessageBoxContent, setSignInMessageBoxContent] = useState();
	const [logInMessageBoxContent, setLogInMessageBoxContent] = useState();

	const [name, setName] = useState();
	const [email1, setEmail1] = useState();
	const [pwd1, setPwd1] = useState();
	const [pwd2, setPwd2] = useState();
	const [dob, setDob] = useState();
	const [number, setNumber] = useState();

	const [email, setEmail] = useState();
	const [password, setPwd] = useState();

	const [modal, setModal] = useState(false);
	const [isRevealPwd, setIsRevealPwd] = useState(false);

	const history = useHistory();

	var nameExpression = /^[a-zA-Z]+ [a-zA-Z]+$/;
	var emailExpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	var passwordExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
	var numberExpression = /^[6-9]\d{9}$/;

	const toggleModal = () => {
		setModal(!modal);
	};

	const makeSignInRequest = () => {
		var currentTime = new Date();
		const age = currentTime.getFullYear() - parseInt(dob.substring(0, 4));

		axiosbaseurl.post("signin", { name: name, email: email1, password: pwd1, dob: dob, phoneNo: number, age: age, })
			.then((res) => {
				if (res.data === "Added") {
					setSignInMessageBoxContent("Account created successfully! Please Wait...");
					setTimeout(function () {
						props.getEmail(email1);

						history.push({
							pathname: "/selectpreference",
							state: {
								needsRefresh: true,
							},
						});

					}, 3000);
				}
				else if (res.data === "error") {
					setSignInMessageBoxContent("Error Status: 500");
				}
			})
	};

	const checkName = () => {
		if (!nameExpression.test(name)) {
			setSignInMessageBoxContent("Incorrect Name Input");
		} else {
			setSignInMessageBoxContent("");
		}
	};

	const checkEmail = () => {
		if (!emailExpression.test(email1)) {
			setSignInMessageBoxContent("Incorrect Email Input");
		} else {
			setSignInMessageBoxContent("");
		}
	};

	const checkPassword1 = () => {
		if (!passwordExpression.test(pwd1)) {
			setSignInMessageBoxContent("Incorrect Password Input");
		} else {
			setSignInMessageBoxContent("");
		}
	};

	const checkPassword2 = () => {
		if (!passwordExpression.test(pwd2)) {
			setSignInMessageBoxContent("Incorrect Password Input");
		} else {
			setSignInMessageBoxContent("");
		}
	};

	const checkPhone = () => {
		if (!numberExpression.test(number)) {
			setSignInMessageBoxContent("Incorrect phone number Input");
		} else {
			setSignInMessageBoxContent("");
		}
	};

	const handleSignIn = (e) => {
		e.preventDefault();

		if (pwd1 === pwd2) {
			if (pwd1.length < 8) {
				setSignInMessageBoxContent("Password  must be atleast 8 characters.");
			} else {
				if (!passwordExpression.test(pwd1)) {
					setSignInMessageBoxContent("Password must have atleast one number and special character.");
				} else {
					makeSignInRequest();
				}
			}
		} else {
			setSignInMessageBoxContent("Passwords does not match.");
		}
	};

	function checkLogin() {

		axiosbaseurl.post("login", { email: email, password: password, })
			.then((res) => {
				if (res.data === "Invalid") {
					setLogInMessageBoxContent("Wrong Email or Password");
					props.authentication(false);
					props.getEmail(undefined);
					props.getName("");
					props.getUserId(undefined);
				}
				else if (res.data === "error") {
					setLogInMessageBoxContent("Something went wrong, please try again");
					props.authentication(false);
					props.getEmail(undefined);
					props.getName("");
					props.getUserId(undefined);
				}
				else {
					setLogInMessageBoxContent("Logged In Sucessfully!");
					props.authentication(true);
					props.getEmail(res.data[0].email);
					props.getName(res.data[0].name);
					props.getUserId(res.data[0].userid);
					setTimeout(function () {

						history.push({
							pathname: "/",
							state: {
								needsRefresh: true,
							},
						});

					}, 1000);
					
				}

			})
	}

	const handleLogIn = (e) => {
		e.preventDefault();
		checkLogin();
	};

	const Signin = () => {
		return (
			<div className="modal">
				<div className="overlay">
					<div className="modalContent">
						<h1 className="signin">Sign-Up</h1>
						<button className="closeModal" onClick={toggleModal}>
							X
						</button>
						<div className="form">
							<form onSubmit={handleSignIn}>
								<label htmlFor="nameInput" className="nameLabel">
									Name
								</label>
								<input type="text" name="nameLabel" id="nameInput" required onChange={(e) => {setName(e.target.value);}} onBlur={checkName} />
								<label htmlFor="emailInput" className="emailLabel">E-mail id</label>
								<input type="email" name="emailLabel" id="emailInput" required onChange={(e) => setEmail1(e.target.value)} onBlur={checkEmail} />
								<label htmlFor="password1Input" className="password1Label">Password</label>
								<div className="pwdContainer">
									<input required name="password1Label" id="password1Input" type={isRevealPwd ? "text" : "password"}  onChange={(e) => setPwd1(e.target.value)} onBlur={checkPassword1} />
									<img alt="showPassword" className="pwd-toggle" title={isRevealPwd ? "Hide password" : "Show password"} src={isRevealPwd ? showPassword : hidePassword} onClick={() => setIsRevealPwd((prevState) => !prevState)} />
								</div>
								<label htmlFor="password2Input" className="password2Label"> Re-enter your password </label>
								<input type="password" name="password2Label" id="password2Input" required onChange={(e) => setPwd2(e.target.value)} onBlur={checkPassword2} />
								<label htmlFor="dobInput" className="dobLabel"> Date of Birth</label>
								<input type="date" name="dobLabel" id="dobInput" required onChange={(e) => setDob(e.target.value)} />
								<label htmlFor="numberInput" className="numberLabel">Phone Number</label>
								<input type="tel" name="numberLabel" id="numberInput" required onChange={(e) => setNumber(e.target.value)} onBlur={checkPhone} />
								<button id="signinButton" type="submit">Sign In</button>
							</form>
							<div className="message">{signInMessageBoxContent}</div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="container">
			<div className="innerBox">
				<Link to="/explore">
					<img src={logo} alt="logo" className="logo" />
				</Link>
				<h1>Login</h1>
				<form onSubmit={handleLogIn}>
					<label htmlFor="email" id="emailL">E-mail</label>
					<input required type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
					<label htmlFor="password" id="passwordL">Password</label>
					<div className="pwdContainer">
						<input required name="password" id="password" className="passwordInput" type={isRevealPwd ? "text" : "password"} onChange={(e) => setPwd(e.target.value)} />
						<img alt="showPassword" className="pwd-toggle" title={isRevealPwd ? "Hide password" : "Show password"} src={isRevealPwd ? showPassword : hidePassword} onClick={() => setIsRevealPwd((prevState) => !prevState)} />
					</div>
					<button type="submit" id="loginButton">Log-in</button>
				</form>

				<div className="message">{logInMessageBoxContent}</div>

				<p className="terms">
					By continuing, you agree to T-Une's Conditions of Use and Privacy
					Notice.
				</p>
				<p className="newAccount" onClick={toggleModal}>Create new Account</p>
			</div>

			{modal && Signin()}
		</div>
	);
}

export default Login;
