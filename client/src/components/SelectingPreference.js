import React, { useState } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import "./SelectingPreference.css";
import axiosbaseurl from "./axiosbaseurl";

function SelectingPreference({ email }) {

    var [hh, setHH] = useState(false);
    var [edm, setEDM] = useState(false);
    var [boll, setBoll] = useState(false);
    var [kpop, setKpop] = useState(false);
    const [eMessage, setEMessage] = useState("");
    var [btnDisplay, setBtnDisplay] = useState(false);
    var [gen1, setGen1] = useState();
    var [gen2, setGen2] = useState();
    var [gen3, setGen3] = useState();
    const history = useHistory();

    const handleSubmit = () => {
        console.log(email)
        if (hh) {
            setGen1(gen1 = 2);
            setHH(hh = false);
        } else if (edm) {
            setGen1(gen1 = 1);
            setEDM(edm = false);
        } else if (boll) {
            setGen1(gen1 = 3);
            setBoll(boll = false);
        } else if (kpop) {
            setGen1(gen1 = 4);
            setKpop(kpop = false);
        }

        if (hh) {
            setGen2(gen2 = 2);
            setHH(hh = false);
        } else if (edm) {
            setGen2(gen2 = 1);
            setEDM(edm = false);
        } else if (boll) {
            setGen2(gen2 = 3);
            setBoll(boll = false);
        } else if (kpop) {
            setGen2(gen2 = 4);
            setKpop(kpop = false);
        }

        if (hh) {
            setGen3(gen3 = 2);
            setHH(hh = false);
        } else if (edm) {
            setGen3(gen3 = 1);
            setEDM(edm = false);
        } else if (boll) {
            setGen3(gen3 = 3);
            setBoll(boll = false);
        } else if (kpop) {
            setGen3(gen3 = 4);
            setKpop(kpop = false);
        }

        axiosbaseurl.post("preference", { emailId: email, gId1: gen1, gId2: gen2, gId3: gen3 })
            .then((res) => {
                res.data === "error" ? alert("Something went wrong, try again later!") : history.push({ pathname: "/login", state: { needsRefresh: true, }, })
            })
    }

    const handleSelection = () => {
        if (hh && edm && boll && kpop) {
            setEMessage("You can not select all 4 categories. Select 3 categories only.");
            setBtnDisplay(true);
        } else {
            setBtnDisplay(false);
            setEMessage(" ");
        }
    }

    const handleHH = () => {
        setHH(hh = !hh);
        handleSelection();
    }
    const handleEDM = () => {
        setEDM(edm = !edm);
        handleSelection();
    }
    const handleBoll = () => {
        setBoll(boll = !boll);
        handleSelection();
    }
    const handleKpop = () => {
        setKpop(kpop = !kpop);
        handleSelection();
    }

    return (
        <div className='SPContainer'>
            <div className="bigBox">
                <h1 className="headingSP">TELL US YOUR FAVORITE GENRE!</h1>
                <form>
                    <span>
                        <input type="checkbox" name="hh" id="hh" onClick={handleHH} />
                        <label htmlFor="hh">Hip-Hop</label>
                    </span>
                    <span>
                        <input type="checkbox" name="edm" id="edm" onClick={handleEDM} />
                        <label htmlFor="edm">EDM</label>
                    </span>
                    <span>
                        <input type="checkbox" name="bollywood" id="bollywood" onClick={handleBoll} />
                        <label htmlFor="bollywood">Bollywood</label>
                    </span>
                    <span>
                        <input type="checkbox" name="kpop" id="kpop" onClick={handleKpop} />
                        <label htmlFor="kpop">K-Pop</label>
                    </span>
                    <button disabled={btnDisplay} type="button" onClick={handleSubmit}>Submit</button>
                </form>
                <span className="errorMessage">{eMessage}</span>
            </div>
        </div>
    )
}

export default SelectingPreference