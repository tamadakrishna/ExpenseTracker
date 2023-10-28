
const Add_Color = (data) =>{

    let orange ='255, 205, 86'; // Investment
    let blue = '54, 208, 245';  // Expense
    let pink = '255, 177, 193';  // Savings

    const DATA = data.map((info)=>{
        let temp_color = '';
        if(info.type==="Investment")
        {
        temp_color = orange;
        }
        else if(info.type==="Expense")
        {
            temp_color = blue;
        }
        else if(info.type==="Savings")
        {
            temp_color = pink;
        }
        return {
            id:info._id,
            name:info.name,
            type:info.type,
            amount:info.amount,
            color: temp_color
        }
    })

    return DATA;
}

const Aggregate_Amount = (data) =>{

    const Aggregate = [
        {
            type:"Investment",
            amount:0,
            color:''
        },
        {
            type:"Expense",
            amount:0,
            color:''
        },
        {
            type:"Savings",
            amount:0,
            color:''
        },
    ];

    for(let i=0;i<Aggregate.length;i++)
    {
        for(let j=0;j<data.length;j++)
        {
            if(Aggregate[i].type===data[j].type)
            {
                Aggregate[i].amount += data[j].amount;
                Aggregate[i].color = data[j].color; 
            }

        }
    }

    return Aggregate;
}

const History = (data) =>{

    const history = data.map((info)=>{
        return {
            id:info.id,
            name:info.name,
            color:info.color,
        }
    });

    return history;
}

const Percentage = (data)=>{

    let Total = 0;
    for(let i=0;i<data.length;i++)
    {
        Total += data[i].amount;
    }

    for(let i=0;i<data.length;i++)
    {
        const percentage = parseFloat((data[i].amount/Total)*100).toFixed(2)
        data[i]["Percentage"] = percentage;
        data[i]["Total"] = Total;
    }

    return data;
}

export const getExpenseData = (data) =>{

    const ExpenseData = Add_Color(data)

    const history = History(ExpenseData)

    const aggregate = Aggregate_Amount(ExpenseData)

    const percentages = Percentage(aggregate)

    return {ExpenseData,history,aggregate,percentages}
}