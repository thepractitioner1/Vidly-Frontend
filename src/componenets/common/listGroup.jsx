import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    const {
      items: Genres,
      SelectedGenre,
      textProperty,
      valueProperty,
      onGenreChange
    } = this.props;

    return (
      <ul className="list-group">
        {Genres.map(genre => (
          <li
            className={
              genre === SelectedGenre
                ? "list-group-item active"
                : "list-group-item"
            }
            key={genre[valueProperty]}
            style={{ cursor: "pointer" }}
            onClick={() => onGenreChange(genre)}
          >
            {genre[textProperty]}
          </li>
        ))}
      </ul>
    );
  }
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
