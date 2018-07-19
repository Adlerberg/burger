import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            city: '',
            postalCode: '',
            street: '',
            streetNumber: '',
            appartament: ''
        }
    }
    render () {
        return (
            <div className={classes.ContactData}>
                <h4>Please, enter your Contact Data </h4>
                <form >
                   <input className={classes.Input} type="text" name="name" placeholder="Your Name" /> 
                   <input className={classes.Input} type="email" name="email" placeholder="Your Mail" /> 
                   <input className={classes.Input} type="text" name="city" placeholder="Your City" /> 
                   <input className={classes.Input} type="text" name="postal" placeholder="Your Postal Code" /> 
                   <input className={classes.Input} type="text" name="street" placeholder="Your Street" /> 
                   <input className={classes.Input} type="text" name="streetNumber" placeholder="Your Street Number" /> 
                   <input className={classes.Input} type="text" name="appartament" placeholder="Your Appartament Number" /> 
                   <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;