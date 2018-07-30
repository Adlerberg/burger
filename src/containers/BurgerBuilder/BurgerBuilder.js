import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from 'axios';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount () {
        this.props.onInitIngredients();
    }
    upadtePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            },0);
            return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };
    
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render () {
        const disableInfo = {
            ...this.props.ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded} 
                    ingredientRemoved={this.props.onIngredientRemoved} 
                    disabled={disableInfo}
                    price={this.props.price}
                    purchasable={this.upadtePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler} />
                </Aux>
                );
                orderSummary =  <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price} 
                purchaseCanselled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />; 
        }    

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
}

const mapDispatchtoProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(withErrorHandler(BurgerBuilder, axios));