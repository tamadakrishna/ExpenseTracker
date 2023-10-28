import { createSlice,createAsyncThunk} from '@reduxjs/toolkit'


export const createTransaction = createAsyncThunk('createTransaction', async () => {
    return 1
  })


export const retrieveTransactions = createAsyncThunk('retrieveTransactions', async () => {
    return 1
  })

const initialState = {
    categories: [],
    transaction: []
}

export const expenseSlice = createSlice({
    name:'expense',
    initialState,
    reducers:{
        getTransactions: (state)=>{

        }
    }
})

export const { getTransactions } = expenseSlice.actions;
export default expenseSlice.reducer;