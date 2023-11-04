import React from 'react'
import {useForm } from 'react-hook-form';
import List from './List';  
import { useDispatch, useSelector } from 'react-redux'
import { createTransaction, setStatus } from '../store/expenseSlice';
import toast, { Toaster } from 'react-hot-toast';

export default function Form() {

    const dispatch = useDispatch();
    const status = useSelector((state) => state.expense.status);

    const notify = (status) => {
        if(status==='success')
        toast.success('Saved Successfully');
        else if(status==='failure')
        toast.error('Saving failed')
    }

    if(status==='created')
    {
        notify('success');
        dispatch(setStatus(''))
    }
    else if(status==='creation_fail')
    {
        notify('failure');
        dispatch(setStatus(''))
    }

    const {register, handleSubmit, resetField} = useForm();

    const onSubmit = async(data) =>{
        if(!data) return {};

        if(data.name!==undefined && data.amount!==undefined)
        {
        dispatch(createTransaction(data))
        resetField('name');
        resetField('amount');
        }

    }

  return (
    <div className="form max-w-sm mx-auto w-96">
        <h1 className='font-bold pb-4 text-xl'>Transaction</h1>
        <form id='form' onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
                <div className="input-group">
                    <input type="text" {...register('name') } autoComplete='false' placeholder='House Rent, Bills, Salary, Stocks, etc...' className='form-input' />
                </div>
                <select className='form-input' {...register('type') } >
                    <option value="Investment" default>Investment</option>
                    <option value="Expense">Expense</option>
                    <option value="Savings">Savings</option>
                </select>
                <div className="input-group" >
                    <input type="text" {...register('amount') } placeholder='Amount' className='form-input' />
                </div>
                <div className="submit-btn">
                    <button className='border py-2 text-white  bg-red-800 w-full'>Make Transaction</button>
                </div>
            </div>
              <Toaster
                position="top-right"
                reverseOrder={false}
                />
        </form>
        <List></List>
    </div>
  )
}
