import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input, FormText, Col, Container} from 'reactstrap';
import {NavLink} from "react-router-dom"
import axios from 'axios';
import './DuckForm.css';
import _ from 'lodash'

class DuckForm extends Component {
    constructor() {
        super();
        this.state = {
            optionsList: [
                {
                    name: 'Loading.'
                }
            ],
            items: {}
        };

        this.onChange = this.onChange.bind(this);

    }

    componentDidMount() {
        axios.get('http://localhost:8081/species')
            .then(res => {
                const names = res.data;
                this.setState({optionsList: names, items: {species: names[0]['name']}});
            });
    }

    onChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        document.getElementById("conditionallyHidden").style.opacity = 0;
        this.setState(prevState => {
            const items = {
                ...prevState.items,
                [name]: value
            };

            return {
                items
            };
        });
    }

    handleSubmit() {
        let items = this.state.items;
        if (items.dateTime === undefined) {
            items.dateTime = new Date();
        }
        else {
            items.dateTime = new Date(new Date(items.dateTime).getTime());
        }
        if (items.count === undefined || items.count < 1) {
            items.count = 1;
        }
        if (items.description === undefined || items.description.length < 1) {
            items.description = "No description was given.";
        }
        items.count = Number(items.count);
        axios.post('http://localhost:8081/sightings', items)
            .then(res => {
                console.log(res);
                this.setState(prevState => {
                    const items = {
                        ...prevState.items,
                        ...this.state.name,
                        description: "",
                        count: ""
                    };
                    return {
                        items
                    };
                });
                document.getElementById("conditionallyHidden").style.opacity = 1
            });

    }

    render() {
        const items = _.values(this.state.optionsList);
        const options = items.map(item => {
            return <option key={item.name}>{item.name}</option>
        });

        return (
            <div>
                <nav>
                    <NavLink to="/">Go back to listing</NavLink>
                </nav>
                <Container className="formContainer">
                    <Form onSubmit={event => {
                        event.preventDefault();
                        this.handleSubmit()
                    }}>
                        <Label>Please define the following:</Label>
                        <FormGroup row>
                            <Col lg={3} className="padded">
                                <Label for="species">Species</Label>
                                <Input type="select" name="species" id="species" value={this.state.items.species}
                                       onChange={this.onChange}>
                                    {options}
                                </Input>
                            </Col>
                            <Col lg={6} className="padded">
                                <Label for="dateTime">Time</Label>
                                <Input type="datetime-local" name="dateTime" id="dateTime" onChange={this.onChange}/>
                                <FormText color="muted">
                                    Default time: right now
                                </FormText>
                            </Col>
                            <Col lg={3} className="padded"><FormGroup>
                                <Label for="count">Count</Label>
                                <Input type="number" min="1" name="count" id="count" value={this.state.items.count}
                                       onChange={this.onChange}/>
                                <FormText color="muted">
                                    Default value: 1
                                </FormText>
                            </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input type="textarea" name="description" id="description"
                                   value={this.state.items.description}
                                   onChange={this.onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <FormText id="conditionallyHidden" color="success">
                                Successfully submitted!
                            </FormText>
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default DuckForm;
