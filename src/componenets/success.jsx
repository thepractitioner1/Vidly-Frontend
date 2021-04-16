import React, { Component } from "react";

class SuccessPage extends Component {
    render() {
        return (
            <div style={{
                margin: "0",
                width:"100%",
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
                        <br/>
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
                    }}>We received your purchase request;<br /> we'll be in touch shortly!</p>
                </div>

            </div >
        )
    }
}


export default SuccessPage;