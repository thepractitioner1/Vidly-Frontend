import React, { Component } from "react";
import { getOrderStatus } from "../services/rentService";
import { Link } from "react-router-dom";

class SuccessPage extends Component {
    state = {
        data: {},
        paymentDetails: ""
    }


    async componentDidMount() {
        const { match } = this.props;

        const orderId = match.params.id;
        try {
            const orderStatus = await getOrderStatus(orderId);
            if (orderStatus.data.error) return;
            this.setState({ data: orderStatus })
            if (orderStatus.data.response.data.paymentMethods[0].properties.AccountNumber !== undefined) {
                this.setState({ paymentDetails: orderStatus.data.response.data.paymentMethods[0].properties.AccountNumber })
            } else {
                this.setState({ paymentDetails: orderStatus.data.response.data.paymentMethods[0].properties.USSDShortCode })
            }

        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                return this.props.history.replace("/not-found");
        }
    }


    render() {
        return (
            <div style={{
                margin: "0",
                width: "100%",
                textAlign: "center",
                padding: "40px 0",
                backgroundColor: " #f1f3f5"
            }} className="container">

                <div style={{
                    background: "white",
                    padding: "60px",
                    borderRadius: "4px",
                    boxShadow: "0 2px 3px #C8D0D8",
                    display: "inline-block",
                    margin: "0 auto"
                }}>
                    <div style={{ borderRadius: "200px", height: "200px", width: "200px", background: "#F8FAF5", margin: "0 auto" }}>
                        <br />
                        <i style={{
                            color: "#9ABC66",
                            fontSize: "100px",
                            lineheight: "200px",
                            marginLeft: "-15px"
                        }}>✓</i>
                    </div>
                    <br></br>
                    <h1 style={{
                        color: "#88B04B",
                        fontFamily: "Nunito Sans, Helvetica Neue, sans-serif",
                        fontWeight: "900",
                        fontSize: "40px",
                        marginBottom: "10px"
                    }}>Success</h1>
                    <p style={{
                        color: "#404F5E",
                        fontFamily: "Nunito Sans, Helvetica Neue, sans-serif",
                        fontSize: "20px",
                        margin: "0"
                    }}>We received your purchase request;<br /> Kindly pay using the bank Transfer to the GT bank account below or ussd shortcode below!</p>
                    <div>
                        {this.state.paymentDetails}
                    </div>
                    <Link to='/'>
                        <button className="btn btn-primary"  style={{marginTop : "20px"}}>
                            HomePage
                        </button>
                    </Link>
                </div>

            </div >
        )
    }
}


export default SuccessPage;