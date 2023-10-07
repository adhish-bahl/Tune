import React from 'react';
import "./StoreComponent.css";

function StoreComponent({ item, link, desc, rate, price, img }) {

	const rating = rate;
	const rating1 = "⭐";
	const rating2 = "⭐⭐";
	const rating3 = "⭐⭐⭐";
	const rating4 = "⭐⭐⭐⭐";
	const rating5 = "⭐⭐⭐⭐⭐";

	return (
		<div className='storeContainer'>
			<div className="storeUpper">
				<div className="storeLeft">
					<img src={img?img:"https://global-uploads.webflow.com/5ccc8aa73871f9d0b1c81c04/628e521d65c118a588ad82cf_Sample_SuperSoft-p-800.jpeg"} alt="ProductPicture" className='productImg' />
				</div>
				<div className="storeRight">
					<a target="_blank" href={link}>
						<p className="storeHeading">
							{item}
						</p>
					</a>
					<p className="storeContent">
						<p className="productDetails">{desc}</p>
						<p className="price">Rs. {price}</p>
						<p className="smallHeading"><small>T-Une Rating</small></p>
						<p className="rating">
							{rating === 0 ? "" : ""}
							{rating === 1 ? rating1 : ""}
							{rating === 2 ? rating2 : ""}
							{rating === 3 ? rating3 : ""}
							{rating === 4 ? rating4 : ""}
							{rating === 5 ? rating5 : ""}
						</p>
					</p>
				</div>
			</div>
		</div>
	);
}

export default StoreComponent;
