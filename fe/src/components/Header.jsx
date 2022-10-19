import React, { Component } from 'react';
import * as Icons from 'react-feather';
import $ from 'jquery';
import { RootContext } from '../Context';
import EditUser from '../others/user/EditUser';

import AvaIcon from '../assets/images/avatar.svg';

class Header extends Component {
    static contextType = RootContext;

    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            editProfile: false
        }

        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.checkWidth = this.checkWidth.bind(this);

        this.toggleEditModal = this.toggleEditModal.bind(this);
    }

    goFull() {
        if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }

    toggleSidebar() {
        if(document.querySelector(".sidebar-wrapper").classList.contains("close_icon")){
            document.querySelector(".page-header").className = "page-header";
            document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper ";
        }else{
            document.querySelector(".page-header").className = "page-header close_icon";
            document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper close_icon ";
        }
    }

    checkWidth() {
        if(window.innerWidth <= 991){
            document.querySelector(".page-header").className = "page-header close_icon";
            document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper close_icon ";
        }else{
            document.querySelector(".page-header").className = "page-header";
            document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper ";
        }

        this.setState({
            width: window.innerWidth
        })
    }

    toggleEditModal() {
        this.setState({
            editProfile: this.state.editProfile ? false : true
        })
    }

    componentDidMount() {
        this.checkWidth()
        
        window.addEventListener("resize", () => {
            this.checkWidth()
        })        
    }

    render() { 
        return (
            <React.Fragment>
                <div className="page-header">
                    <div className="row header-wrapper m-0">
                        <div className="header-logo-wrapper col">
                            <div className="toggle-sidebar" onClick={this.toggleSidebar} style={(this.state.width <= 991) ? {display:"block"} : {display:"none"}}>
                                <Icons.Menu className="status_toggle middle sidebar-toggle" id="sidebar-toggle" />
                            </div>
                        </div>
                        <div className="nav-right col-auto ml-10 pull-right right-header p-0">
                            <ul className="nav-menus">
                                <li className="maximize">
                                    <a className="text-dark" href="#javascript" onClick={this.goFull}>
                                        <Icons.Minimize />
                                    </a>
                                </li>
                                <li className="profile-nav onhover-dropdown p-0">
                                    <div className="media profile-media">
                                        <img className="b-r-10" src={AvaIcon} alt="avatar" style={{objectFit: "cover"}}/>
                                        <div className="media-body ml-2">
                                            <span>{this.context.get.user.name}</span>
                                            <p className="mb-0 font-roboto">User <i className="middle fa fa-angle-down"></i></p>
                                        </div>
                                    </div>
                                    <ul className="profile-dropdown onhover-show-div m-n3">
                                        <li onClick={() => { this.setState({ editProfile: true }, () => { $('#edit-user-modal').modal('toggle') }) }}>
                                            <Icons.Edit />
                                            <span>Edit Profile</span>
                                        </li>
                                        <li onClick={() => { localStorage.clear(); window.location.reload() }}>
                                            <Icons.LogIn />
                                            <span>Log Out</span>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {
                    this.state.editProfile && <EditUser user={this.context.get.user} toggle={this.toggleEditModal} />
                }
            </React.Fragment>
        );
    }
}
 
export default Header;