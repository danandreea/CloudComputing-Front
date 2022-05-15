import React from 'react'
import { Form } from 'react-bootstrap';
 
class BootstrapDatePickerComponent extends React.Component{
 
    constructor (props) {
        super(props)
        this.state = {
          startDate: new Date()
        };
        this.handleChangeDate = this.handleChangeDate.bind(this);

      }

    handleChangeDate(date) {
        this.setState({
          startDate: date
        })
      }

    render(){
 

        return(
            <div>
               
                        <Form.Group controlId="dob">
                            <Form.Control type="date" name="startDate" placeholder="Date of Rezervation" value={this.state.startDate} onChange={ this.handleChangeDate}/>
                        </Form.Group>
               
            </div>
        )
    }
     
}
 
export default BootstrapDatePickerComponent;