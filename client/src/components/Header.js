import React, { useState } from "react";
import logo from "../images/tune.jpg";
import home from "../images/home.svg";
import explore from "../images/explore.svg";
import account from "../images/account.svg";
import store from "../images/store.svg";
import quiz from "../images/quizlogo.png";
import trending from "../images/TrendingIcon.svg";
import "./Header.css";
import { Link, Redirect, useHistory } from "react-router-dom";

function Header(props) {

	console.log(props)

	const [homeActive, setHomeActive] = useState(false);
	const [exploreActive, setExploreActive] = useState(true);
	const [storeActive, setStoreActive] = useState(false);
	const [quizActive, setQuizActive] = useState(false);
	const [trendingActive, setTrendingActive] = useState(false);
	var [logoutStatus, setLogoutStatus] = useState(props.auth);

	const styling = {
		display: logoutStatus ? "absolute" : "none",
	};

	const loginStyle = {
		display: props.auth ? "none" : "inline",
	};

	const loginStyleOpp = {
		display: props.auth ? "inline" : "none",
	};

	const handleLogout = () => {
		props.authentication(false);
		props.getEmail(undefined);
		props.getName("");
		props.getUserId(undefined);
		setLogoutStatus(false)
	};

	const handleHome = () => {
		<Redirect to="/" />;
		if (homeActive === true) {
			setHomeActive((homeActive = true));
		} else {
			setHomeActive((homeActive) => !homeActive);
			setExploreActive((exploreActive) => false);
			setStoreActive((storeActive) => false);
			setQuizActive((quizActive) => false);
			setTrendingActive((trendingActive) => false);
		}
	};
	const handleExplore = () => {
		if (exploreActive === true) {
		} else {
			setHomeActive((homeActive) => false);
			setExploreActive((exploreActive) => !exploreActive);
			setStoreActive((storeActive) => false);
			setQuizActive((quizActive) => false);
			setTrendingActive((trendingActive) => false);
		}
	};
	const handleStore = () => {
		if (storeActive === true) {
		} else {
			setHomeActive((homeActive) => false);
			setExploreActive((exploreActive) => false);
			setStoreActive((storeActive) => !storeActive);
			setQuizActive((quizActive) => false);
			setTrendingActive((trendingActive) => false);
		}
	};
	const handleQuiz = () => {
		if (quizActive === true) {
		} else {
			setHomeActive((homeActive) => false);
			setExploreActive((exploreActive) => false);
			setStoreActive((storeActive) => false);
			setQuizActive((quizActive) => !quizActive);
			setTrendingActive((trendingActive) => false);
		}
	};
	const handleTrending = () => {
		if (trendingActive === true) {
		} else {
			setHomeActive((homeActive) => false);
			setExploreActive((exploreActive) => false);
			setStoreActive((storeActive) => false);
			setQuizActive((quizActive) => false);
			setTrendingActive((trendingActive) => !trendingActive);
		}
	};

	return (
		<div className="backest">
			<div className="header">
				<div className="left">
					<Link to="/" className="logoandname" onClick={handleHome}>
						<img className="logoImg" src={logo} alt="Logo" />
						<span className="companyName">T-Une</span>
					</Link>
				</div>
				<div className="right">
					<ul>
						<li>
							<Link to="/home">
								<img className={props.active === "home" ? "active icon" : "icon"} onClick={handleHome} src={home} alt="HomeIcon" />
							</Link>
						</li>
						<li>
							<Link to="/explore">
								<img className={props.active === "explore" ? "active icon" : "icon"} onClick={handleExplore} src={explore} alt="ExploreIcon" />
							</Link>
						</li>
						<li>
							<Link to="/store">
								<img className={props.active === "store" ? "active icon" : "icon"} onClick={handleStore} src={store} alt="StoreIcon" />
							</Link>
						</li>
						<li>
							<Link to="/quiz">
								<img className={props.active === "quiz" ? "active icon quizIcon" : "icon quizIcon"} onClick={handleQuiz} src={quiz} alt="QuizIcon" />
							</Link>
						</li>
						<li>
							<Link to="/trending">
								<img className={props.active === "trending" ? "active icon" : "icon"} onClick={handleTrending} src={trending} alt="TrendingIcon" />
							</Link>
						</li>
						<li style={loginStyle}>
							<Link to="/login">
								<img className="icon" src={account} alt="AccountIcon" />
							</Link>
						</li>
						<li style={loginStyleOpp}>
							<img className="icon" src={account} alt="AccountIcon" />
						</li>
					</ul>
					<p className="welcomeMessage">Hello, {props.user}</p>
					<p style={loginStyleOpp} className="logoutBtn" onClick={handleLogout} style={styling} >Logout</p>
				</div>
			</div>
		</div>
	);
}

export default Header;
