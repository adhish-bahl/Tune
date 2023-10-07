import React, { useContext, useEffect, useState } from "react";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useHistory,
	Redirect,
} from "react-router-dom";

import Login from "./Login";
import Header from "./Header";
import Footer from "./Footer";
import HomePage from "./HomePage";
import Store from "./Store";
import FeedbackPage from "./FeedbackPage";
import ExplorePage from "./ExplorePage";
import Trending from "./Trending";
import Team from "./Team";
import SelectingPreference from "./SelectingPreference";
import Quiz from "./Quiz";
import PageNotFound from "./PageNotFound";

function Routing() {
	var [auth, setAuth] = useState(false);
	var [name, setName] = useState();
	var [userId, setUserId] = useState();
	var [email, setEmail] = useState();

	const pull_name = (data) => {
		const [firstName, ...rest] = data.split(" ");
		setName(firstName);
	};
	const pull_email = (data) => {
		setEmail(data);
	};
	const pull_userId = (data) => {
		setUserId(data);
	};
	const pull_auth = (data) => {
		setAuth(data);
	};

	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/ourteam">
						<Header user={auth ? name : "Guest"} auth={auth} authentication={pull_auth} getEmail={pull_email} getName={pull_name} getUserId={pull_userId} active=""/>
						<Team />
						<Footer />
					</Route>

					<Route exact path="/selectpreference">
						<SelectingPreference email={email} />
					</Route>

					<Route exact path="/trending">
						<Header user={auth ? name : "Guest"} auth={auth} authentication={pull_auth} getEmail={pull_email} getName={pull_name} getUserId={pull_userId} active="trending"/>
						<Trending />
						<Footer />
					</Route>

					<Route exact path="/feedback">
						<Header user={auth ? name : "Guest"} auth={auth} authentication={pull_auth} getEmail={pull_email} getName={pull_name} getUserId={pull_userId} active="" />
						{auth ? <FeedbackPage userId={userId} /> : <Redirect to="/login" />}
						<Footer />
					</Route>

					<Route exact path="/quiz">
						<Header user={auth ? name : "Guest"} auth={auth} authentication={pull_auth} getEmail={pull_email} getName={pull_name} getUserId={pull_userId} active="quiz" />
						<Quiz />
						<Footer />
					</Route>

					<Route exact path="/explore">
						<Header user={auth ? name : "Guest"} auth={auth} authentication={pull_auth} getEmail={pull_email} getName={pull_name} getUserId={pull_userId} active="explore" />
						<ExplorePage auth={auth} userId={userId} />
						<Footer />
					</Route>

					<Route exact path="/store">
						<Header user={auth ? name : "Guest"} auth={auth} authentication={pull_auth} getEmail={pull_email} getName={pull_name} getUserId={pull_userId} active="store" />
						<Store />
						<Footer />
					</Route>

					<Route path="/login">
						<Login authentication={pull_auth} getEmail={pull_email} getName={pull_name} getUserId={pull_userId} />
					</Route>

					<Route path="/">
						<Header user={auth ? name : "Guest"} auth={auth} authentication={pull_auth} getEmail={pull_email} getName={pull_name} getUserId={pull_userId} active="home" />
						{auth ? <HomePage auth={auth} userId={userId} /> : <Redirect to="/login" />}
						<Footer />
					</Route>

					<Route>
						<PageNotFound />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default Routing;
