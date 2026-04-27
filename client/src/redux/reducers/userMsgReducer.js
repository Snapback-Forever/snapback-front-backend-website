import axios from "axios";
import { createUserMsgSlice } from "../creator.js";
import { toast } from "react-hot-toast";

const userMsgPath = "http://127.0.0.1:8080/userMsg";

const initialState = {

    userMessages: [],
    singleUserMsg: [],
    auditReports: [],

    successMessage: "",
    errorMessage: "",
    status: "",

};

const userMsgSlice = createUserMsgSlice({
    name: "userMsg",
    initialState,
    reducers: (create) => ({

        addUserMsg: create.asyncThunk(
            async (state, thunkApi) => {
                // console.log(state)
                const res = await axios.post(`${userMsgPath}/addUserMsg`, state);
                return res.data;
            },
            {
                fulfilled: (state, action) => {
                    if (action.payload?.message) {
                        state.successMessage = action.payload.message;
                        state.errorMessage = "";
                        toast.success(action.payload.message);
                    } else {
                        state.successMessage = "";
                    }
                },
                rejected: (state, action) => {
                    const errorMsg = action.error?.message || "Error creating user message";
                    state.errorMessage = errorMsg;
                    state.successMessage = "";
                    toast.error(errorMsg);
                }
            }
        ),

        deleteUserMsg: create.asyncThunk(
            async (id, thunkApi) => {
                // console.log(id, "here")
                const res = await axios.post(
                    `${userMsgPath}/deleteUserMsg/${id}`
                );
                return res.data;
            },
            {
                fulfilled: (state, action) => {
                    if (action.payload?.message) {
                        state.successMessage = action.payload.message;
                        state.errorMessage = "";
                        toast.success(action.payload.message);
                    } else {
                        state.successMessage = "";
                    }
                },
                rejected: (state, action) => {
                    const errorMsg = action.error?.message || "Error deleting user message";
                    state.errorMessage = errorMsg;
                    state.successMessage = "";
                    toast.error(errorMsg);
                }
            }
        ),

        getAllUserMsg: create.asyncThunk(
            async (_, thunkApi) => {
                const res = await axios.get(`${userMsgPath}/getAllUserMsg`);
                return res.data;
            },
            {
                fulfilled: (state, action) => {
                    state.userMessages = action.payload;
                    state.errorMessage = "";
                },
                rejected: (state, action) => {
                    const errorMsg = action.error?.message || "Error fetching user messages";
                    state.userMessages = [];
                    state.errorMessage = errorMsg;
                }
            }
        ),

        getSingleUserMsg: create.asyncThunk(
            async (payload, thunkApi) => {
                const res = await axios.get(`${userMsgPath}/getSingleUserMsg/${payload.userMsgId}`);
                return res.data;
            },
            {
                fulfilled: (state, action) => {
                    state.singleUserMsg = action.payload;
                    state.errorMessage = "";
                },
                rejected: (state, action) => {
                    const errorMsg = action.error?.message || "Error fetching user message";
                    state.singleUserMsg = null;
                    state.errorMessage = errorMsg;
                }
            }
        ),

//      dispatch(changeUserMsgStatus({
//     msgId: "your_msg_id",
//     userId: "your_user_id",
//     newStatus: "msgCompleted", // or other status
//     answer: "Your answer here" // only required for msgCompleted
// }));
        changeUserMsgStatus: create.asyncThunk(
            async (payload, thunkApi) => {
                const res = await axios.post(
                    `${userMsgPath}/changeUserMsgStatus/${payload.msgId}/${payload.userId}`,
                    { 
                        newStatus: payload.newStatus, 
                        answer: payload.answer,
                        msgNotFAQ: payload.msgNotFAQ 
                    }
                );
                return res.data;
            },
            {
                fulfilled: (state, action) => {
                    if (action.payload?.error) {
                        state.errorMessage = action.payload.error;
                        state.successMessage = "";
                        toast.error(action.payload.error);
                    } else if (action.payload?.message) {
                        state.successMessage = action.payload.message;
                        state.errorMessage = "";
                        toast.success(action.payload.message);
                        if (action.payload.newStatus) state.status = action.payload.newStatus;
                    } else {
                        state.successMessage = "";
                        state.errorMessage = "";
                    }
                },
                rejected: (state, action) => {
                    const errorMsg = action.error?.message || "Status change failed";
                    state.errorMessage = errorMsg;
                    state.successMessage = "";
                    toast.error(errorMsg);
                }
            }
        ),

        getAllAuditReports: create.asyncThunk(
            async (_, thunkApi) => {
                const res = await axios.get(`${userMsgPath}/getAllAuditReports`);
                return res.data;
            },
            {
                fulfilled: (state, action) => {
                    state.auditReports = action.payload;
                    state.errorMessage = "";
                },
                rejected: (state, action) => {
                    const errorMsg = action.error?.message || "Error fetching audit reports";
                    state.auditReports = [];
                    state.errorMessage = errorMsg;
                }
            }
        ),

        deleteAuditLog: create.asyncThunk(
            async (id, thunkApi) => {
                // console.log("hello", id)
                const res = await axios.post(
                    `${userMsgPath}/deleteAuditLog/${id}`
                );
                return res.data;
            },
            {
                fulfilled: (state, action) => {
                    if (action.payload?.message) {
                        state.successMessage = action.payload.message;
                        state.errorMessage = "";
                        toast.success(action.payload.message);
                    } else {
                        state.successMessage = "";
                    }
                },
                rejected: (state, action) => {
                    const errorMsg = action.error?.message || "Error deleting user message";
                    state.errorMessage = errorMsg;
                    state.successMessage = "";
                    toast.error(errorMsg);
                }
            }
        ),

    })
});


export const { 

    changeUserMsgStatus,
    addUserMsg, deleteUserMsg, 
    getAllUserMsg, getSingleUserMsg,
    getAllAuditReports, deleteAuditLog

 } = userMsgSlice.actions;

export default userMsgSlice.reducer;