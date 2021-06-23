import React, { Component } from 'react';
import { getOrderStatus } from "../services/rentService";
import styles from '../rentalInformation.module.css'; 
import { Link } from "react-router-dom";
import moment from 'moment';


class RentalInformation extends Component {
    state = {
        data: {},
        paymentDetails: "",
        paymentMethod: [],
        selectedPaymentMethod: "BANK_TRANSFER"
    }


    async componentDidMount() {
        const { match } = this.props;

        const orderId = match.params.id;
        try {
            const orderStatus = await getOrderStatus(orderId);
            if (orderStatus.data.error) return;
            // console.log(orderStatus);
            this.setState({ data: orderStatus.data.response.data })
            const { paymentMethods } = orderStatus.data.response.data;
            this.setState({ paymentMethod: paymentMethods });
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                return this.props.history.replace("/not-found");
        }
    }

    onMethodChange(method) {
        this.setState({ selectedPaymentMethod: method });
        // console.log(this.state.selectedPaymentMethod);
    }

    formatPaymentMethod(method){
        if(method === 'BANK_TRANSFER') return "Bank Transfer"
        if (method === 'MONEY_TRANSFER') return "Paga"
        if (method === "FUNDING_USSD") return "USSD";
    }

    displayMessage(){
        const {selectedPaymentMethod, paymentMethod, data} = this.state;
        console.log(data)
        let details = {};
        for(let method of paymentMethod){
            // console.log(method)
            if(method.name === selectedPaymentMethod) details = method.properties;
        }
        // const {properties} = details;
        if(selectedPaymentMethod === 'BANK_TRANSFER') return `Kindly make payment to Access Bank with Account Number: ${details.AccountNumber}`
        if(selectedPaymentMethod === 'MONEY_TRANSFER') return `Kindly make payment through a send money operation on Paga to this account: ${details.AccountNumber}`
        if(selectedPaymentMethod === 'FUNDING_USSD') return `Kindly dial the short code below to make payment: ${details.USSDShortCode}`
    }

    render() {
        const { paymentMethod, selectedPaymentMethod,data } = this.state
        return (
            <div style={{marginTop: "100px"}}>
                <h2 style={{textAlign:"center", marginBottom:"50px"}}>Please select a payment Method</h2>
                <div style={{ width: "60%", height: "400px", margin: "auto" , boxShadow: "0 15px 40px rgb(166 173 201 / 20%)", borderRadius:"10px"}}>
                <div style={{ float: "left", width: "30%",backgroundColor:"#f8f9fa", height:"inherit", borderRadius: "5px", paddingTop:"50px"}}>
                    <ul className={styles.listGroup}>
                        {paymentMethod.map(method => (
                            <li className = {
                                method.name === selectedPaymentMethod ? styles.listGroupItemActive : styles.listGroupItem
                            }
                                key={method["name"]}
                                style={{ cursor: "pointer" }}
                                onClick={() => this.onMethodChange(method.name)}
                            >
                                {this.formatPaymentMethod(method["name"])}
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{float:"right", width:"70%", height:"inherit"}}>
                    <h4 style = {{fontSize:"15px", paddingTop:"50px", paddingLeft:"20px", paddingRight:"20px", paddingBottom:"10px"}}> {this.displayMessage()} </h4>
                    <h4 style={{fontSize:"15px",padding:"10px 20px"}}>Amount: &#8358;{data.totalPaymentAmount}</h4>
                    <h4 style={{fontSize:"15px",padding:"10px 20px"}}>Payment Deadline: {moment(data.expiryDateTimeUTC).format('LLLL')}</h4>
                    <h4 style={{fontSize:"15px",padding:"10px 20px"}}>Transaction Id: {data.referenceNumber}</h4>
                    
                    <Link to = '/'>
                    <button className='btn btn-primary' style={{margin:"60px auto", display:"block"}}>I have made payment</button>
                    </Link>
                    
                    
                </div>
            </div>
            </div>
            
        );
    }
}

export default RentalInformation;