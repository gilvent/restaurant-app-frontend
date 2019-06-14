import React, {Component} from 'react';
import { connect} from 'react-redux';
import { Container, Row, Col, Button, 
    TabContent, TabPane, Nav, NavItem, NavLink    
} from 'reactstrap';
import classnames from 'classnames';

import collectionSelectors from 'app/redux/selectors/collection';
import collectionActions from 'app/redux/actions/collection';
import userSelectors from 'app/redux/selectors/user';
import userActions from 'app/redux/actions/user';
import restaurantActions from 'app/redux/actions/restaurant';
import restaurantSelectors from 'app/redux/selectors/restaurant';
import authSelectors from 'app/redux/selectors/auth';

import './CollectionDetailPage.scss';
import CollaboratorsTab from './CollaboratorsTab';
import RestaurantsTab from './RestaurantsTab';
import EditModal from './EditModal';

class CollectionDetailPage extends Component {

    constructor(props) {
        super(props);

        this.toggleTab = this.toggleTab.bind(this);
        this.toggleEditModal = this.toggleEditModal.bind(this);
        this.state = {
            activeTab: '1',
            editModalOpen: false
        };
    }

    toggleTab = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
            activeTab: tab
            });
        }
    }

    toggleEditModal = () => {
        this.setState(prevState => ({
            editModalOpen: !prevState.editModalOpen
        }));
    }

    componentDidMount = () => {
        const { username, collectionId } = this.props.match.params;
        this.props.GetCollectionInfo(username, parseInt(collectionId));
        this.props.GetRestaurants();
    }

    handleEditNameSubmit = (collectionName) => {
        const { EditUserCollection } = this.props;
        const { collectionId,username } = this.props.match.params;
        EditUserCollection(username,collectionId,collectionName)
    }

    handleAddDetail = (restaurantId) => {
        const { username, collectionId } = this.props.match.params;
        this.props.AddCollectionDetail(username,parseInt(collectionId),restaurantId);
    }

    handleRemoveDetail = (restaurantId) => {
        const { username, collectionId } = this.props.match.params;
        this.props.RemoveCollectionDetail(username,parseInt(collectionId),restaurantId);
    }

    handleSendInvitation = (email) => {
        const { username, collectionId } = this.props.match.params;
        const { Collection } = this.props;
        this.props.SendInvitation(email,collectionId,Collection(collectionId).collectionName);
        this.props.AddCollaborator(username,collectionId,email);
    }

    render(){
        const { MyUsername, CollectionOwner, Collection, Collaborators, PendingCollaborators, CollectionDetails, AllRestaurants, 
            isUsersCollection } = this.props;
        const { username, collectionId } = this.props.match.params;
        const collection = Collection(collectionId);
        const owner = CollectionOwner(username);
        const collaborators = Collaborators(collectionId);
        const pendingCollaborators = PendingCollaborators(collectionId);
        const collectionDetails = CollectionDetails(collectionId);
        const availableRestaurants = AllRestaurants.filter(x => !collectionDetails.find(detail => detail.id == x.id));
        const isCollaborator = collection.collaborators.indexOf(MyUsername) != -1;
        return (
            <Container>
                <Row className="mt-3">
                    <Col md={{size:10,offset:1}}>
                        {
                            !owner || !collection || !isUsersCollection(username,collectionId)?
                            <Row>
                                <Col md={12}>
                                    <h3>There is no specified {username}'s collection</h3>
                                </Col>
                            </Row>
                            : !isCollaborator  && MyUsername != username ?
                            <Row>
                                <Col md={12}>
                                    <h3>You are not a collaborator of this collection</h3>
                                </Col>
                            </Row>
                            :
                            <div>
                            <Row>
                                <Col md={12}>
                                    <h3>{collection.collectionName} </h3>
                                    <h4>({owner.username}'s Collection)</h4>
                                </Col>
                            </Row>
                            <EditModal isOpen={this.state.editModalOpen} 
                                        toggle={this.toggleEditModal}
                                        onSubmit={this.handleEditNameSubmit}
                                        collectionName={collection.collectionName}/>
                            <Row>
                                <Col md={12}>
                                    <Button className="btn-warning" onClick={this.toggleEditModal}>
                                        Edit Name
                                    </Button>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col md={12}>
                                    <Nav tabs className="collection-detail-tab">
                                        <NavItem>
                                            <NavLink
                                            className={classnames({ active: this.state.activeTab === '1' })}
                                            onClick={() => { this.toggleTab('1'); }}>
                                            Restaurants
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                            className={classnames({ active: this.state.activeTab === '2' })}
                                            onClick={() => { this.toggleTab('2'); }}>
                                            Collaborators
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </Col>
                                <Col md={12}>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <RestaurantsTab restaurants={collectionDetails}
                                                        availableRestaurants={availableRestaurants}
                                                        onAddRestaurant={this.handleAddDetail}
                                                        onRemoveRestaurant={this.handleRemoveDetail}/>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <CollaboratorsTab collaborators={collaborators}
                                                          pendingCollaborators={pendingCollaborators}
                                                          onSendInvitation={this.handleSendInvitation}
                                                          isCollaborator={isCollaborator}/>
                                    </TabPane>
                                </TabContent>
                                </Col>
                                
                            </Row>
                            </div>
                            

                        }
                        
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    MyUsername : authSelectors.getMyUsername(state),
    CollectionOwner : (username) => userSelectors.getUserByUsername(username)(state),
    Collection : (id) => collectionSelectors.getCollectionById(id)(state),
    Collaborators : (id) => collectionSelectors.getCollaborators(id)(state),
    PendingCollaborators: (id) => collectionSelectors.getPendingCollaborators(id)(state),
    CollectionDetails : (id) => collectionSelectors.getCollectionDetails(id)(state),
    isUsersCollection : (username,collectionId) => userSelectors.isUsersCollection(username,collectionId)(state),
    AllRestaurants : restaurantSelectors.getAllRestaurants(state),
});

const mapDispatchToProps = (dispatch) => ({
    EditUserCollection : (username,collectionId,collectionName) => dispatch(userActions.EditUserCollection(username,collectionId,collectionName)),
    GetCollectionInfo : (username,collectionId) => dispatch(collectionActions.GetCollectionInfo(username,collectionId)),
    GetRestaurants : () => dispatch(restaurantActions.GetRestaurants()),
    AddCollectionDetail : (username,collectionId,restaurantId) => dispatch(collectionActions.AddCollectionDetail(username,collectionId,restaurantId)),
    RemoveCollectionDetail : (username,collectionId,restaurantId) => dispatch(collectionActions.RemoveCollectionDetail(username,collectionId,restaurantId)),
    AddCollaborator : (username, collectionId, collaboratorEmail) => dispatch(collectionActions.AddCollaborator(username, collectionId, collaboratorEmail)),
    SendInvitation : (targetEmail, collectionId, collectionName) => dispatch(collectionActions.SendCollaboratorInvitation(targetEmail,collectionId,collectionName))
});
export default connect(mapStateToProps,mapDispatchToProps)(CollectionDetailPage);