import React, { useState, useEffect } from "react";
import "./NewsComponent.css";
import likeIcon from "../images/like.svg";
import likedIcon from "../images/liked.svg";
import share from "../images/share.svg";
import axiosbaseurl from "./axiosbaseurl";

function NewsComponent(props) {

	var [like, setlike] = useState(false);
	const [likeCount, setLikeCount] = useState(parseInt(props.likes));

	useEffect(() => {
		const size = props.likedPosts.length;

		for (var i = 0; i < size; i++) {
			if (props.likedPosts[i].postid === props.id) {
				setlike((like = true));
				break;
			} else {
				setlike((like = false));
			}
		}
	}, []);

	const copyLink = () => {
		navigator.clipboard.writeText(props.source);
	};

	const likeManager = () => {
		if (like) {
			axiosbaseurl.post("unlike", { userId: props.userId, postId: props.id, likeCount: likeCount-1})
				.then((res) => {
					console.log(res.data)
					if(res.data === "error") {
						alert("Something went wrong, try again later!")
					}
					else {
						setlike((like = !like));
						setLikeCount(likeCount - 1);
					}
				})
		} else if (!like) {

			axiosbaseurl.post("like", { userId: props.userId, postId: props.id, likeCount: likeCount+1})
				.then((res) => {
					if(res.data === "error") {
						alert("Something went wrong, try again later!")
					}
					else {
						setlike((like = !like));
						setLikeCount(likeCount + 1);
					}
				})
		}
	};

	const likeStyling = {
		display: props.auth ? "inline" : "none",
	};

	const likeStylingOpp = {
		display: props.auth ? "none" : "inline",
	};

	const linkToCopy = props.source;

	return (
		<div className="newsContainer">
			<div className="newsUpper">
				<div className="newsLeft">
					<img src={props.imgLink} alt="NewsPicture" className="newsImg" />
				</div>
				<div className="newsRight">
					<p className="newsHeading">
						<a href={props.source} target="_blank">
							{props.heading}
						</a>
					</p>
					<p className="newsContent">{props.content}</p>
				</div>
			</div>
			<div className="newsLower">
				<span>
					<span style={likeStyling} className="likeIcon">
						<img src={like ? likedIcon : likeIcon} alt="like" onClick={likeManager} />
					</span>
					<span className="likeCount">
						<p className="ḷikeLabel" style={likeStylingOpp}>
							<img src={likedIcon} alt="like" className="likedLogout" />
						</p>
						{likeCount}
					</span>
				</span>
				<span className="share">
					<img src={share} alt="shareIcon" onClick={() => navigator.clipboard.writeText(linkToCopy)} />
				</span>
			</div>
		</div>
	);
}

export default NewsComponent;
