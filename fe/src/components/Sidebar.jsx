import React, { Component } from 'react';
import * as Icons from 'react-feather';
import { Link, NavLink } from 'react-router-dom';
import Structure from '../config/Sidebar.json';

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isToggle: true,
            data: Structure
        }

        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.toggleShow = this.toggleShow.bind(this);

        this.check = this.check.bind(this)
    }

    responsiveSidebar() {
        document.querySelector(".page-header").className = "page-header close_icon";
        document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper close_icon"
    }

    toggleSidebar() {
        if(this.state.isToggle){
            this.setState({
                isToggle: false
            }, () => {
                document.querySelector(".page-header").className = "page-header close_icon";
                document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper close_icon "
            })
        }else{
            this.setState({
                isToggle: true
            }, () => {
                document.querySelector(".page-header").className = "page-header";
                document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper ";
            })
        }
    }

    toggleShow(event) {
        let value = parseInt(event.currentTarget.id.slice(7));
        let data = this.state.data;

        if(data[value].show) {
            data[value].show = false;
        }else{
            data[value].show = true;
        }

        this.setState({
            data: data
        })
    }

    check() {
        let stateData = this.state.data;

        for(let i=0 ; i<stateData.length ; i++) {
            if(stateData[i].child.length > 0) {
                let data = document.getElementsByClassName("sidebar-list")[i].children[1].children;
                let status = false;
                
                for(let j=0 ; j<data.length ; j++) {
                    if(data[j].children[0].classList.value === "active") {
                        document.getElementsByClassName("sidebar-list")[i].children[0].classList.add('active');
                        status = true;
                    }
                }

                if(!status) {
                    document.getElementsByClassName("sidebar-list")[i].children[0].classList.remove('active');
                }
    
                if(document.getElementsByClassName("sidebar-list")[i].children[0].classList.contains('active')) {
                    stateData[i].show = true;
                }
            }
        }

        this.setState({
            data: stateData
        })
    }

    componentDidMount() {
        this.check();
    }

    render() {
        return (
            <React.Fragment>
                <div className="sidebar-wrapper" id="sidebar-wrapper">
                    <div className="logo-wrapper" style={{padding: '25px 30px'}}>
                        <Link className="f-w-500" style={{fontSize: '1.25rem', color: '#292929'}} to="/">
                            {process.env.REACT_APP_WEB_NAME}
                        </Link>
                        <div className="back-btn" onClick={this.responsiveSidebar}><i className="fa fa-angle-left"></i></div>
                        <div className="toggle-sidebar" style={{marginTop: '-2px'}} onClick={this.toggleSidebar}>
                            <Icons.Menu className="status_toggle middle sidebar-toggle" />
                        </div>
                    </div>
                    <div className="logo-icon-wrapper">
                        <Link to="/">
                        <img className="img-fluid"  alt="" /></Link>
                    </div>
                    <nav className="sidebar-main">
                        <div id="sidebar-menu">
                            <ul className="sidebar-links custom-scrollbar">
                                <li className="back-btn">
                                    <div className="mobile-back text-right"><span>{"Back"}</span><i className="fa fa-angle-right pl-2" aria-hidden="true"></i></div>
                                </li>                                
                                {
                                    this.state.data.map((value, i) => {
                                        const TitleIcon = Icons[value.icon];

                                        if(value.child.length === 0) {
                                            return (
                                                <li className="sidebar-list" key={i}>
                                                    <NavLink exact to={value.path} className="sidebar-link sidebar-title" onClick={() => { window.setTimeout(() => { this.check() }, 500) }}>
                                                        <TitleIcon />
                                                        <span>{value.name}</span>
                                                    </NavLink>
                                                </li>
                                            )
                                        }
                                        
                                        return (
                                            <li className="sidebar-list" key={i}>
                                                <a href="#javascript" className={"sidebar-link sidebar-title"} id={"sidebar" + i} onClick={this.toggleShow} role="button">
                                                    <TitleIcon />
                                                    <span>{value.name}</span>
                                                    <div className="according-menu">
                                                        {
                                                            (value.show)
                                                                ? <i className="fa fa-angle-down"></i>
                                                                : <i className="fa fa-angle-right"></i>
                                                        }
                                                    </div>
                                                </a>
                                                <ul className="sidebar-submenu" style={value.show ? this.state.isToggle ? { opacity: 1, transition: 'opacity 500ms ease-in' } : { display: "block" } : { display: "none" }}>
                                                    {
                                                        value.child.map((subvalue, j) => {
                                                            return(
                                                                <li key={j}>
                                                                    <NavLink exact to={subvalue.path} onClick={() => { window.setTimeout(() => { this.check() }, 10) }}>{subvalue.name}</NavLink>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </nav>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Sidebar;