import React, { Component } from "react";
import { getMovie } from "../services/movieService";
import '../App.css'
import { getGenreById } from "../services/genreService";

class RentalForm extends Component {
    state = {
        movie: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "", genreName: "" },
    };

    async componentDidMount() {

        try {

            const movieId = this.props.match.params.id;
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
            <div style={{ backgroundColor: "#f1f3f5" }}>
                <div style={myStyle} align="center">

                    <div className="card" style={{ width: "30%", boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)" }}>
                        <div className="card-body">
                            <table className="table table-borderless" align="center">
                                <tbody align="center">
                                    <tr>
                                        <td>Title</td>
                                        <td>{movie.title}</td>
                                    </tr>

                                    <tr>
                                        <td>Genre</td>
                                        <td>{movie.genreName}</td>
                                    </tr>

                                    <tr>
                                        <td>Number Available</td>
                                        <td>{movie.numberInStock}</td>
                                    </tr>

                                    <tr>
                                        <td>Rental Rate</td>
                                        <td>${movie.dailyRentalRate}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <a href = "https://beta.mypaga.com/paga-webservices/oauth2/authorization?client_id=A3878DC1-F07D-48E7-AA59-8276C3C26647&response_type=code&redirect_uri=https://cryptic-fjord-22142.herokuapp.com/movies&state=state&scope=USER_DEPOSIT_FROM_CARD+MERCHANT_PAYMENT+USER_DETAILS_REQUEST&user_data=FIRST_NAME+LAST_NAME+USERNAME+EMAIL">
                            <button className="btn btn-primary">
                                Rent
                            </button>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default RentalForm;