import React, { useEffect, useState } from "react";
import "./Store.css";
import StoreComponent from "./StoreComponent";
import axiosbaseurl from "./axiosbaseurl"

function Store({ userId }) {
	const [data, setData] = useState([]);

	useEffect(() => {

		axiosbaseurl.post("store")
			.then((res) => {
				res.data === "error" ? alert("Something went wrong, try again later!") : setData(res.data)
			})
	}, []);

	return (
		<div className="Storecontainer">
			{data.map((post) => {
				return (
						<StoreComponent
							key={post.merchid}
							item={post.item}
							link={post.weblink}
							desc={post.description}
							rate={post.rating}
							price={post.price}
							img={post.merchPicture}
						/>
				);
			})}
		</div>
	);
}

export default Store;
