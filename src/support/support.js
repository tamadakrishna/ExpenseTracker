export function GetData(data)
{
    let D ={};
    let A = {};
    let Total=0;
    for(let i=0;i<data.length;i++)
    {
        if(!D.hasOwnProperty(data[i].type))
        D[data[i].type]= data[i].amount;
        else
        D[data[i].type] = D[data[i].type] + data[i].amount;
    }
   
    for(let V in D)
    {
        Total = Total + D[V];
        A[V] = D[V];
    }

    for(let V in D)
    {
        D[V] = parseFloat(((D[V]/Total)*100)).toFixed(2);
    }

    let Collection = [];
    let index=0;
    for(let V in D)
    {
        Collection[index] = Object.create({});
        for(let i=0;i<data.length;i++)
        {
            if(V===data[i].type)
            {
                Object.defineProperties(Collection[index],{
                    id:{value:data[i]._id},
                    type:{value: data[i].type},
                    color:{value: data[i].color},
                    amount:{value: A[V]},
                    percent:{value: D[V]},
                });
                index=index+1;
                break;
            }
        }
    }
    Collection["Total"]=Total;
    return Collection;
}

