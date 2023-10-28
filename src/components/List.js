import React from 'react';
import 'boxicons';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTransaction } from '../store/expenseSlice';


export default function List() {



  const Data = useSelector((state) => state.expense.history);


  let Transactions;
  
//   console.log(data);
  // if(isFetching){
  //   Transactions = <div>Fetching</div>
  // }
  // else if(isSuccess){
    Transactions = Data.map((v,i) => <Transaction key={i} category={v} ></Transaction>);
  // }
  // else if(isError){
  //   Transactions = <div>Error</div>;
  // }

 

  return (
    <div className="flex flex-col py-6 gap-3">
        <h1 className='py-4 font-bold text-xl'>History</h1>
        {Transactions}
    </div>
  )
}

function Transaction({category}){

  const dispatch = useDispatch();

  const handleClick = (e,id)=>{
    if(!id) return 0;

    console.log('ID :',id)
    dispatch(deleteTransaction({id}))

    e.preventDefault();
  }
     if(!category) return null;
     return(
        <div className="item flex justify-center bg-gray-50 py-2 rounded-r" style={{borderRight: `8px solid ${category.color ?? "#e5e5e5"}`}}>
            <button className='px-3' onClick={(e)=>handleClick(e,category.id)}><box-icon data-id={category.id ?? ''} color={`rgb(${category.color})` ?? "#e5e5e5"} size="15px" name='trash' ></box-icon></button>
            <span className='block w-full'>{ category.name ?? ''}</span>
        </div>
     )
}
