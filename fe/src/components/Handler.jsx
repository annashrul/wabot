import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { RootContext } from '../Context';
import Loading from './loading/Loading';

export class PageControl extends Component {
    static contextType = RootContext;
    
    render() {
        let token = localStorage.getItem('token');

        if(this.props.type === "auth"){
            if(token) {
                return <Redirect to="/" />
            }else{
                return this.props.children;
            }
        }else{
            if(token) { /* Check if there is token variable */
                if(this.context.get.user.id) {
                    return this.props.children;
                }else{
                    return <Loading show />;
                }
            }else{ /* There is no token variable */
                return <Redirect to="/" />
            }
        }
    }
}

/* export class AccessControl extends Component {
    static contextType = RootContext;

    render() { 
        let permissions = this.context.get.user.permissions;

        if(permissions && permissions.length > 0) {
            for(let value in permissions) {
                if(permissions[value] === this.props.name) {
                    return this.props.children;
                }
            }
        }

        if(this.props.type) {
            return <NotFound />
        }else{
            return null;
        }
    }
}
 
export default AccessControl; */