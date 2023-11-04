import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTransaction, setStatus } from '../store/expenseSlice';
import { Icon } from '@iconify/react';
import toast, { Toaster } from 'react-hot-toast';


export default function List() {

  const Data = useSelector((state) => state.expense.history);
  
  let Transactions;
  
  if(Data.length===0){
    Transactions = <div>Fetching<span className='loader'></span></div>
  }
  else{
    Transactions = Data.map((v,i) => <Transaction key={i} category={v} ></Transaction>);
  }

  return (
    <div className="flex flex-col py-6 gap-3">
        <h1 className='py-4 font-bold text-xl'>History</h1>
        {Transactions}
    </div>
  )
}

function Transaction({category}){

  const dispatch = useDispatch();

  const status = useSelector((state) => state.expense.status);


  const notify = (status) => {
    if(status==='success')
    toast.success('Deleted Successfully');
    else if(status==='failure')
    toast.error('Deletion failed')
}

if(status==='deleted')
{
    notify('success');
    dispatch(setStatus(''))
}
else if(status==='deletion_fail')
{
    notify('failure');
    dispatch(setStatus(''))
}

  const handleClick = (id)=>{
    if(!id) return 0;

    dispatch(deleteTransaction({"_id":id}))

  }
     if(!category) return null;
     return(
        <div className="item flex justify-center bg-gray-50 py-2 rounded-r" style={{borderRight:`8px solid ${`rgb(${category.color}`}`}} >
            <button className='px-3' onClick={(e)=>handleClick(category.id)}>
              <Icon icon="mdi:delete" color={`rgb(${category.color})` ?? "#e5e5e5"} width="22" height="22" />
            </button>
            <span className='block w-full'>{ category.name ?? ''}</span>
            <Toaster
                position="top-right"
                reverseOrder={false}
                />
        </div>
     )
}

