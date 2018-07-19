import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

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

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.state.totalPrice.toFixed(2),
            customer: {
                name: 'Alex Sorochan',
                address: {
                    street: 'BlahBlah 1',
                    city: 'TestCity',
                    zipCode: '654231',
                    country: 'Ukraine'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'greatest'
        }
        axios.post('/orders.json', order)
        .then(responce => {
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false});
        });

    }

    render () {
        let form = (
            <form >
                   <input className={classes.Input} type="text" name="name" placeholder="Your Name" /> 
                   <input className={classes.Input} type="email" name="email" placeholder="Your Mail" /> 
                   <input className={classes.Input} type="text" name="city" placeholder="Your City" /> 
                   <input className={classes.Input} type="text" name="postal" placeholder="Your Postal Code" /> 
                   <input className={classes.Input} type="text" name="street" placeholder="Your Street" /> 
                   <input className={classes.Input} type="text" name="streetNumber" placeholder="Your Street Number" /> 
                   <input className={classes.Input} type="text" name="appartament" placeholder="Your Appartament Number" /> 
                   <Button btnType="Success" clciked={this.orderHandler}>ORDER</Button>
                </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Please, enter your Contact Data </h4>
                {form}
            </div>
        )
    }
}

export default ContactData;