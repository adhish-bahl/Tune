import React, { useState, useEffect } from "react";
import "./HomePage.css";
import NewsComponent from "./NewsComponent";
import axiosbaseurl from "./axiosbaseurl";

function HomePage({ auth, userId }) {

	const [data, setData] = useState([]);
	const [likesData, setLikesData] = useState([]);

	useEffect(() => {
		axiosbaseurl.post("getLikes", { userId: userId })
			.then((res) => {
				res.data === "error" ? alert("Something went wrong, try again later!") : setLikesData(res.data)
			})

		axiosbaseurl.post("postPref", { userId: userId })
			.then((res) => {
				res.data === "error" ? alert("Something went wrong, try again later!") : setData(res.data)
			})
	}, []);

	return (
		<div className="homeContainer">
			{console.log(data)}
			{data.map((post) => {
				return (
					<NewsComponent
						key={post.postid}
						id={post.postid}
						heading={post.summary}
						content={post.content}
						imgLink={post.image_link}
						likes={post.likes}
						source={post.source}
						auth={auth}
						userId={auth ? userId : "001"}
						likedPosts={likesData}
					/>
				);
			})}
		</div>
	);
}

export default HomePage;
