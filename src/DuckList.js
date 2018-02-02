import React, {Component} from 'react';
import Duck from "./Duck.js";
import './DuckList.css';
import axios from 'axios';
import _ from 'lodash'
import { NavLink } from "react-router-dom"
import {Col, Row} from 'reactstrap';

class DuckList extends Component {
    constructor() {
        super();
        this.state = {
            items: [

            ]
        };

        this.sort = this.sort.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8081/sightings')
            .then( res => {
                const items = res.data;
                this.setState({ items });
            });
    }

    sort(param) {
        let items = this.state.items;
        items = _.sortBy(items, function(dateObj) {
            return new Date(dateObj.dateTime);
        });
        if (param === "new") {
            items.reverse()
        }
        this.setState({ items });
    }

    render() {
        const items = _.values(this.state.items);
        const allTheDucks = items.map(item => {
            return <Duck key={item.id}
                         species={item.species}
                         count={item.count}
                         description={item.description}
                         dateTime={item.dateTime}
            />
        });
        return (
            <div>
                <nav>
                    <NavLink className="navButton" to="/add">Add a new sighting</NavLink>
                </nav>
                <Row className="rowBoat">
                    <Col md={6}>
                        <button className="sortButton" onClick={() => this.sort("old")}>Oldest first</button>
                    </Col>
                    <Col md={6}>
                        <button className="sortButton" onClick={() => this.sort("new")}>Newest first</button>
                    </Col>
                </Row>
                {allTheDucks}
            </div>
        );
    }
}

export default DuckList;
