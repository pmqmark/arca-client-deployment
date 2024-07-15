import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    leadSources: [],
    offices: [],
}

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setLeadSourceData: (state, action) => {
            state.leadSources = action.payload
        },
        setOfficeDatas: (state, action)=>{
            state.offices = action.payload
        }
    }
});


export const {setLeadSourceData, setOfficeDatas} = dataSlice.actions;
export default dataSlice.reducer;