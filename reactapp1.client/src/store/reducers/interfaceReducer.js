import products from "../../components/Product/Product.js"


const initialState = {
    loginVisible:false,
    commentVisible:false
  };
  
  const interfaceReducer = (state = initialState, action) => {
    switch (action.type) {
      
      case 'OPEN_LOGIN_MENU':    
          
        return {
          ...state,
          loginVisible: action.payload
    
        };
        case 'CLOSE_LOGIN_MENU':              
        return {
          ...state,
          loginVisible: action.payload
    
        };
  

        case 'OPEN_COMMENT_MENU':    
          
        return {
          ...state,
          commentVisible: action.payload
    
        };
        case 'CLOSE_COMMENT_MENU':              
        return {
          ...state,
          commentVisible: action.payload
    
        };

      default:
        return state;
    }
  };
  
  export default interfaceReducer;