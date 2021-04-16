import React, { Component } from "react";
import { getMovie } from "../services/movieService";
import qs from "query-string"
import { payMerchant } from "../services/rentService.js"
import { getGenreById } from "../services/genreService";


class RentalForm extends Component {
    state = {
        movie: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "", genreName: "" },
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

    async pay() {
        try {
            const { location, match } = this.props;
            const { code } = qs.parse(location.search);
            const movieId = match.params.id
            const response = await payMerchant(code,movieId);
            console.log(response);
            if(response.data.status === 500 || response.data.status === 400 || response.data.status === 401) return window.location = '/notFound';
            return window.location = "/success"
        }catch(ex){
            if (ex.response && ex.response.status === 400 && ex.responsse.status === 500){
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


                            <button onClick={()=>{this.pay()}} className="btn btn-primary">
                                Rent
                                </button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default RentalForm;