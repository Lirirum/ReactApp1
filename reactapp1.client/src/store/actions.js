export const addToCart = (product) => ({
    type: 'ADD_TO_CART',
    payload: product,
  });
  
  export const removeFromCart = (productId) => ({
    type: 'REMOVE_FROM_CART',
    payload: productId,
  });

  export const addProductComm = (productId, comment) => ({
    type: 'ADD_PRODUCT_COMMENT',
    productId,
    comment,
  });
  
  export const removeProdcutComm = (productId) => ({
    type: 'REMOVE_PRODUCT_COMMENT',
    payload: productId,
  });




  export const openCartMenu = () => ({
    type: 'OPEN_CART_MENU',
    payload: true,
  });

  export const closeCartMenu = () => ({
    type: 'CLOSE_CART_MENU',
    payload: false,
  });

  export const openLoginMenu = () => ({
    type: 'OPEN_LOGIN_MENU',
    payload: true,
  });

  
  export const closeLoginMenu = () => ({
    type: 'CLOSE_LOGIN_MENU',
    payload: false,
  });

  export const openCommentMenu = () => ({
    type: 'OPEN_COMMENT_MENU',
    payload: true,
  });

  
  export const closeCommentMenu = () => ({
    type: 'CLOSE_COMMENT_MENU',
    payload: false,
  });