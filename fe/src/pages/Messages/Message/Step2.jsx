import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Search, UserPlus, X } from 'react-feather';
import { toast } from 'react-toastify';
import $ from 'jquery';

import Loading from '../../../components/loading/Loading';

import EmptyData from '../../../assets/images/Empty-Data.svg';
import EmptyDevice from '../../../assets/images/Empty-Box.svg';
import EmptySearch from '../../../assets/images/Empty-Search.svg';
import EmptyRecipient from '../../../assets/images/Empty-Recipient.svg';
import NotSearch from '../../../assets/images/Not-Search.svg';

import ContactAPI from '../../../api/Contact';
import CategoryAPI from '../../../api/Category';
import CoreAPI from '../../../api/Core';

const DeepClone = require('rfdc')();

/* No Device Alert */
const NoDevice = 
    <div className="status-info">
        <img src={EmptyDevice} alt="Empty Device" />
        <p className="status-title">Device Not Online</p>
        <p className="m-0 text-center">Please enable your device to continue</p>
    </div>

/* No Data Available Alert */
const NoData = (target) =>
    <div className="status-info">
        <img src={EmptyData} alt="Empty Data" />
        <p className="status-title">No {target} Available</p>
        <p className="m-0 text-center">
            { target === 'Contact' && "You haven't add or sync your contact"}
            { target === 'Category' && "You haven't add category"}
            { target === 'Group' && "You haven't sync your group"}
            { target === 'Broadcast List' && "You haven't sync your broadcast list"}
        </p>
    </div>

/* No Data Found Alert */
const NoFound = (target) =>
    <div className="status-info">
        <img src={EmptySearch} alt="Data Not Found" />
        <p className="status-title">No {target} Found</p>
        <p className="m-0 text-center">We couldn't find what you're looking for</p>
    </div>

/* No Recipient Alert */
const NoRecipient = 
    <div className="status-info">
        <img src={EmptyRecipient} alt="Data Not Found" />
        <p className="status-title">No Recipient</p>
        <p className="m-0 text-center">Select recipient to send message</p>
    </div>

/* No Search Word */
const NoSearch = 
    <div className="status-info">
        <img src={NotSearch} alt="Data Not Found" />
        <p className="status-title">Search Recipient</p>
        <p className="m-0 text-center">Write keyword to begin searching</p>
    </div>

