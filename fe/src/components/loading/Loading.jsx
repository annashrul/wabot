import React, { Component } from 'react';
import Style from './Loading.module.scss';

class Loading extends Component {
    render() {
        if(this.props.show) {
            return (
                <React.Fragment>
                    <div className={Style.loadingOverlay}></div>
                    <div className={Style.loadingCard}  style={{alignItems:"center"}}>
                        {
                            this.props.msg?<h3 style={{top:"50%",right:"50%",color:"white"}}>{this.props.msg} ....</h3>: <div className={"spinner-border " + Style.loadingSpinner} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        }
                        
                        

                    </div>
                </React.Fragment>
            );
        }else{
            return null;
        }
    }
}
 
export default Loading;