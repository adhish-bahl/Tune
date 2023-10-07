import React, { useState, useEffect } from "react";
import "./Trending.css";
import TrendingRow from "./TrendingRow";
import axiosbaseurl from "./axiosbaseurl";

function Trending() {
	var [data, setData] = useState({});

	useEffect(() => {
		async function fetchData() {
			//  function fetchData() {
			const request = await axiosbaseurl.get("Trending.php");
			// const request = axiosbaseurl.get("Trending.php");
			setData((data = request.data));
			console.table(request.data);
			return request;
		}
		fetchData();
	}, []);

	return (
		<div className="trendingContainer">
			<div className="heading">Trending Tracks</div>
			<div className="section">
				<div className="trendingTable" id="trendingTable"></div>
				<TrendingRow data={data} />
			</div>
		</div>
	);
}

export default Trending;
