import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button, Form, FormGroup, Label, Input, Row,Col,
    UncontrolledCollapse, CardBody, Card } from 'reactstrap';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleTimeInput = this.handleTimeInput.bind(this);
        this.handleDaySelect = this.handleDaySelect.bind(this);
        let { filters } = this.props
        this.state = {
            name: filters.name || "",
            time: filters.time || "",
            weekdays: filters.weekdays ? filters.weekdays.split(',').map(string => parseInt(string)) : [],
        }
    }

    handleNameInput = (event) => {
        this.setState({
            name: event.target.value
        });
    }
    handleTimeInput = (event) => {
        this.setState({
            time: event.target.value
        })
    }

    handleDaySelect = (event) => {
        let weekdayId = parseInt(event.target.value);
        const { weekdays } = this.state;
        if(weekdays.indexOf(weekdayId)==-1){
            this.setState({
                ...this.state,
                weekdays: weekdays.concat(weekdayId)
            })
            
        }
        else {
            weekdays.splice(weekdays.indexOf(weekdayId),1);
            this.setState({
                weekdays: weekdays
            })
        }
        
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let { onSearchSubmit } = this.props;
        let searchFilters = {
            ...this.state,
            weekdays: this.state.weekdays.join(',')
        };
        
        onSearchSubmit(searchFilters);
    }

    

    render(){
        const weekdaysCheckboxes = this.props.weekdays.map(weekday => 
            (<FormGroup check inline>
                <Label check style={{fontSize:'70%'}}>
                  <Input type="checkbox" 
                         value={weekday.id}
                         checked={this.state.weekdays.indexOf(weekday.id)!=-1}
                         onChange={this.handleDaySelect}/> {weekday.name}
                </Label>
              </FormGroup>
            )
        )
        return (
            
            <Col md={12}>
                <Form inline className="search-restaurant-form"> 
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleEmail" className="mr-sm-2">Name</Label>
                            <Input type="text" name="name" id="restaurantName" placeholder="Restaurant Name.." 
                                onChange={this.handleNameInput}
                                value={this.state.name} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="examplePassword" className="mr-sm-2">Time</Label>
                            <Input type="time" name="time" id="openTime" placeholder="don't tell!" 
                                onChange={this.handleTimeInput} 
                                value={this.state.time}/>
                        </FormGroup>
                        <Button color="primary" id="toggler" className="mr-sm-2">
                            Select Days
                        </Button>
                        <Button onClick={this.handleSubmit}>Search</Button>
                        <UncontrolledCollapse toggler="#toggler">
                            <Row className="mt-2" style={{textAlign:"center"}}>
                                {weekdaysCheckboxes}
                            </Row>
                            
                        </UncontrolledCollapse>
                </Form>
            </Col>
            
            
        )
    }
}

export default withRouter(SearchBar);