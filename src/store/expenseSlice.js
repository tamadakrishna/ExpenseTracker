import { createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

const URI = 'https://localhost:8088'

export const createTransaction = createAsyncThunk('createTransaction', async (data, {dispatch}) => {

    const response = await axios.post(`${URI}/create_Transaction`,data)

    return response.data;
  })


export const retrieveTransactions = createAsyncThunk('retrieveTransactions', async (data, {dispatch}) => {

  const response = await axios.get(`${URI}/get_Transactions`)
  
    return response.data;
  })

const initialState = {
    transaction: []
}

export const expenseSlice = createSlice({
    name:'expense',
    initialState,
    reducers:{
        getTransactions: (state)=>{

        }
    },
    extraReducers:(builder)=>{
      builder.addCase(createTransaction.fulfilled,(state,action)=>{
        console.log('Create Transaction success :', action.payload);
      })
      .addCase(retrieveTransactions.fulfilled,(state,action)=>{
        console.log('Retrieve Transactions success :', action.payload)
      })
    }
})

export const { getTransactions } = expenseSlice.actions;
export default expenseSlice.reducer;