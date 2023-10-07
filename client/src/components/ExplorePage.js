import React, { useState, useEffect } from "react";
import NewsComponent from "./NewsComponent";
import "./ExplorePage.css";
import axiosbaseurl from "./axiosbaseurl";

function ExplorePage({ auth, userId }) {
	const [postsData, setPostsData] = useState([]);
	const [userData, setUserData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			console.log(userId)
			axiosbaseurl.post("posts")
			.then((res) => {
				res.data === "error" ? alert("Something went wrong, try again later!") : setPostsData(res.data)
			})

			axiosbaseurl.post("getLikes", { userId: userId })
			.then((res) => {
				res.data === "error" ? alert("Something went wrong, try again later!") : setUserData(res.data)
			})
		}
		fetchData();
	}, []);

	return (
		<div className="exploreContainer">
			{postsData.map((post) => {
				return (
					<div >
						<NewsComponent key={post.postid} id={post.postid} heading={post.summary} content={post.content} imgLink={post.image_link} likes={post.likes} source={post.source} auth={auth} userId={userId} likedPosts={userData} />
					</div>
				);
			})}
		</div>
	);
}

export default ExplorePage;
