import React, { Component } from 'react';
import { Row, Col, Table, Button,
    Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, UncontrolledCollapse
} from 'reactstrap';

class CollaboratorsTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inviteCollaboratorModal: false,
            email: ""
        };
    
        this.toggle = this.toggle.bind(this);
    }

    toggle = () => {
        this.setState(prevState => ({
            inviteCollaboratorModal: !prevState.inviteCollaboratorModal
        }));
    }

    handleInputChange = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    handleSendInvitation = () => {
        this.props.onSendInvitation(this.state.email);
        this.toggle();
    }

    renderCollaborators = () => {
        const { collaborators } = this.props;
        const rows = collaborators.map((collaborator,index) => {
            return (
                <tr>
                    <th scope="row">{index+1}</th>
                    <td>{collaborator.username}</td>
                    <td>{collaborator.email}</td>
                </tr>
            )
        });

        return collaborators.length!=0 ? (
                <Table style={{color:"white"}}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
        ) : (<div>No Collaborator</div>)
                    
    }

    renderPendingCollaborators = () => {
        const { pendingCollaborators } = this.props;
        const list = pendingCollaborators ? pendingCollaborators.map(email => (
            <li>{email}</li>
        ))
        :
        null;
        return list && list.length != 0 ? (
            <Row className="mt-3" style={{textAlign:"left"}}>
            <Col md={12}>These people are invited but have not made account yet:</Col>
            <ul>
                {list}
            </ul>
            </Row>
            
        ) : null
    }

    render(){
        const { isCollaborator } = this.props;
        return (
            <div>
                <Row className="mt-3" style={{textAlign:"left"}}>
                    <Col md={12}>
                        {
                            !isCollaborator &&
                            <Button color="success" onClick={this.toggle}>Invite Collaborator</Button>
                        }
                        
                        <Button color="info" id="toggler" className="ml-3">
                            Show Pending Invites
                        </Button>
                    </Col>
                </Row>
                <UncontrolledCollapse toggler="#toggler">
                    
                    {this.renderPendingCollaborators()}    
                    
                </UncontrolledCollapse>
                <Row className="mt-3" >
                    <Col>
                        {this.renderCollaborators()}
                    </Col>
                </Row>
                
                <Modal isOpen={this.state.inviteCollaboratorModal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Invite Collaborator</ModalHeader>
                    <ModalBody style={{maxHeight:400,overflow:"auto"}}>
                    <FormGroup>
                        <Label>Send Invitation to Email</Label>
                        <Input type="email" name="email" placeholder="example@gmail.com" 
                            value={this.state.email}
                            onChange={this.handleInputChange}/>
                    </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.handleSendInvitation}>Send</Button>
                        <Button color="primary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
                
                
            </div>
        )
    }   
}

export default CollaboratorsTab;