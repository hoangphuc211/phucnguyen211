import React, { useState, useEffect, Component } from "react";
import Layout from "./Layout";
import "../css/Profile.css"
import { getCurrentUser, updateUser, isAuthenticated, setAvatar } from '../user/APIUtils';
import {getPlayList} from './ApiCore'

class Profile extends Component {
    constructor(props) {
        super(props);
        // alert("hu?")
        this.state = {
            authenticated: false,
            userRole: undefined,
            userEmail: undefined,
            userName: undefined,
            userAvatar: undefined,
            userID: undefined,
            file: '',
            imagePreviewUrl: '',
            listContent : []
        }
        getCurrentUser().then(res => {
            localStorage.setItem('USER', JSON.stringify(res))
            this.setState({ 
                authenticated: true, 
                userRole: res.role , 
                userName: res.name, 
                userEmail: res.email, 
                userAvatar: res.imageUrl, 
                userID:res.id
            })
            getPlayList(res.id).then((res) => {
                console.log("movie list : ", res)
                this.setState({
                    listContent : res.content
                })
            })
        })
    }
    _handleSubmit(e) {
        e.preventDefault();
        const data = new FormData() ;
        data.append('file', this.state.file);
        // console.log(this.state.file);
        setAvatar(data).then(res => {
            window.location.reload();
        })
    }
    
    _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
    }
    updateUser(){
        var requestBody={
            "id": this.state.userID,
            "email": this.state.userEmail,
            "name": this.state.userName,
            "imageUrl": this.state.userAvatar,
            "emailVerified": true,
            "role": this.state.userRole,
            "password": null,
            "provider": null,
            "providerId": null,
            "dateCreated": null,
            "lastUpdated": null
        }
        updateUser(requestBody).then((res)=>{
            window.location.reload();
        })
    }
    handleChangeUsername(e){
        console.log(e.target.value);
        this.setState({
            userName: e.target.value
        });
    }
    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        $imagePreview = (<img src={imagePreviewUrl} />);
        return (
            <Layout>
                <div className="position-relative overflow-auto full-height">
                    <div className="row z-content-center logo-for-movie animated finite slideInDown faster">
                        <div className="profile">
                            <div className="profile-image">
                                <form onSubmit={(e)=>this._handleSubmit(e)}>
                                    <img className="image" src={this.state.imagePreviewUrl?this.state.imagePreviewUrl:this.state.userAvatar} alt="User avatar"/>
                                    <input className="fileInput mb-3" name="file"  type="file" onChange={(e)=>this._handleImageChange(e)} />
                                    <button type="submit" className="submitButton form-control btn-warning btn-block font-size-profile" onClick={(e)=>this._handleSubmit(e)}>Update avatar</button>
                                </form>
                            </div>
                            <div className="profile-form">
                                <form className="form-profile">
                                    <div className="form-ele">
                                        <div className="ele-laber">
                                            <div className="font-size-profile">ID:</div>
                                        </div>
                                        <div className="ele-input">
                                            <input type="text" className="form-control btn-block font-size-profile" disabled value={this.state.userID} />
                                        </div>
                                    </div>
                                    <div className="form-ele">
                                        <div className="ele-laber">
                                            <div className="font-size-profile">Name:</div>
                                        </div>
                                        <div className="ele-input">
                                            <input type="text" className="form-control btn-block font-size-profile" value={this.state.userName} onChange={(e) => this.handleChangeUsername(e)}/>
                                        </div>
                                    </div>
                                    <div className="form-ele">
                                        <div className="ele-laber">
                                            <div className="font-size-profile">Email:</div>
                                        </div>
                                        <div className="ele-input">
                                            <input type="text" className="form-control btn-block font-size-profile" disabled value={this.state.userEmail} />
                                        </div>
                                    </div>
                                    <div className="form-ele">
                                    </div>
                                    <div className="form-ele">
                                        <div className="ele-laber">
                                        </div>
                                        <div className="ele-input">
                                            <a href="changepassword">Need change password?</a>
                                        </div>
                                    </div>
                                    <div className="form-ele">
                                        <div className="ele-laber">
                                        </div>
                                        <div className="ele-input">
                                            <button type="button" className="form-control btn-warning btn-block font-size-profile" onClick={()=>this.updateUser()}>Update profile</button>
                                        </div>
                                    </div>
                                    <div className="form-ele">
                                    </div>
                                </form>
                            </div>
                        </div> 
                    </div>
                    <div className="movie-page-background"></div>
                </div>
                <div className="position-relative overflow-auto full-height">
                    <div class="accordion" id="accordionExample">
                        {this.state.listContent.map((key, index) => (
                        <div class="card playlist">
                            <div class="card-header" id={"heading" + index}>
                            <h2 class="mb-0">
                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target={"#collapse" + index} aria-expanded="true" aria-controls={"collapse" + index}>
                                <h2>{key.listName}</h2>
                                </button>
                            </h2>
                            </div>

                            <div id={"collapse" + index} class="collapse" aria-labelledby={"collapse" + index} data-parent="#accordionExample">
                                <div class="card-body">
                                    <section className="movies" id="movies">
                                        {/* <h2> {key.listName} </h2> */}
                                        <div className="row">
                                            {key.movies.map(item => (
                                            <div className="col-lg-3 col-md-4 col-sm-6">
                                                <article className="card">
                                                    <header className="title-header">
                                                        <h3><a className="liked_movie-title" href={ "../../movie/" + item.id}>{item.title}</a></h3>
                                                    </header>
                                                    <div className="card-block">
                                                        <div className="img-card">
                                                            <img className="liked-image" src={item.poster} alt="Movie"/>
                                                        </div>
                                                        <a href="#" className="btn btn-gradient btn-block btn-sm"><i class="fas fa-thumbs-down"></i> Dislike</a>
                                                    </div>
                                                </article>
                                            </div>
                                            ))} 
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Profile