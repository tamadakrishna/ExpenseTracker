import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTransaction } from '../store/expenseSlice';
import { Icon } from '@iconify/react';


export default function List() {

  const Data = useSelector((state) => state.expense.history);
  
  let Transactions;
  
  if(Data.length===0){
    Transactions = <div>Fetching...</div>
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
        </div>
     )
}

