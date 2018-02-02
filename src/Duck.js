import React, {Component} from 'react';
import PropTypes from "prop-types";
import './Duck.css';


class Duck extends Component {
    render() {
        return (
            <div className="DuckDiv">
                <h1 className="DuckTitle">{this.props.species}</h1>
                <div className="Content">{this.props.count} {this.props.species}
                {this.props.count === 1 ? " was" : "s were"} spotted at {(new Date(this.props.dateTime)).toString()}</div>
                <div className="Description">"{this.props.description}"</div>
            </div>
        );
    }
}


Duck.propTypes = {
    species: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    dateTime: PropTypes.string.isRequired,
};

export default Duck;
