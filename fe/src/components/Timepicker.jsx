import React, { Component } from 'react';

class Timepicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hour: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
            minute: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17','18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']
        }
    }

    componentDidMount() {
        /* Scroll to Selected Hour */
        let pickhour = document.getElementById('pick-hour-active');
        let pickminute = document.getElementById('pick-minute-active');
        
        /* Scroll to Selected Minute */
        if(pickhour) document.getElementById('choose-hour').scrollTop = pickhour.offsetTop - 8;
        if(pickminute) document.getElementById('choose-minute').scrollTop = pickminute.offsetTop - 8;
    }

    render() { 
        return (
            <React.Fragment>
                <div className="time-box">
                    <div id='choose-hour' className="time-scroll mr-2">
                        {
                            this.state.hour.map((index) => {
                                if(this.props.time.substring(0,2) === index)
                                {
                                    return <div id="pick-hour-active" className="time-value time-selected" key={index}>{index}</div>
                                }
                                else
                                {
                                    return <div onClick={this.props.choose} data-value={index} data-type="hour" className="time-value" key={index}>{index}</div>
                                }
                            })
                        }
                    </div>
                    <div id='choose-minute' className="time-scroll">
                        {
                            this.state.minute.map((index) => {
                                if(this.props.time.substring(3) === index)
                                {
                                    return <div id="pick-minute-active" className="time-value time-selected" key={index}>{index}</div>
                                }
                                else
                                {
                                    return (
                                        <div onClick={this.props.choose} data-value={index} data-type="minute" className="time-value" key={index}>{index}</div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Timepicker;