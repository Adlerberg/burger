import React from 'react';

import Aux from '../../../hoc/Auxx';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (<li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}: {props.ingredients[igKey]}</span>
                </li> );
        });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p> Here is your burger with following ingredients: </p>
            <ul> 
                {ingredientSummary}
            </ul>
            <p>Continie to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanselled} >CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued} >CONTINUE</Button>

       </Aux>
    )
}

export default orderSummary;