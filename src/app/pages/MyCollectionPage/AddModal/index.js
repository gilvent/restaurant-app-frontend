import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
    FormGroup, Label, Input
} from 'reactstrap';

class AddCollectionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       name: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({
        name:event.target.value
    })
  }

  handleSubmit = () => {
      const { toggle, onSubmit } = this.props;
      onSubmit(this.state.name);
      toggle();
  }

  render() {
    const { isOpen, toggle } = this.props;
    return (
      <div>
        <Modal isOpen={isOpen} toggle={toggle} >
          <ModalHeader toggle={toggle}>Add New Collection</ModalHeader>
          <ModalBody>
            <FormGroup>
                <Label>Enter Collection Name</Label>
                <Input type="text" name="name" placeholder="Meat-lovers, Veg favorite..." 
                       onChange={this.handleChange}/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.handleSubmit}>Add</Button>
            <Button color="primary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddCollectionModal;