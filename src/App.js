import './App.css';
import Form from './components/Form';
import { BarChart } from './components/BarChart';
import { useDispatch } from 'react-redux';
import { retrieveTransactions } from './store/expenseSlice';
import { useEffect } from 'react';
function App() {

  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(retrieveTransactions())
  })

  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
      <h1 className="text-4xl py-8 mb-10 Head-Title bg-slate-800 text-white rounded">Expense Tracker</h1>
      {/* grid columns */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Chart */}
       <BarChart></BarChart>
        {/* Form */}
        <Form></Form>
      </div>
      </div>
    </div>
  );
}

export default App;
