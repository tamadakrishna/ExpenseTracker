import React from 'react'
import { useSelector } from 'react-redux';

export default function Labels() {

  const Data = useSelector((state) => state.expense.percentages);

  let Transactions;
  if(Data.length===0){
    Transactions = <div>Fetching...</div>
  }
  else
  {
    Transactions = Data.map((C,i) => <LabelComponent key={i} data={C}></LabelComponent>);
  }

   return (
    <>
    {Transactions}
    </>
  )
}

function LabelComponent({data}){
    if(!data) return <></>;
    return(
    <div className="labels flex justify-between">
        <div className="flex gap-2">
            <div className='w-2 h-2 rounded py-3' style={{background:`rgb(${data.color})` ?? '#f9c74f'}}></div>
            <h3 className='text-md'> {data.type ?? ""}</h3>
        </div>
        <h3 className='font-bold'>{data.Percentage ?? 0}%</h3>
    </div>
    )
}