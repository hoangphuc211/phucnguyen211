import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, withRouter, Redirect, Link } from "react-router-dom";
import { loadSingleMovie, getAllCommentOfMovie, deleteComment } from './ApiCore'
import Layout from "./Layout";
import moment from "moment";
import "../css/Review.css"
import CreateReview from "./CreateReview";
import { string } from "prop-types";
import { createComment  } from './ApiCore'

const Review = ({ movieId }) => {

    const [reviews, setReviews] = useState([]);
    const [commentid, setCommentid] = useState([]);
    const [hoverid, setHoverid] = useState([]);
    const [reply, setReply] = useState()
    const [option, setOption] = useState([])
    const [edtcomment, setEdtcomment] = useState('');
    const [edtuser, setEdtuser] = useState(null);
    const [editnow, setEditnow] = useState(false);

    const init = () => {
        // console.log("movieId : ", movieId)
        getAllCommentOfMovie(movieId).then(res => {
            // console.log("res in getAllCommentOfMovie : ", res.content)
            setReviews(res.content)
        })
    }


    useEffect(() => {
        init()
    }, [])

    setTimeout(
        function() {
            init()
        }
        .bind(this),
        200
    );

    function selectID (id) {
        setCommentid("(" + id + ")" + commentid);
    }

    function hoverID (id) {
        setHoverid("(" + id + ")");
    }

    function showOption (id) {
        setOption("(" + id + ")");
    }
    function delete_Comment (user_id, id) {
        var result = window.confirm("Want to delete?");
        if (result) {
            deleteComment(null, user_id, id).then((res)=>{
                // console.log("res in submitting create review : ", res);
            })
        }
        
    }
    function edit_Comment (content, user) {
        setEdtcomment(content);
        setEdtuser(user);
        setEditnow(true);
    }
    function leaveOption (id){
        if(option.includes("(" + id + ")")){
            setOption("");
        }
    }

    const time = (createdAt) => {
        var createdAt = moment(createdAt)

        var now = moment().format()
        var dateDifference = moment(now).diff(createdAt, 'days')
        var suffix = " days ago"
        // console.log("dateDifference  : ", dateDifference)

        if (dateDifference <= 0) {
            dateDifference = moment(now).diff(createdAt, 'hours')
            suffix = " hours ago"
            // console.log("dateDifference in hours : ", dateDifference)
        }

        if (dateDifference <= 0) {
            dateDifference = moment(now).diff(createdAt, 'minutes')
            // console.log("dateDifference in minute : ", dateDifference)
            suffix = " minutes ago"
        }

        return dateDifference + suffix
    }
    const handleChange = (e) => {
        setReply(e.target.value)
    }

    const handleSubmit = (id) => {
        var requestBody={
            content: reply
        }
        createComment(requestBody, movieId, id).then((res)=>{
            // console.log("res in submitting create review : ", res);
            setReply('');
        })
        
    }

    const showAllReviews = () => {
        return (
            <div>
                {reviews.map((c) => {
                    return (
                        <div>
                            <div className="row each-review  mt-4"  onMouseOver={() => hoverID(c.id)}>
                                <div ><img className="user-image" src={c.user.imageUrl} /></div>
                                <div>
                                    <div className="row align-items-center mt-3 mx-0">
                                        <div className="review-username mr-2">{c.user.name}</div>
                                        <div className="review-content">{c.content}</div>
                                        <span className="review-option noselect" onClick={() => showOption(c.id)}  style={{color: hoverid.includes("(" + c.id + ")") ? '#fff' : 'transparent' }}>...</span>
                                        <div className="option-list" style={{display: option.includes("(" + c.id + ")") ? 'block' : 'none' }} onMouseLeave={() => leaveOption(c.id)} >
                                            <div className="option-ab">
                                                <div className="option-card">
                                                    <div className="option-op" onClick={() => edit_Comment(c.content, c)}>
                                                        Edit
                                                    </div>
                                                    <div className="option-op"  onClick={() => delete_Comment(c.user.id, c.id)}>
                                                        Delete
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="review-createdAt">
                                        {/* <span className="">Like</span> */}
                                        
                                        <span className="review-reply" onClick={() => selectID(c.id)}>Reply</span>
                                        <span className="review-line2">{time(c.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                            {c.childComments.map((c_child) => {
                                return (
                                    <div className="row each-reply review-child  my-2" onMouseOver={() => hoverID(c_child.id)}>
                                        <div ><img className="user-image" src={c_child.user.imageUrl} /></div>
                                        <div>
                                            <div className="row align-items-center mt-2 mx-0">
                                                <div className="review-username mr-2">{c_child.user.name}</div>
                                                <div className="review-content">{c_child.content}</div>
                                                <span className="review-option noselect" onClick={() => showOption(c_child.id)} style={{color: hoverid.includes("(" + c_child.id + ")") ? '#fff' : 'transparent' }}>...</span>
                                                <div className="option-list" style={{display: option.includes("(" + c_child.id + ")") ? 'block' : 'none' }} onMouseLeave={() => leaveOption(c_child.id)}>
                                                    <div className="option-ab">
                                                        <div className="option-card">
                                                            <div className="option-op">
                                                                Edit
                                                            </div>
                                                            <div className="option-op" onClick={() => delete_Comment(c_child.user.id, c_child.id)}>
                                                                Delete
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="review-createdAt">
                                                {/* <span className="">Like</span> */}
                                                {/* <span className="review-line2">Reply</span> */}
                                                <span className="">{time(c_child.createdAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            )}
                            <div style={{display: commentid.includes("(" + c.id + ")") ? 'block' : 'none' }}>
                                <div className="create-reply-container review-child row">
                                    <div ><img className="user-image" src={c.user.imageUrl} /></div>
                                    <div className="row col-5 mx-0 ">
                                        <span className="separator">  </span>
                                        <input className="field__input a-field__input " onChange={handleChange} value={reply} required />
                                    </div>
                                    <div>
                                        <button className="btn btn-warning create-review-btn" onClick={() => handleSubmit(c.id)}>COMMENT</button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                    )
                }
                )}
            </div>
        )
    }
    const showCreateReview=()=>{
        return <CreateReview 
            movieId={movieId} 
            edtcomment={edtcomment} 
            setEdtcomment={(edtcomment) => { setEdtcomment(edtcomment) }}
            edtuser={edtuser}
            setEdtuser={(edtuser) => { setEdtuser(edtuser) }}
            editnow={editnow}
            setEditnow={(editnow) => { setEditnow(editnow) }}
            />
    }
    return (
        <div className="p-4">
            <div className="totalNumOfReviews">{`${reviews.length} comments`}</div>
            {showCreateReview()}
            {showAllReviews()}
        </div>
    )
}

export default Review