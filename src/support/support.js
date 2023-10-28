
const Add_Color = (data) =>{

    let orange ='rgb(255, 205, 86)'; // Investment
    let blue = 'rgb(54, 208, 245)';  // Expense
    let pink = 'rgb(255, 177, 193';  // Savings

    
    console.log('Expense Data: ',data)

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

    console.log('Aggregate', Aggregate)
}

const History = (data) =>{
    const history = data.map((info)=>{
        return {
            id:info.id,
            name:info.name,
            color:info.color,
        }
    });

    console.log('History', history)

    return history;
}

const Percentage = (data)=>{

    
}

export const getExpenseData = (data) =>{

    const DATA = Add_Color(data)

    const Aggregate = Aggregate_Amount(DATA)

    History(DATA)
   
    return DATA;
}