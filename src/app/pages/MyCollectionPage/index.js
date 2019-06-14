import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    Container, Row, Col, Button,
    Card, CardTitle, CardText, CardLink, CardHeader, CardBody, CardFooter 
} from 'reactstrap';

import authSelectors from 'app/redux/selectors/auth';
import userSelectors from 'app/redux/selectors/user';
import userActions from 'app/redux/actions/user';

import EditModal from './EditModal';
import AddModal from './AddModal';
import './MyCollection.scss';


class MyCollectionPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            addModalOpen: false,
            editModalOpen: false,
            selectedCollection : {}
        };
      
        this.toggleAddModal = this.toggleAddModal.bind(this);
    }
    componentWillMount = () => {
        const { MyUsername, GetUserCollection } = this.props;
        GetUserCollection(MyUsername);
    }

    toggleAddModal = () => {
        this.setState(prevState => ({
            addModalOpen: !prevState.addModalOpen
        }));
    }

    toggleEditModal = () => {
        this.setState(prevState => ({
            editModalOpen: !prevState.editModalOpen
        }));
    }

    setSelectedCollection = (collection) => {
        this.setState(prevState => ({
            selectedCollection : collection
        }));
    }

    handleAddModalSubmit = (collectionName) => {
        const { AddUserCollection, MyUsername } = this.props;
        AddUserCollection(MyUsername,collectionName);
    }

    handleEditModalSubmit = (collectionName,collectionId) => {
        const { EditUserCollection, MyUsername } = this.props;
        EditUserCollection(MyUsername,collectionId,collectionName)
    }

    editBtnClick = (collection) => {
        this.setSelectedCollection(collection);
        this.toggleEditModal();
    }

    removeBtnClick = (collectionId) => {
        const { RemoveUserCollection, MyUsername } = this.props;
        RemoveUserCollection(MyUsername, collectionId);
    }

    render(){
        const { MyUsername, UserCollections } = this.props;
        let collectionsCards = UserCollections(MyUsername).map(collection => {
        let collectionUrl = `/${MyUsername}/collection/${collection.collectionId}`;
            return (
                <Col md={6}>
                    <Card className="my-collection-card">
                        <Link style={{textDecoration:"none"}} to={collectionUrl}>
                            <CardHeader className="card-header">
                                <CardTitle>{collection.collectionName}</CardTitle>
                            </CardHeader>
                        </Link>
                        <CardBody color="primary" className="card-body">
                            <CardText>Restaurants : {collection.restaurants ? collection.restaurants.length : 0}</CardText>
                            <CardText>Collaborators : {collection.collaborators ? collection.collaborators.length : 0}</CardText>
                            
                        </CardBody>
                        <CardFooter className="card-footer">
                            <Button onClick={() => this.editBtnClick(collection) } className="btn-warning float-left">Edit</Button>{' '}
                            <Button onClick={() => this.removeBtnClick(collection.collectionId)} className="btn-danger float-right">Delete</Button>
                        </CardFooter>
                    </Card>
                    
                </Col>
            )
        });
        return (
            <Container>
                <Row className="mt-3">
                    <Col md={{size:8,offset:2}}>
                        <Row>
                            <Col md={12}>
                                <h3>My Collections</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Button className="btn-success" onClick={this.toggleAddModal}>
                                    Add Collection
                                </Button>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            {collectionsCards}
                        </Row>
                    </Col>
                </Row>
                <AddModal isOpen={this.state.addModalOpen} 
                          toggle={this.toggleAddModal}
                          onSubmit={this.handleAddModalSubmit}/>
                <EditModal isOpen={this.state.editModalOpen} 
                           toggle={this.toggleEditModal}
                           onSubmit={this.handleEditModalSubmit}
                           collectionName={this.state.selectedCollection.collectionName}
                           collectionId={this.state.selectedCollection.collectionId}/>
            </Container>
            
        )
    }
}

const mapStateToProps = (state) => ({
    MyUsername : authSelectors.getMyUsername(state),
    UserCollections : (username) => userSelectors.getUserCollections(username)(state),
});

const mapDispatchToProps = (dispatch) => ({
    GetUserCollection : (username) => dispatch(userActions.GetUserCollection(username)),
    AddUserCollection : (username,collectionName) => dispatch(userActions.AddUserCollection(username,collectionName)),
    EditUserCollection : (username,collectionId,collectionName) => dispatch(userActions.EditUserCollection(username,collectionId,collectionName)),
    RemoveUserCollection : (username,collectionId) => dispatch(userActions.RemoveUserCollection(username,collectionId)),
});

export default connect(mapStateToProps,mapDispatchToProps)(MyCollectionPage);