import React from "react";
import "./Team.css";
// import teamImg from "../images/TeamPicture.jpg";

function Team() {
	return (
		<div className="teamContainer">
			<div className="upper">
				{/* <img className="teamPicture" src={teamImg} alt="" /> */}
			</div>
			<div className="lower">
				<h1>About Us</h1>
				<div className="information">
					<div className="left">
						<div className="name">Adhish Bahl</div>
						<div className="intro">
							Heya! I am a self taught web developer and I am more interested in Front-end development. My experties are HTML V5, CSS V3, JavaScript along with ReactJS for front end development. I am also fluvent with nodeJS as well as ExpressJS. Other then web development, Video Editinga and Photography also interests me. Also I am coffee addict :)
						</div>
					</div>
					<div className="center">
						<div className="name">Shivanshi Singh</div>
						<div className="intro">
							Hello! I'm a skilled web and mobile developer with expertise in HTML, CSS, JavaScript, and Android Studio. I'm passionate about crafting engaging digital experiences. When I'm not immersed in coding, you'll often find me engaged in music, playing instruments, and dancing. I'm also a sports enthusiast. My diverse interests complement my technical proficiency, allowing me to excel in various domains.
						</div>
					</div>
					<div className="right">
						<div className="name">Ansh Bhandari</div>
						<div className="intro">
							As the digital symphony of academia plays on, I Ansh Bhandari, stand at the forefront of Christ University, passionately pursuing my MCA. Beyond the classroom, my life unfolds as a dynamic composition, weaving together the rhythm of football, the immersive world of PC gaming, the artistry of web development, and the melodic notes of music and anime.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Team;
