import React from 'react'
import {useForm } from 'react-hook-form';
import List from './List';  
import { useSelector, useDispatch } from 'react-redux'
import { createTransaction, retrieveTransactions } from '../store/expenseSlice';

export default function Form() {



    const dispatch = useDispatch();
    const {register, handleSubmit, resetField} = useForm();

    
    const onSubmit = async(data) =>{
        if(!data) return {};

        dispatch(createTransaction(data))
        resetField('name');
        resetField('amount');
    }

  return (
    <div className="form max-w-sm mx-auto w-96">
        <h1 className='font-bold pb-4 text-xl'>Transaction</h1>
        <form id='form' onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
                <div className="input-group">
                    <input type="text" {...register('name') } placeholder='House Rent, Bills, Salary, Stocks, etc...' className='form-input' />
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
        </form>
        <List></List>
    </div>
  )
}
