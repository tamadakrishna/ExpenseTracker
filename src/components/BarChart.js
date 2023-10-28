import { Bar } from 'react-chartjs-2';
import {Chart, registerables} from 'chart.js'; 
import Labels from './Labels.js';
import { useSelector } from 'react-redux';

Chart.register(...registerables)

function BarFunction()
{

  const Data = useSelector((state) => state.expense.graph_data);

  const Bar_Data = Data?.map((info)=>{
    return info.amount;
  })

  const Bar_Labels = Data?.map((info)=>{
    return info.type;
  })

  const Bar_BorderColors = Data?.map((info)=>{
    return `rgb(${info.color})` ;
  });

  const Bar_BackgroundColors = Data?.map((info)=>{
    return  `rgba(${info.color}, 0.3)`;
  });

    let BarData={
        labels: Bar_Labels,
        datasets: [{
          label: `Total:${Data[0]?.Total}`,
          data: Bar_Data,
          backgroundColor: Bar_BackgroundColors,
          borderColor: Bar_BorderColors,
          borderWidth: 1
        }],
    }


    // if(isSuccess)
    // {
    //     let Data = GetData(data);
    //     amount = Data.map(item=>{
    //         return item.amount;
    //     })
    //     labels = Data.map(item=>{
    //         return item.type;
    //     })
    //     for(let l in labels)
    //     {
    //         if(labels[l]==="Investment")
    //         {
    //             BarData["datasets"][0].backgroundColor[l] = `rgba(${blue}, 0.3)`;
    //             BarData["datasets"][0].borderColor[l] = `rgb(${blue})`;
    //         }
    //         if(labels[l]==="Savings")
    //         {
    //             BarData["datasets"][0].backgroundColor[l] = `rgba(${pink}, 0.3)`;
    //             BarData["datasets"][0].borderColor[l] = `rgb(${pink})`;
    //         }
    //         if(labels[l]==="Expense")
    //         {
    //             BarData["datasets"][0].backgroundColor[l] = `rgba(${orange}, 0.3)`;
    //             BarData["datasets"][0].borderColor[l] = `rgb(${orange})`;
    //         }
    //     }
    //     BarData["labels"]=labels;
    //     BarData["datasets"][0].label = `Total: ₹ ${Data["Total"]}`;
    //     BarData["datasets"][0].data=amount;
    // }
    return BarData;
}


export function BarChart()
{
  let BarData = BarFunction();
    return(
        
        <div className="flex justify-content max-w-xs mx-auto">
        <div className="item">
            <div className="chart relative">
            <Bar data={BarData} height={300} width={400} />
            </div>

            <div className="flex flex-col py-10 gap-4">
                {/* Labels */}
                <Labels></Labels>
            </div>
        </div>
        </div>
    );
}

