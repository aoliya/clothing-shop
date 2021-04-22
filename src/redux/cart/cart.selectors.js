import { createSelector } from 'reselect';

//input selectors, returns a piece of the state
const selectCart = state => state.cart;
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => 
    //this reduce gives a total quantity of cartItems
    cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,  0
    )
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems =>
    cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity * cartItem.price,  0
    )
)