class Step2 extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: false,

            search: "",
            newContact: '',

            webContact: [],
            webCategory: [],
            contact: [],
            category: [],
            group: [],
            broadcast: [],

            show: {
                contact: [],
                category: [],
                group: [],
                broadcast: []
            },

            recipient: [],
            recipientSearch: ''
        }

        this.fetchWebRecipient = this.fetchWebRecipient.bind(this);
        this.fetchRecipient = this.fetchRecipient.bind(this);

        this.search = this.search.bind(this);

        this.addRecipient = this.addRecipient.bind(this);
        this.removeRecipient = this.removeRecipient.bind(this);
        this.removeTypeRecipient = this.removeTypeRecipient.bind(this);

        this.handleNewContactChange = this.handleNewContactChange.bind(this);
        this.enterNewContact = this.enterNewContact.bind(this);

        this.toggleSearch = this.toggleSearch.bind(this);
        this.toggleClearSearch = this.toggleClearSearch.bind(this);
        this.searchRecipient = this.searchRecipient.bind(this);
        this.removeSearchRecipient = this.removeSearchRecipient.bind(this);
    }

    /* === Sorting Algorithm ==================================================== */

    compare(a, b) {
        if(a.name < b.name){
            return -1;
        }else if(a.name > b.name){
            return 1;
        }else{
            return 0;
        }
    }

    /* === Fetch Data =========================================================== */

    fetchWebRecipient() {
        this.setState({
            isLoading: true
        }, () => {
            ContactAPI.get().then((dataWebContact) => {
                CategoryAPI.get().then((dataCategory) => {
                    /* Assign Variables */
                    let contact = [], category = [];

                    /* Store Web Contact to Contact */
                    if(dataWebContact.status === 200) {
                        for(let value of dataWebContact.data) {
                            contact.push({
                                id: value.id,
                                type: 'contactWeb',
                                name: value.contact_name,
                                phone: value.contact_number
                            })
                        }
                    }

                    /* Store Category */
                    if(dataCategory.status === 200 || dataCategory.status === 404) {
                        if(dataCategory.status === 200) {
                            for(let value of dataCategory.data) {
                                category.push({
                                    id: value.id,
                                    name: value.category_name
                                })
                            }
                        }
                    }

                    /* Sort Data */
                    contact.sort(this.compare);
                    category.sort(this.compare);

                    /* Store to Show Variable */
                    let show = this.state.show;
                    
                    show.contact = DeepClone(contact);
                    show.category = DeepClone(category);

                    this.setState({
                        isLoading: false,
                        webContact: DeepClone(contact),
                        webCategory: DeepClone(category),
                        contact, category, show
                    }, () => {
                        /* Fetch Default First Device */
                        if(this.props.device.data.length > 0) {
                            this.fetchRecipient();
                        }
                    })
                })
            })
        })
    }

    fetchRecipient(event) {
        let choice = event ? event.target.value : this.props.device.choice;
        let isFirst = event ? false : true;

        /* Reset Recipient if Device Changed */
        if(!isFirst) {
            this.props.recipient.reset();
        }

        this.setState({
            isLoading: true
        }, () => {
            CoreAPI.getContact(choice).then((dataContact) => {
                CoreAPI.getGroup(choice).then((dataGroup) => {
                    CoreAPI.getBroadcast(choice).then((dataBroadcast) => {
                        /* Assign Variables */
                        let contact = [], category = [], group = [], broadcast = [];

                        /* Store Web Contact */
                        if(this.state.webContact.length > 0){
                            loopWebContact:
                            for(let value of this.state.webContact) {
                                /* Check if Target Already Selected as Recipient */
                                if(isFirst){
                                    for(let value2 of this.props.recipient.get){
                                        if(value2.type === 'contactWeb' && value2.id === value.id) {
                                            continue loopWebContact;
                                        }
                                    }
                                }
    
                                contact.push(DeepClone(value));
                            }
                        }

                        /* Store Device Contact */
                        if(dataContact.status === 200) {
                            loopContact:
                            for(let value of dataContact.data) {
                                /* Check if Target Already Selected as Recipient */
                                if(isFirst) {
                                    for(let value2 of this.props.recipient.get){
                                        if(value2.type === 'contactDevice' && value2.id === value.id) {
                                            continue loopContact;
                                        }
                                    }
                                }
                                
                                contact.push({
                                    id: value.id,
                                    type: 'contactDevice',
                                    name: (value.name) ? value.name : "-",
                                    phone: value.jid.replace('@s.whatsapp.net', '')
                                })
                            }
                        }

                        /* Store Category */
                        if(this.state.webCategory.length > 0){
                            loopCategory:
                            for(let value of this.state.webCategory) {
                                /* Check if Target Already Selected as Recipient */
                                if(isFirst){
                                    for(let value2 of this.props.recipient.get){
                                        if(value2.type === 'category' && value2.id === value.id) {
                                            continue loopCategory;
                                        }
                                    }
                                }
    
                                category.push(DeepClone(value));
                            }
                        }

                        /* Store Group */
                        if(dataGroup.status === 200) {
                            loopGroup:
                            for(let value of dataGroup.data) {
                                /* Check if Target Already Selected as Recipient */
                                if(isFirst) {
                                    for(let value2 of this.props.recipient.get){
                                        if(value2.type === 'group' && value2.id === value.id) {
                                            continue loopGroup;
                                        }
                                    }
                                }
                            
                                group.push({
                                    id: value.id,
                                    name: (value.name) ? value.name : "-"
                                })
                            }
                        }

                        /* Store Broadcast */
                        if(dataBroadcast.status === 200) {
                            loopBroadcast:
                            for(let value of dataBroadcast.data) {
                                /* Check if Target Already Selected as Recipient */
                                if(isFirst) {
                                    for(let value2 of this.props.recipient.get){
                                        if(value2.type === 'broadcast' && value2.id === value.id) {
                                            continue loopBroadcast;
                                        }
                                    }
                                }
                                
                                broadcast.push({
                                    id: value.id,
                                    name: (value.name) ? value.name : "Unnamed Broadcast List"
                                })
                            }
                        }

                        /* Sort Data */
                        contact.sort(this.compare);
                        category.sort(this.compare);
                        group.sort(this.compare);
                        broadcast.sort(this.compare);

                        /* Update Selected Device */
                        this.props.device.setChoice(choice);

                        /* Store to Showed Data */
                        let show = this.state.show;
                        
                        show.contact = DeepClone(contact);
                        show.category = DeepClone(category);
                        show.group = DeepClone(group);
                        show.broadcast = DeepClone(broadcast);

                        this.setState({
                            isLoading: false,
                            search: "",
                            category, contact, group, broadcast, show
                        })
                    })
                })
            })
        })
    }

    /* === Searching ============================================================ */

    search(event) {
        /* Assign Variables */
        let target = event.target.value.toLowerCase();
        let contact = [], category = [], group = [], broadcast = [];

        /* Search Word in Contact */
        for(let value of this.state.contact){
            if(value.name.toLowerCase().includes(target) || value.phone.toString().toLowerCase().includes(target)){
                contact.push(value);
            }
        }

        /* Search Word in Category */
        for(let value of this.state.category){
            if(value.name.toLowerCase().includes(target)){
                category.push(value);
            }
        }

        /* Search Word in Group */
        for(let value of this.state.group){
            if(value.name.toLowerCase().includes(target)){
                group.push(value);
            }
        }

        /* Search Word in Broadcast List */
        for(let value of this.state.broadcast){
            if(value.name.toLowerCase().includes(target)){
                broadcast.push(value);
            }
        }

        /* Store Result to Show Variable */
        let show = this.state.show;
        
        show.contact = contact;
        show.category = category;
        show.group = group;
        show.broadcast = broadcast;

        this.setState({
            search: event.target.value,
            show
        })
    }

    /* === Manage Recipients ==================================================== */

    addRecipient(event) {
        /* Assign Variable */
        let type = event.currentTarget.getAttribute('data-type'), index = event.currentTarget.getAttribute('data-index'), detail = event.currentTarget.getAttribute('data-detail');
        let target = this.state.show[type][index];

        /* Store Existing Data */
        let data = this.state[type];
        let show = this.state.show;

        /* Remove Target from Data */
        for(let i=0 ; i<data.length ; i++) {
            if(data[i].id === target.id) {
                data.splice(i, 1);
                break;
            }
        }

        /* Remove Target from Showed Data */
        show[type].splice(index, 1);

        /* Update Data */
        this.setState({
            [type]: data,
            show
        }, () => {
            /* Add to Recipient Data */
            this.props.recipient.add({
                id: target.id,
                name: target.name,
                detail: (target.phone) ? target.phone : detail,
                type: (type === 'contact') ? target.type : type
            })
        })
    }

    removeRecipient(event) {
        /* Assign Variables */
        let index = event.currentTarget.getAttribute('data-index');
        let target = this.props.recipient.get[index];
        let type = (target.type === 'contactWeb' || target.type === 'contactDevice' ) ? 'contact' : target.type

        /* Store Existing Data */
        let data = this.state[type];
        let show = this.state.show;

        /* Store Target Data */
        let result = {
            id: target.id,
            name: target.name
        };

        /* If Target is Contact, Store Type and Phone Number */
        if(type === 'contact'){
            result.type = target.type;
            result.phone = target.detail;
        }

        /* Add Target to Data and Sort It */
        if(type !== 'contactNew') {
            data.push(result);
            data.sort(this.compare);
        }

        /* Add Target to Data and Sort It, if Match with Search Word */
        if(type === 'contact'){
            if(result.name.toLowerCase().includes(this.state.search.toLowerCase()) || result.phone.toLowerCase().includes(this.state.search.toLowerCase())){
                show[type].push(result);
                show[type].sort(this.compare);
            }
        }else if(type !== 'contactNew'){
            if(result.name.toLowerCase().includes(this.state.search.toLowerCase())){
                show[type].push(result);
                show[type].sort(this.compare);
            }
        }

        /* Remove from Recipient Data */
        this.props.recipient.remove(index);

        /* Remove from Searched Result */
        if(event.currentTarget.getAttribute('data-search')) {
            this.searchRecipient({target: {value: this.state.recipientSearch}})
        }

        /* Update Data */
        this.setState({
            [type]: data,
            show
        })
    }

    removeTypeRecipient(event) {
        /* Assign Variables */
        let type = event.currentTarget.getAttribute('data-type'), target = [];
        
        /* Store Existing Data */
        let recipient = this.props.recipient.get;
        let data = this.state[type], show = this.state.show;

        for(let i=0 ; i<recipient.length ; i++) {
            /* Store Temporary */
            let value = recipient[i];

            if(value.type.includes(type) && value.type !== 'contactNew') {
                /* Store Target Data */
                let result = {
                    id: value.id,
                    name: value.name
                };

                /* If Target is Contact, Store Type and Phone Number */
                if(type === 'contact'){
                    result.type = value.type;
                    result.phone = value.detail;
                }

                /* Add Target to Data and Sort It */
                data.push(result);

                /* Add Target to Data and Sort It, if Match with Search Word */
                if(type === 'contact'){
                    if(result.name.toLowerCase().includes(this.state.search.toLowerCase()) || result.phone.toLowerCase().includes(this.state.search.toLowerCase())){
                        show[type].push(result);
                    }
                }else{
                    if(result.name.toLowerCase().includes(this.state.search.toLowerCase())){
                        show[type].push(result);
                    }
                }

                /* Add index to Remove Target */
                target.push(i)
            }else if(value.type === 'contactNew') {
                /* Add index to Remove Target */
                target.push(i)
            }
        }

        /* Sort New Data */
        data.sort(this.compare);
        show[type].sort(this.compare);

        /* Remove Target Recipient */
        this.props.recipient.batchRemove(target);

        /* Update Data */
        this.setState({
            [type]: data,
            show
        })
    }

    /* === New Number (Manual Recipients) ======================================= */

    handleNewContactChange(event) {
        /* Store New Value */
        let value = event.target.value;

        /* Update if Numeric, Comma, or Space */
        if((value.charAt(value.length - 1) >= '0' && value.charAt(value.length - 1) <= '9') || value === '' || value.charAt(value.length - 1) === ',' || value.charAt(value.length - 1) === ' '){
            this.setState({
                newContact: value
            })
        }
    }

    enterNewContact(event) {
        if(event.key === "Enter") {
            /* Assign Variable */
            let value = DeepClone(this.state.newContact), splitValue = [];
            let data = [];

            /* Replace All Except Numeric and Comma */
            value = value.replace(/[^\d,]/gim, '');

            /* Split Data by Separator */
            splitValue = value.split(',');
            
            /* Assign Value to Array */
            for(let val of splitValue) {
                if(val !== ''){
                    data.push({
                        id: 0,
                        name: val,
                        detail: 'Added Number',
                        type: 'contactNew'
                    })
                }
            }

            /* Add All Data */
            this.props.recipient.batch(data);
            
            event.target.blur();
            this.setState({
                newContact: ''
            })
        }
    }

    /* === Search Recipient ===================================================== */

    toggleSearch() {
        this.setState({
            recipientSearch: '',
            recipient: []
        }, () => {
            /* Toggle Show Search or Not */
            $('#recipient-action').toggleClass('show');

            /* Focus if Search Showed */
            if($('#recipient-action').hasClass('show')) {
                document.getElementById('search-recipient').focus();
            }
        })
    }

    toggleClearSearch() {
        this.setState({
            recipientSearch: '',
            recipient: []
        }, () => {
            /* Toggle Search */
            $('#recipient-action').addClass('show');
            document.getElementById('search-recipient').focus();
        })
    }

    searchRecipient(event) {
        /* Assign Variables */
        let target = event.target.value.toLowerCase();
        let recipient = [];

        /* Search if Word is Not Empty */
        if(target !== '') {
            /* Search Word */
            for(let i=0 ; i<this.props.recipient.get.length ; i++){
                /* Store Value */
                let value = this.props.recipient.get[i];

                /* Add Index */
                value.index = i;
                
                /* Add Recipient if Match */
                if(value.type === 'contactWeb' || value.type === 'contactDevice') {
                    if(value.name.toLowerCase().includes(target) || value.detail.toLowerCase().includes(target)){
                        recipient.push(value);
                    }
                }else{
                    if(value.name.toLowerCase().includes(target)){
                        recipient.push(value);
                    }
                }
            }
        }

        /* Update */
        this.setState({
            recipientSearch: event.target.value,
            recipient
        })
    }

    removeSearchRecipient() {
        /* Get Current Data and Assign Variable */
        let contact = this.state.contact, category = this.state.category, group = this.state.group, broadcast = this.state.broadcast;
        let show = this.state.show, target = [];

        for(let value of this.state.recipient) {
            if(value.type === 'contactNew') {
                /* Add index to Remove Target */
                target.push(value.index);
            }else{
                /* Store Target Data */
                let result = {
                    id: value.id,
                    name: value.name
                };

                /* If Target is Contact, Store Type and Phone Number */
                if(value.type.includes('contact')){
                    result.type = value.type;
                    result.phone = value.detail;
                    
                    contact.push(result);
                }else{
                    [value.type].push(result);
                }

                /* Add Target to Data, if Match with Search Word */
                if(value.type.includes('contact')){
                    if(result.name.toLowerCase().includes(this.state.search.toLowerCase()) || result.phone.toLowerCase().includes(this.state.search.toLowerCase())){
                        show.contact.push(result);
                    }
                }else{
                    if(result.name.toLowerCase().includes(this.state.search.toLowerCase())){
                        show[value.type].push(result);
                    }
                }

                /* Add index to Remove Target */
                target.push(value.index);
            }
        }

        /* Sort New Data */
        contact.sort(this.compare);
        category.sort(this.compare);
        group.sort(this.compare);
        broadcast.sort(this.compare);

        /* Sort Show Data */
        show.contact.sort(this.compare);
        show.category.sort(this.compare);
        show.group.sort(this.compare);
        show.broadcast.sort(this.compare);

        /* Remove Target Recipient */
        this.props.recipient.batchRemove(target);

        /* Update Data */
        this.setState({
            contact, category, group, broadcast, show
        }, () => {
            /* Handle Removed Success */
            toast.success('Searched Recipient Removed', {
                position: toast.POSITION.TOP_CENTER
            });

            /* Toggle Show Search */
            this.toggleSearch();
        })
    }

    componentDidMount() {
        /* Scroll to Top */
        window.scrollTo(0, 0)

        /* Fetch if Device Exist */
        if(this.props.device.data.length > 0) {
            this.fetchWebRecipient();
        }

        /* Initialize Tooltip */
        $('[data-toggle="tooltip"]').tooltip();
    }

    render() {
        /* Store Recipient List */
        let data = DeepClone(this.props.recipient.get);
        let contact = [], category = [], group = [], broadcast = [];

        /* Store by It's Type */
        for(let i=0 ; i<data.length ; i++) {
            /* Assign Variable */
            let value = data[i];

            /* Add index */
            value.index = i;

            /* Store by It's Type */
            if(value.type.includes('contact')) {
                contact.push(value);
            }else if(value.type === 'category') {
                category.push(value);
            }else if(value.type === 'group') {
                group.push(value);
            }else if(value.type === 'broadcast') {
                broadcast.push(value);
            }
        }

        return (
            <React.Fragment>
                <Loading show={this.state.isLoading} />
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header py-4">
                            <div className="mx-0 d-flex align-items-center justify-content-between">
                                <h5 className="m-0 pt-1">Device Data</h5>
                                <select id="device-select" onMouseLeave={() => {$('#device_select').tooltip('hide')}} data-toggle="tooltip" data-placement="top" title="If Your Device doesn't show up, please enabled it first in sessions page" value={this.props.device.choice} onChange={this.fetchRecipient} className="custom-select sync" style={{width: 'auto'}}>
                                    <option value="" disabled>— Choose Device —</option>
                                    {
                                        this.props.device.data.map((value, index) => {
                                            return (
                                                <option value={value.id} key={index}>{value.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="card-body pb-5">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="nav flex-column nav-pills">
                                        <a className="nav-link active" data-toggle="pill" href="#v-pills-contact" role="tab">Contact</a>
                                        <a className="nav-link" data-toggle="pill" href="#v-pills-category" role="tab">Category</a>
                                        <a className="nav-link" data-toggle="pill" href="#v-pills-group" role="tab">Whatsapp Group</a>
                                        <a className="nav-link" data-toggle="pill" href="#v-pills-broadcast" role="tab">Broadcast List</a>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="tab-content">
                                        <div className="tab-pane show active" id="v-pills-contact" role="tabpanel">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text bg-white"><i className="icofont icofont-search"></i></div>
                                                </div>
                                                <input value={this.state.search} onChange={this.search} type="search" placeholder="Search" className="form-control border-left-0 pl-0 search-bar-step-2" />
                                            </div>
                                            <ListGroup className="overflow-auto databar" style={{height: '17rem'}}>
                                                {
                                                    /* Empty Data or Empty Device */
                                                    this.props.device.data.length > 0 ? (this.state.contact.length <= 0 ? NoData('Contact') : (this.state.show.contact.length <= 0 && NoFound('Contact'))) : NoDevice
                                                }
                                                {
                                                    /* Show Contact */
                                                    this.state.show.contact.map((value, index) => {
                                                        return (
                                                            <ListGroupItem onClick={this.addRecipient} data-detail="Contact" data-type="contact" data-index={index} key={index} className="list-group-item-action d-flex justify-content-between align-items-center list-contact">
                                                                <span className="contact-name">{value.name}</span><br/>
                                                                <span className="contact-description">{value.phone}</span>
                                                            </ListGroupItem>
                                                        )
                                                    })
                                                }
                                            </ListGroup>
                                        </div>
                                        <div className="tab-pane" id="v-pills-category" role="tabpanel">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text bg-white"><i className="icofont icofont-search"></i></div>
                                                </div>
                                                <input value={this.state.search} onChange={this.search} type="search" placeholder="Search" className="form-control border-left-0 pl-0 search-bar-step-2" />
                                            </div>
                                            <ListGroup className="overflow-auto databar" style={{height: '17rem'}}>
                                                {
                                                    /* Empty Data or Empty Device */
                                                    this.props.device.data.length > 0 ? (this.state.category.length <= 0 ? NoData('Category') : (this.state.show.category.length <= 0 && NoFound('Category'))) : NoDevice
                                                }
                                                {
                                                    this.state.show.category.map((value, index) => {
                                                        return (
                                                            <ListGroupItem onClick={this.addRecipient} data-detail="Category" data-type="category" data-index={index} key={index} className="list-group-item-action d-flex justify-content-between align-items-center list-contact">
                                                                <span className="contact-name">{value.name}</span><br/>
                                                                <span className="contact-description">Category</span>
                                                            </ListGroupItem>
                                                        )
                                                    })
                                                }
                                            </ListGroup>
                                        </div>
                                        <div className="tab-pane" id="v-pills-group" role="tabpanel">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text bg-white"><i className="icofont icofont-search"></i></div>
                                                </div>
                                                <input value={this.state.search} onChange={this.search} type="search" placeholder="Search" className="form-control border-left-0 pl-0 search-bar-step-2" />
                                            </div>
                                            <ListGroup className="overflow-auto databar" style={{height: '17rem'}}>
                                                {
                                                    /* Empty Data or Empty Device */
                                                    this.props.device.data.length > 0 ? (this.state.group.length <= 0 ? NoData('Group') : (this.state.show.group.length <= 0 && NoFound('Group'))) : NoDevice
                                                }
                                                {
                                                    this.state.show.group.map((value, index) => {
                                                        return (
                                                            <ListGroupItem onClick={this.addRecipient} data-detail="WA Group" data-type="group" data-index={index} key={index} className="list-group-item-action d-flex justify-content-between align-items-center list-contact">
                                                                <span className="contact-name">{value.name}</span><br/>
                                                            </ListGroupItem>
                                                        )
                                                    })
                                                }
                                            </ListGroup>
                                        </div>
                                        <div className="tab-pane" id="v-pills-broadcast" role="tabpanel">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text bg-white"><i className="icofont icofont-search"></i></div>
                                                </div>
                                                <input value={this.state.search} onChange={this.search} type="search" placeholder="Search" className="form-control border-left-0 pl-0 search-bar-step-2" />
                                            </div>
                                            <ListGroup className="overflow-auto databar" style={{height: '17rem'}}>
                                                {
                                                    /* Empty Data or Empty Device */
                                                    this.props.device.data.length > 0 ? (this.state.broadcast.length <= 0 ? NoData('Broadcast List') : (this.state.show.broadcast.length <= 0 && NoFound('Broadcast List'))) : NoDevice
                                                }
                                                {
                                                    this.state.show.broadcast.map((value, index) => {
                                                        return (
                                                            <ListGroupItem onClick={this.addRecipient} data-detail="Broadcast List" data-type="broadcast" data-index={index} key={index} className="list-group-item-action d-flex justify-content-between align-items-center list-contact">
                                                                <span className="contact-name">{value.name}</span><br/>
                                                            </ListGroupItem>
                                                        )
                                                    })
                                                }
                                            </ListGroup>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header py-4">
                            <div className="mx-0 d-flex align-items-center justify-content-between" style={{height: '38px'}}>
                                <h5 className="m-0 pt-1">Recipient</h5>
                                {
                                    this.props.recipient.get.length > 0 && (
                                        <div className="dropdown">
                                            <button className="btn btn-dark px-3 dropdown-toggle" data-toggle="dropdown"><span className="mb-n1 mr-1">Clear</span></button>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <button onClick={this.fetchRecipient} value={this.props.device.choice}  className="dropdown-item w-100" type="button">Clear All Recipient</button>
                                                <button onClick={this.toggleClearSearch} className="dropdown-item w-100" type="button">Clear Filtered</button>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div id="recipient-action" className="card-body pr-4 pb-5">
                            <div id="recipient-add-number" className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <div className="input-group-text bg-white"><UserPlus size={16} /></div>
                                </div>
                                <input value={this.state.newContact} onChange={this.handleNewContactChange} onKeyDown={this.enterNewContact} type="tel" placeholder="Add Number (62xxx)" data-toggle="tooltip" data-placement="bottom" title="Add multiple number at once by using a comma (,) as a separator. Press enter to add it as a recipient" className="form-control border-left-0 pl-0 search-bar-step-2 radius-right"/>
                                <div onClick={this.toggleSearch} className="recipient-button radius-all ml-2" data-toggle="tooltip" data-placement="bottom" title="Search and Filter Recipient">
                                    <Search size={19} />
                                </div>
                            </div>
                            <div id="recipient-search" className="input-group mb-3">
                                <div onClick={this.toggleSearch} className="recipient-button radius-all mr-2" data-toggle="tooltip" data-placement="bottom" title="Add Number as Recipient">
                                    <UserPlus size={19} style={{marginRight: '-2px'}} />
                                </div>
                                <div className="input-group-prepend">
                                    <div className="input-group-text bg-white radius-left"><Search size={16} /></div>
                                </div>
                                <input value={this.state.recipientSearch} onChange={this.searchRecipient} id="search-recipient" type="text" placeholder="Search" className="form-control border-left-0 border-right-0 pl-0 search-bar-step-2"/>
                                <div onClick={this.removeSearchRecipient} className="recipient-button red radius-right" data-toggle="tooltip" data-placement="bottom" title="Remove Searched Recipient">
                                    <X size={19} />
                                </div>
                            </div>
                            <div id="recipient-list-default" className="overflow-auto databar" style={{height: '17rem'}}>
                                {
                                    (contact.length > 0) && (
                                        <ListGroup className="mb-3">
                                            <ListGroupItem className="recipient-list list-contact not-pointer d-flex align-items-center justify-content-between bg-primary f-w-500" style={{padding: '.6rem 1.25rem'}}>
                                                <div>
                                                    Contact
                                                </div>
                                                <div onClick={this.removeTypeRecipient} data-type="contact" style={{marginBottom: '-2px', cursor: 'pointer'}}>
                                                    <i className="icofont icofont-close mr-0 text-white" style={{fontSize: '1.5rem'}}></i>
                                                </div>
                                            </ListGroupItem>
                                            {
                                                contact.map((value, index) => {
                                                    return (
                                                        <ListGroupItem key={index} className="recipient-list d-flex align-items-center justify-content-between list-contact not-pointer">
                                                            <div>
                                                                <span className="contact-name">{value.name}</span><br/>
                                                                <span className="contact-description">{value.detail}</span>
                                                            </div>
                                                            <div onClick={this.removeRecipient} data-index={value.index} style={{cursor: 'pointer'}}>
                                                                <i className="icofont icofont-close mr-0 remove-recipient" style={{fontSize: '1.5rem'}}></i>
                                                            </div>
                                                        </ListGroupItem>
                                                    )
                                                })
                                            }
                                        </ListGroup>
                                    )
                                }
                                {
                                    (category.length > 0) && (
                                        <ListGroup className="mb-3">
                                            <ListGroupItem className="recipient-list list-contact not-pointer d-flex align-items-center justify-content-between bg-secondary f-w-500" style={{padding: '.6rem 1.25rem'}}>
                                                <div>
                                                    Category
                                                </div>
                                                <div onClick={this.removeTypeRecipient} data-type="category" style={{marginBottom: '-2px', cursor: 'pointer'}}>
                                                    <i className="icofont icofont-close mr-0 text-white" style={{fontSize: '1.5rem'}}></i>
                                                </div>
                                            </ListGroupItem>
                                            {
                                                category.map((value, index) => {
                                                    return (
                                                        <ListGroupItem key={index} className="recipient-list d-flex align-items-center justify-content-between list-contact not-pointer">
                                                            <div>
                                                                <span className="contact-name">{value.name}</span><br/>
                                                                <span className="contact-description">{value.detail}</span>
                                                            </div>
                                                            <div onClick={this.removeRecipient} data-index={value.index} style={{cursor: 'pointer'}}>
                                                                <i className="icofont icofont-close mr-0 remove-recipient" style={{fontSize: '1.5rem'}}></i>
                                                            </div>
                                                        </ListGroupItem>
                                                    )
                                                })
                                            }
                                        </ListGroup>
                                    )
                                }
                                {
                                    (group.length > 0) && (
                                        <ListGroup className="mb-3">
                                            <ListGroupItem className="recipient-list list-contact not-pointer d-flex align-items-center justify-content-between bg-info f-w-500" style={{padding: '.6rem 1.25rem'}}>
                                                <div>
                                                    Whatsapp Group
                                                </div>
                                                <div onClick={this.removeTypeRecipient} data-type="group" style={{marginBottom: '-2px', cursor: 'pointer'}}>
                                                    <i className="icofont icofont-close mr-0 text-white" style={{fontSize: '1.5rem'}}></i>
                                                </div>
                                            </ListGroupItem>
                                            {
                                                group.map((value, index) => {
                                                    return (
                                                        <ListGroupItem key={index} className="recipient-list d-flex align-items-center justify-content-between list-contact not-pointer">
                                                            <div>
                                                                <span className="contact-name">{value.name}</span><br/>
                                                                <span className="contact-description">{value.detail}</span>
                                                            </div>
                                                            <div onClick={this.removeRecipient} data-index={value.index} style={{cursor: 'pointer'}}>
                                                                <i className="icofont icofont-close mr-0 remove-recipient" style={{fontSize: '1.5rem'}}></i>
                                                            </div>
                                                        </ListGroupItem>
                                                    )
                                                })
                                            }
                                        </ListGroup>
                                    )
                                }
                                {
                                    (broadcast.length > 0) && (
                                        <ListGroup>
                                            <ListGroupItem className="recipient-list list-contact not-pointer d-flex align-items-center justify-content-between bg-success f-w-500" style={{padding: '.6rem 1.25rem'}}>
                                                <div>
                                                    Broadcast List
                                                </div>
                                                <div onClick={this.removeTypeRecipient} data-type="broadcast" style={{marginBottom: '-2px', cursor: 'pointer'}}>
                                                    <i className="icofont icofont-close mr-0 text-white" style={{fontSize: '1.5rem'}}></i>
                                                </div>
                                            </ListGroupItem>
                                            {
                                                broadcast.map((value, index) => {
                                                    return (
                                                        <ListGroupItem key={index} className="recipient-list d-flex align-items-center justify-content-between list-contact not-pointer">
                                                            <div>
                                                                <span className="contact-name">{value.name}</span><br/>
                                                                <span className="contact-description">{value.detail}</span>
                                                            </div>
                                                            <div onClick={this.removeRecipient} data-index={value.index} style={{cursor: 'pointer'}}>
                                                                <i className="icofont icofont-close mr-0 remove-recipient" style={{fontSize: '1.5rem'}}></i>
                                                            </div>
                                                        </ListGroupItem>
                                                    )
                                                })
                                            }
                                        </ListGroup>
                                    )
                                }
                                {
                                    this.props.recipient.get.length <= 0 && NoRecipient
                                }
                            </div>
                            <div id="recipient-list-search" className="overflow-auto databar" style={{height: '17rem'}}>
                                {
                                    this.state.recipient.map((value, index) => {
                                        return (
                                            <ListGroupItem key={index} className="recipient-list d-flex align-items-center justify-content-between list-contact">
                                                <div>
                                                    <span className="contact-name">{value.name}</span><br/>
                                                    <span className="contact-description">{value.detail}</span>
                                                </div>
                                                <div onClick={this.removeRecipient} data-index={value.index} data-search="recipient">
                                                    <i className="icofont icofont-close mr-0 remove-recipient" style={{fontSize: '1.5rem'}}></i>
                                                </div>
                                            </ListGroupItem>
                                        )
                                    })
                                }
                                {
                                    this.props.recipient.get.length <= 0 ? (
                                        NoRecipient
                                    ) : (
                                        this.state.recipient.length <= 0 && (this.state.recipientSearch === '' ? NoSearch : NoFound('Recipient'))
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 d-flex justify-content-between mb-4">
                    <button onClick={this.props.iterateStep} data-direction="prev" className="btn btn-outline-green mr-3">Previous</button>
                    {
                        this.props.recipient.get.length > 0 ? (
                            <button onClick={this.props.iterateStep} data-direction="next" className="btn btn-green">Next</button>
                        ) : (
                            <div id="recipient-next" onMouseLeave={() => {$('#recipient-next').tooltip('hide')}} data-toggle="tooltip" data-placement="top" title="Select recipient to continue" tabIndex="0" >
                                <button disabled onClick={this.props.iterateStep} data-direction="next" className="btn btn-green" style={{pointerEvents: 'none'}}>Next</button>
                            </div>
                        )
                    }
                </div>
            </React.Fragment>
        );
    }
}
 
export default Step2;