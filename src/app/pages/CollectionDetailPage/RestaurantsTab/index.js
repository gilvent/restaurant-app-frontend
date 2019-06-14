import React, { Component } from 'react';
import { Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

class RestaurantsTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addRestaurantsModal: false
        };
    
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState(prevState => ({
            addRestaurantsModal: !prevState.addRestaurantsModal
        }));
    }

    renderRestaurants = () => {
        const { restaurants, onRemoveRestaurant } = this.props;
        return restaurants ? restaurants.map(restaurant => 
            (
                <ListGroupItem className="restaurant-list-item">
                    <ListGroupItemHeading className="list-item-heading">
                        {restaurant.name}
                    </ListGroupItemHeading>
                    <ListGroupItemText style={{fontSize:'60%'}}>
                        {restaurant.scheduleInfo}
                    </ListGroupItemText>
                    <Button color="danger" onClick={()=> onRemoveRestaurant(restaurant.id)}>Remove</Button>
                </ListGroupItem>
            )
        )
        :
        (<div>No Restaurants in this collection</div>);
    }

    renderAvailableRestaurants = () => {
        const { availableRestaurants, onAddRestaurant } = this.props;
        return availableRestaurants ? availableRestaurants.map(restaurant => 
            (
                <ListGroupItem tag="button" action onClick={()=> onAddRestaurant(restaurant.id)}>{restaurant.name}</ListGroupItem>
            )
        )
        :
        (<div>No available restaurants to be added</div>)
    }

    render(){
        return (
            <div>
                <Row className="mt-3" style={{textAlign:"left"}}>
                    <Col md={12}>
                        <Button color="success" onClick={this.toggle}>Add Restaurants</Button>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col md={12}>
                        { this.renderRestaurants() }
                    </Col>
                </Row>
                <Modal isOpen={this.state.addRestaurantsModal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add Restaurant to Collection</ModalHeader>
                    <ModalBody style={{maxHeight:400,overflow:"auto"}}>
                        <ListGroup>
                            {this.renderAvailableRestaurants()}
                        </ListGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
            
        )
    }   
}

export default RestaurantsTab;