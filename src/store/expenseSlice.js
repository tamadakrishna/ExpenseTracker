import { createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
import { getExpenseData } from '../support/support';

const URI = 'http://localhost:8088';

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
    status:''
}

export const expenseSlice = createSlice({
    name:'expense',
    initialState,
    reducers:{
        setLoading: (state)=>{
          state.history = 'Loading'
          state.percentages = 'Loading'
        },
        setStatus:(state,action)=>{
          state.status = action.payload;
        }
    },
    extraReducers:(builder)=>{
      builder.addCase(createTransaction.pending,(state,action)=>{
        // console.log('Pending...')
        // setLoading()
      })
      .addCase(retrieveTransactions.pending,(state,action)=>{
        setLoading()
      })
      .addCase(deleteTransaction.pending,(state,action)=>{
        // console.log('Pending...')
      })
      .addCase(createTransaction.fulfilled,(state,action)=>{
        // console.log('Pending...')
        state.status = 'created';
      })
      .addCase(retrieveTransactions.fulfilled,(state,action)=>{
        const ExpenseData = getExpenseData(action.payload);
        state.graph_data = ExpenseData.aggregate;
        state.percentages = ExpenseData.percentages;
        state.history = ExpenseData.history;
      })
      .addCase(deleteTransaction.fulfilled,(state,action)=>{
        // console.log('Pending...')
      })
      .addCase(createTransaction.rejected,(state,action)=>{
        // console.log('Pending...')
        state.status = 'creation_fail';
      })
    }
})

export const { setLoading, setStatus } = expenseSlice.actions;
export default expenseSlice.reducer;