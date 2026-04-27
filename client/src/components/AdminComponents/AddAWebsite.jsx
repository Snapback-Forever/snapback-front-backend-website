import Card from 'react-bootstrap/Card';

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addWebsite, deleteWebsite } from "../../redux/reducers/websiteReducer";
import moment from 'moment';

const AddAWebsite = ({ allWebsites, trigger, setTrigger }) => {

    const dispatch = useDispatch();

    const [state, setState] = useState({
        websiteName: "",
        websiteHttp: "",
        ImageLink: "",
        aboutWebsite: ""
    });


    const handleInput = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        });
    };

    const handleAddWebsiteSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(addWebsite(state));
        setTrigger(true)
        setState({
            websiteName: "",
            websiteHttp: "",
            webSiteImageLink: "",
            aboutWebsite: ""
        });
    };

    const deleteThisWebsite = (id) => {
        setTrigger(true)
        dispatch(deleteWebsite(id))
    }



    return (
        <div >
            <h2 style={{ textAlign: "center", background: "black" }}><u>Add A Website</u></h2>
            <form onSubmit={handleAddWebsiteSubmit} style={{
                width: "100%", display: "flex", flexDirection: "column", alignItems: "center", background: "white", color: "black", padding: "2vh 0"
            }}>

                <label style={{ fontWeight: "bold" }}>Website Name:</label>

                <input
                    type="text"
                    name="websiteName"
                    value={state.websiteName}
                    onChange={handleInput}
                    required
                    style={{ background: "black", width: "70%", color: "white" }}
                    placeholder="SnapBack Website"
                    maxLength={100}
                />


                <label style={{ fontWeight: "bold" }}> Website HTTP (URL):</label>
                <input
                    type="text"
                    name="websiteHttp"
                    value={state.websiteHttp}
                    onChange={handleInput}
                    required
                    style={{ background: "black", width: "70%", color: "white" }}
                    placeholder="http://example.com"
                />


                <label style={{ fontWeight: "bold" }}> Website Image Link:</label>
                <input
                    type="text"
                    name="webSiteImageLink"
                    value={state.webSiteImageLink}
                    onChange={handleInput}
                    required
                    style={{ background: "black", width: "70%", color: "white" }}
                    placeholder="http://localhost:5173/" // This should be a cloudinary web link
                />

                <label style={{ fontWeight: "bold" }}> About Website:</label>
                <input
                    type="text"
                    name="aboutWebsite"
                    value={state.aboutWebsite}
                    onChange={handleInput}
                    required
                    style={{ background: "black", width: "70%", color: "white" }}
                    placeholder="This Is A Great Website"
                    maxLength={100}
                />


                <button className="rounded msgButton" type="submit" style={{ width: "70%", margin: "1vh" }}>Add Website</button>
            </form>


            {allWebsites.filter(web => web).length === 0 ? <h3 style={{ textAlign: "center", background: "black" }}>Currently No Websites</h3> :
                <>
                    <h2 style={{ textAlign: "center" }}><u>Current WebSites Linked To Website</u></h2>
                    {allWebsites.filter(web => web).reverse().map(web => {

                        return (
                            <Card style={{ width: '100%', margin: "1vh 0" }}>
                                <Card.Header style={{ textAlign: "end" }}>{moment(web?.createdAt).format("MMM Do YYYY")}</Card.Header>
                                <img src={web?.webSiteImageLink} style={{ maxHeight: "30vh", minWidth: "100%", fontSize: "5vh" }} />
                                <Card.Body>
                                    <Card.Title><b>Website Name: </b>{web?.websiteName}</Card.Title>
                                    <Card.Text><b>WebSite Link: </b>{web?.websiteHttp}</Card.Text>
                                    <Card.Text><b>Image Link: </b>{web?.webSiteImageLink}</Card.Text>
                                </Card.Body>
                                <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>

                                    <button style={{ background: "red", color: "white", margin: "1vh 1vw", padding: "0 1vw" }} className='rounded' onClick={() => deleteThisWebsite(web?._id)}>Delete This Website</button>

                                </div>
                            </Card>
                        )
                    })}
                </>}


        </div>

    )
}

export default AddAWebsite
