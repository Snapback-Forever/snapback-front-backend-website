import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit"

export const createAuthSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator }
})

export const createUserMsgSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator }
})

export const createWebsiteSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator }
})