import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, withRouter, Redirect, Link } from "react-router-dom";
import { createComment , updateComment } from './ApiCore'
import Layout from "./Layout";
import moment from "moment";
import "../css/CreateReview.css"

const CreateReview = ({movieId, edtcomment, setEdtcomment, edtuser, setEdtuser, editnow, setEditnow}) => {
    const [user, setUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)
    const init = () => {
        var userLoggedIn = localStorage.getItem('USER')
        if (userLoggedIn !== null) {
            setUser(JSON.parse(userLoggedIn))
            setLoggedIn(true)
        }
    }

    useEffect(() => {
        init()
    }, [])
    

    const handleChange = (e) => {
        setEdtcomment(e.target.value)
    }
    const cancelEdit = () => {
        setEdtuser(null);
        setEdtcomment("");
        setEditnow(false);
    }

    
    const handleSubmit = () => {
        if(edtuser == null){
            var requestBody={
                content: edtcomment
            }
            createComment(requestBody, movieId ).then((res)=>{
                console.log("res in submitting create review : ", res);
                setEdtcomment('');
            })
        }else{
            console.log(JSON.stringify(edtuser));
            var requestBody= edtuser;
            updateComment(requestBody, movieId ).then((res)=>{
                console.log("res in submitting create review : ", res);
                setEdtcomment('');
            })
        }
        
        
    }
    return (
        <div className="create-review-container row">
            <div>
                <div><img className="user-image" src={user.imageUrl?user.imageUrl:"//s.ytimg.com/yts/img/avatar_720-vflYJnzBZ.png"} /></div>
            </div>
            <div className="row col-5 mx-0 ">
                {
                    loggedIn ? <input className="field__input a-field__input " onChange={handleChange} value={edtcomment} placeholder={`Commenting publicly ${user.name}`}
                        required />: <input className="field__input a-field__input " placeholder="Please sign in to comment"
                        disabled />
                }
                <span className="separator">  </span>

            </div>
            <div>
                <button className="btn btn-warning create-review-btn" style={{display: !editnow ? 'block' : 'none' }} onClick={() => handleSubmit()}>COMMENT</button>
                <button className="btn btn-warning update-review-btn"  style={{display: editnow ? 'unset' : 'none' }} onClick={() => handleSubmit()}>UPDATE</button>
                <button className="btn btn-warning cancel-review-btn"  style={{display: editnow ? 'unset' : 'none' }} onClick={() => cancelEdit()}>CANCEL</button>
            </div>
        </div>
    )
}

export default CreateReview