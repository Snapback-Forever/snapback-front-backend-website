import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authreducer";
import msgReducer from "./reducers/userMsgReducer"
import websiteReducer from "./reducers/websiteReducer";

const store = configureStore({

    reducer: {

        auth: authReducer,
        userMsg: msgReducer,
        web: websiteReducer
     
    },

  
        
})

export default store