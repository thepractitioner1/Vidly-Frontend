import React from "react";
import { getMovie } from "../services/movieService";
import qs from "query-string"
import { createPaymentRequest, payMerchant } from "../services/rentService.js"
import { getGenreById } from "../services/genreService";
import Joi from "joi-browser";
import Form from "./common/form";


class RentalForm extends Form {
    state = {
        data: { fullName: "", phoneNumber: "", email: "" },
        errors: {},
    };

    schema = {
        fullName: Joi.string()
            .required()
            .label("Full name"),
        phoneNumber: Joi.string()
            .required()
            .label("Phone Number"),
        email: Joi.string()
            .email()
            .required()
            .label("Email")
    };

    async componentDidMount() {

        const { match } = this.props;

        try {

            const movieId = match.params.id;
            const { data: movie } = await getMovie(movieId)
            const { data: genre } = await getGenreById(movie.genre._id)
            console.log(genre);
            this.setState({
                movie: this.mapToViewModel(movie, genre),
            })
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                return this.props.history.replace("/not-found");
        }
    };


    mapToViewModel(movie, genre) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate,
            genreName: genre.name
        };
    }

    async doSubmit() {
        try {
            const { location, match } = this.props;
            // const { code } = qs.parse(location.search);
            const movieId = match.params.id
            const{fullName, phoneNumber, email, paymentMethod} = this.state.data
            const requestData = {
                name: fullName,
                phoneNumber,
                email,
                movieId
            }
            const response = await createPaymentRequest(requestData);
            console.log(response);
            if (response.data.status === 500 || response.data.status === 400 || response.data.status === 401) return window.location = '/notFound';
            return window.location = `/rentPreview/${response.data.orderId}`
        } catch (ex) {
            if (ex.response && ex.response.status === 400 && ex.responsse.status === 500) {
                console.log("something failed")
            }
        }

    }



    render() {
        const myStyle = {

            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
        }

        const {
            movie,
        } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("fullName", "Full Name")}
                    {this.renderInput("phoneNumber", "Phone Number")}
                    {this.renderInput("email", "Email", "Email")}
                    {this.renderButton("Pay")}
                </form>
            </div>
        );
    }
}

export default RentalForm;