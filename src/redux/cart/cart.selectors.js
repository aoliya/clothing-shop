import { createSelector } from 'reselect';

//input selectors, returns a piece of the state
const selectCart = state => state.cart;
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => 
    //this reduce gives a total quantity of cartItems
    cartItems.reduce((accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity,  0
    )
)