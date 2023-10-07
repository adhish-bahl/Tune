import React, { useState } from "react";
import "./FeedbackPage.css";
import axiosbaseurl from "./axiosbaseurl";

function FeedbackPage({ userId }) {
	const [message, setMessage] = useState("");
	const [feedback, setFeedback] = useState("");

	const handleSubmit = async () => {
		axiosbaseurl.post("feedback", { userId: userId, feedback: feedback })
			.then((res) => {
				res.data === "error" ? setMessage("Something went wrong, try again later!") : setMessage("Thank you for your valuable feedback. We'll get back to you soon!");
				setFeedback("");
			})
	};

	return (
		<div className="feedbackContainer">
			<div className="centerContainer">
				<div className="heading">Let us know what you think!</div>
				<div className="feedbackPara">
					<div className="bottom">
						<textarea name="feedbackArea" id="feedbackArea" placeholder="Feedback Here" required onChange={(e) => setFeedback(e.target.value)} value={feedback} />
						<button type="submit" id="submitButton" onClick={handleSubmit}>Submit</button>
					</div>
					<div className="messageShow">{message}</div>
				</div>
			</div>
		</div>
	);
}

export default FeedbackPage;
