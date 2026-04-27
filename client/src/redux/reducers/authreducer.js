import axios from "axios"
import { createAuthSlice } from "../creator.js"
import { toast } from "react-hot-toast";

const authBaseURL = "http://127.0.0.1:8080/auth"


const initialState = {

    user: {},
    allUsers: [],
    singleUser: {},

    withCredentials: false,
    isAuth: false,
    isLogin: false,

    successMessage: "",
    errorMessage: "",

    token: "",

}

const authSlice = createAuthSlice({
    name: "user",
    initialState,


    reducers: (create) => ({

        setToken: (state, action) => {
     
            state.token = action.payload
        },

        resetAuthErrorMessage: (state, action) => {
            state.errorMessage = ""
        },

        resetAuthSuccessMessage: (state, action) => {
            state.successMessage = ""
        },

        register: create.asyncThunk(
            async (state, thunkApi) => {
                try {
                    const res = await axios.post(`${authBaseURL}/register/user`, state);
                    return res.data; // Success: user object or success message
                } catch (error) {
                    // error.response.data.message comes from your backend
                    return thunkApi.rejectWithValue(error.response.data.message);
                }
            },
            {
                fulfilled: (state, action) => {
                    // This only runs on fulfilled (200/201 status)
                    if (action.payload.message) {
                        state.successMessage = action.payload.message;
                        state.errorMessage = "";
                        toast.success(action.payload.message);
                    } else {
                        state.user = { ...state.user, ...action.payload };
                        state.isAuth = false;
                        state.isLogin = false;
                        state.token = action.payload.token;
                        state.successMessage = "";
                        state.errorMessage = "";
                    }
                },
                rejected: (state, action) => {
                    // This runs on rejection (non-200/201 status)
                    state.errorMessage = action.payload;
                    state.successMessage = "";
                    toast.error(action.payload);
                }
            }
        ),

        login: create.asyncThunk(
            async (state, thunkApi) => {
                const res = await axios.post(`${authBaseURL}/login/User`, state);
                return res.data;
            },
            {
                fulfilled: (state, action) => {
                    if (action.payload.error) {
                        state.errorMessage = action.payload.error;
                        state.successMessage = "";
                        state.isAuth = false;
                        toast.error(action.payload.error);
                    } else if (action.payload.token && action.payload.data) {
                        state.user = { ...state.user, ...action.payload.data };
                        state.withCredentials = true;
                        state.isAuth = true;
                        state.isLogin = true;
                        state.token = action.payload.token;
                        state.successMessage = "Login successful!";
                        state.errorMessage = "";
                        toast.success("Login successful!");
                    } else {
                        // Optionally handle unexpected responses
                        state.errorMessage = "Unexpected response.";
                        state.successMessage = "";
                        state.isAuth = false;
                        toast.error("Unexpected response.");
                    }
                },
                rejected: (state, action) => {
                    const errorMsg = action.error?.message || "Login failed";
                    state.errorMessage = errorMsg;
                    state.successMessage = "";
                    state.isAuth = false;
                    toast.error(errorMsg);
                }
            }
        ),

        changePassword: create.asyncThunk(
            async (payload, thunkApi) => {
                // The payload should include userId, password, passwordNew, password2
                try {
                    const res = await axios.post(
                        `${authBaseURL}/changePassword/${payload.userId}/user`,
                        {
                            password: payload.password,
                            passwordNew: payload.passwordNew,
                            password2: payload.password2
                        }
                    );
                    return res.data;
                } catch (error) {
                    return thunkApi.rejectWithValue(
                        error.response?.data?.error || error.response?.data?.message || "Password change failed"
                    );
                }
            },
            {
                fulfilled: (state, action) => {
                    // Only consider it success if the message is the expected success message
                    if (action.payload.message === "✅ Password changed successfully!") {
                        state.successMessage = action.payload.message;
                        state.errorMessage = "";
                        toast.success(action.payload.message);
                    } else {
                        state.successMessage = "";
                        state.errorMessage = action.payload.message;
                        toast.error(action.payload.message);
                    }
                },
                rejected: (state, action) => {
                    const errorMsg = action.payload || action.error?.message || "Password change failed";
                    state.errorMessage = errorMsg;
                    state.successMessage = "";
                    toast.error(errorMsg);
                }
            }
        ),

          adminChangePassword: create.asyncThunk(
            async ({ userId, adminId, passwordNew, password2 }, thunkApi) => {
                try {
                    const res = await axios.post(
                        `${authBaseURL}/adminChangePassword/${adminId}/${userId}/user`,
                        { passwordNew, password2 }
                    );
                    return res.data;
                } catch (error) {
                    return thunkApi.rejectWithValue(error.response?.data?.error || error.message);
                }
            },
            {
                fulfilled: (state, action) => {
                    if (action.payload?.error) {
                        state.errorMessage = action.payload.error;
                        state.successMessage = "";
                        toast.error(action.payload.error);
                    }
                    else if (action.payload?.message) {
                        state.successMessage = action.payload.message;
                        state.errorMessage = "";
                        toast.success(action.payload.message);
                    }
                    else {
                        // In case user data is returned
                        state.user = { ...state.user, ...action.payload };
                        state.successMessage = "";
                        state.errorMessage = "";
                    }
                },
                rejected: (state, action) => {
                    const errorMsg = action.payload || action.error?.message || "Password change failed";
                    state.errorMessage = errorMsg;
                    state.successMessage = "";
                    toast.error(errorMsg);
                }
            }
        ),


        deleteUser: create.asyncThunk(
            async (userId, thunkApi) => {
                const res = await axios.post(`${authBaseURL}/deleteUser/${userId}/delete`);
                return res.data;
            },
            {
                fulfilled: (state, action) => {
                    if (action.payload?.error) {
                        state.errorMessage = action.payload.error;
                        state.successMessage = "";
                        toast.error(action.payload.error);
                    }
                    else if (action.payload?.message) {
                        state.successMessage = action.payload.message;
                        state.errorMessage = "";
                        toast.success(action.payload.message);
                        // Optional: Clear user info on delete
                        state.user = {};
                        state.token = "";
                        state.isAuth = false;
                        state.isLogin = false;
                    }
                    else {
                        state.successMessage = "";
                        state.errorMessage = "";
                    }
                },
                rejected: (state, action) => {
                    const errorMsg = action.error?.message || "User deletion failed";
                    state.errorMessage = errorMsg;
                    state.successMessage = "";
                    toast.error(errorMsg);
                }
            }
        ),

        logout: create.reducer((state) => {

            state.user = {}
            state.isAuth = false
            state.isLogin = false
            state.withCredentials = false
            state.token = ""
            state.errorMessage = "";
            state.successMessage = "";

        }),

        editUser: create.asyncThunk(
            async (payload, thunkApi) => {
                const res = await axios.post(`${authBaseURL}/editProfile/${payload.id}/user`, payload.state);
                return res.data;
            },
            {
                fulfilled: (state, action) => {
                    if (action.payload?.message && action.payload.user) {
                        // Success
                        state.user = action.payload.user;
                        state.successMessage = action.payload.message;
                        state.errorMessage = "";
                        toast.success(action.payload.message);
                    } else if (action.payload?.message) {
                        // Error
                        state.errorMessage = action.payload.message;
                        state.successMessage = "";
                        toast.error(action.payload.message);
                    } else {
                        state.successMessage = "";
                        state.errorMessage = "";

                    }
                },
                rejected: (state, action) => {
                    const errorMsg = action.error?.message || "Profile edit failed";
                    state.errorMessage = errorMsg;
                    state.successMessage = "";
                    toast.error(errorMsg);
                }
            }
        ),

        getAllUsers: create.asyncThunk(
            async (thunkApi) => {
                const res = await axios.get(authBaseURL + "/getAllUsers/user");
                return res.data;
            },
            {
                fulfilled: (state, action) => {
                    if (action.payload.message) {
                        {
                            state.message = action.payload.message;
                        }
                    } else {
                        state.allUsers = action.payload
                    }
                },
            }
        ),

        getSingleUser: create.asyncThunk(
            async (_id, thunkApi) => {
           
                const res = await axios.get(`${authBaseURL}/getSingleUser/${_id}/user`);
                return res.data;
            }, {
            fulfilled: (state, action) => {
             
                state.user = action.payload
            },
        }
        ),

        


    })
})

export const {

   register, login, logout, 
   getAllUsers, getSingleUser,
   editUser, deleteUser,
   adminChangePassword, changePassword,


} = authSlice.actions

export default authSlice.reducer