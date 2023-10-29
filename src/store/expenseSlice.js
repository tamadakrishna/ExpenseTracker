import { createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
import { getExpenseData } from '../support/support';

const URI = 'https://localhost:8088';

export const createTransaction = createAsyncThunk('createTransaction', async (data, {dispatch}) => {

    const response = await axios.post(`${URI}/create_Transaction`,data)

    dispatch(retrieveTransactions());

    return response.data;
  })


export const retrieveTransactions = createAsyncThunk('retrieveTransactions', async (data, {dispatch}) => {

  const response = await axios.get(`${URI}/get_Transactions`)
  
    return response.data;
  })


export const deleteTransaction = createAsyncThunk('deleteTransaction', async (data, {dispatch}) => {

    const response = await axios.post(`${URI}/delete_Transaction`,data)

    dispatch(retrieveTransactions());

    return response.data;
  })

const initialState = {
    graph_data:[],
    history:[],
    percentages:[],
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
        // console.log('Create Transaction success :', action.payload);
      })
      .addCase(retrieveTransactions.fulfilled,(state,action)=>{
        const ExpenseData = getExpenseData(action.payload);
        state.graph_data = ExpenseData.aggregate;
        state.percentages = ExpenseData.percentages;
        state.history = ExpenseData.history;
      })
      .addCase(deleteTransaction.fulfilled,(state,action)=>{
        // console.log('Delete Successfully');
      })
    }
})

export const { getTransactions } = expenseSlice.actions;
export default expenseSlice.reducer;