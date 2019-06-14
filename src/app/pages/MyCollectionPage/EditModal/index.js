import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
    FormGroup, Label, Input
} from 'reactstrap';

class EditCollectionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       name: "",
       id: null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate = (prevProps) => {
    const { collectionName, collectionId } = this.props;

    if(collectionName !== prevProps.collectionName)
        this.setState({ name: collectionName});
        
    if(collectionId !== prevProps.collectionId)
        this.setState({ id: collectionId});
  }

  handleChange = (event) => {
    this.setState({
        name: event.target.value
    })
  }

  handleSubmit = () => {
      const { toggle, onSubmit } = this.props;
      onSubmit(this.state.name, this.state.id);
      toggle();
  }

  render() {
    const { isOpen, toggle } = this.props;
    return (
      <div>
        <Modal isOpen={isOpen} toggle={toggle} >
          <ModalHeader toggle={toggle}>Edit New Collection</ModalHeader>
          <ModalBody>
            <FormGroup>
                <Label>Enter Collection Name</Label>
                <Input type="text" name="name" placeholder="Meat-lovers, Veg favorite..." 
                       value={this.state.name}
                       onChange={this.handleChange}/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={this.handleSubmit}>Edit</Button>
            <Button color="primary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditCollectionModal;