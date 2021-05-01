import React, { Component } from "react";
import Like from "./common/Like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class MoviesTable extends Component {
 
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like Liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      )
    },
    {
      key: "rentButton", content: movie => {

        return (
          <a href={`https://beta.mypaga.com/paga-webservices/oauth2/authorization?client_id=9BF570AA-ECCF-4F11-858F-B4108535445F&response_type=code&redirect_uri=https://cryptic-fjord-22142.herokuapp.com/rent/getMovie/${movie._id}&state=state&scope=USER_DEPOSIT_FROM_CARD+MERCHANT_PAYMENT+USER_DETAILS_REQUEST&user_data=FIRST_NAME+LAST_NAME+USERNAME+EMAIL`}>
            <button className="btn btn-primary">
              Rent
            </button>
          </a>
        )
      }
    }
  ];
  deleteColumn = {
    key: "delete",
    content: movie => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };
  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }
  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}
export default MoviesTable;
