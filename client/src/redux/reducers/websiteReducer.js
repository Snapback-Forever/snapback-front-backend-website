import axios from "axios";
import { createWebsiteSlice } from "../creator.js";
import { toast } from "react-hot-toast";

const websitePath = "https://snapbackforever-website-api.onrender.com/web";

const initialState = {
    website: [],
    allWebsite: [],
    successMessage: "",
    errorMessage: "",
};

const websiteSlice = createWebsiteSlice({
    name: "website",
    initialState,
    reducers: (create) => ({

        // Add a website
        addWebsite: create.asyncThunk(
            async (state, thunkApi) => {
                const res = await axios.post(`${websitePath}/add`, state);
                return res.data;
            },
            {
                fulfilled: (state, action) => {
                    state.successMessage = action.payload.message || "";
                    state.errorMessage = "";
                    if (action.payload.message) toast.success(action.payload.message);
                },
                rejected: (state, action) => {
                    const errorMsg = action.error?.message || "Error creating website";
                    state.errorMessage = errorMsg;
                    state.successMessage = "";
                    toast.error(errorMsg);
                }
            }
        ),

        // Get all websites
        getAllWebsites: create.asyncThunk(
            async () => {
               
                const res = await axios.get(`${websitePath}/getWebsites`);
                return res.data;
            },
            {
                fulfilled: (state, action) => {
                    state.allWebsite = action.payload || [];
                    state.successMessage = "";
                    state.errorMessage = "";
                },
                rejected: (state, action) => {
                    state.errorMessage = action.error?.message || "Error retrieving websites";
                    state.successMessage = "";
                    toast.error(state.errorMessage);
                }
            }
        ),

        // Edit website
        editWebsite: create.asyncThunk(
            async ({ id, data }) => {
                // Pass {id, data} to this thunk
                const res = await axios.post(`${websitePath}/editWebsite/${id}`, data);
                return res.data;
            },
            {
                fulfilled: (state, action) => {
                    state.successMessage = action.payload.message || "";
                    state.errorMessage = "";
                    if (action.payload.message) toast.success(action.payload.message);
                },
                rejected: (state, action) => {
                    state.errorMessage = action.error?.message || "Error updating website";
                    state.successMessage = "";
                    toast.error(state.errorMessage);
                }
            }
        ),

        // Delete website
        deleteWebsite: create.asyncThunk(
            async (id, thunkApi) => {
                // console.log("ID", id)
                const res = await axios.post(`${websitePath}/deleteWebsite/${id}`);
                return res.data;
            },
            {
                fulfilled: (state, action) => {
                    state.successMessage = action.payload.message || "";
                    state.errorMessage = "";
                    if (action.payload.message) toast.success(action.payload.message);
                },
                rejected: (state, action) => {
                    state.errorMessage = action.error?.message || "Error deleting website";
                    state.successMessage = "";
                    toast.error(state.errorMessage);
                }
            }
        ),

    }),
});
export const {

    addWebsite,
    getAllWebsites,
    editWebsite,
    deleteWebsite,

} = websiteSlice.actions;

export default websiteSlice.reducer;