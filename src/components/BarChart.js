import { Bar } from 'react-chartjs-2';
import {Chart, registerables} from 'chart.js'; 
import {default as api} from '../store/apiSlice';
import { GetData} from '../support/support';
import Labels from './Labels.js';
Chart.register(...registerables)

function BarFunction()
{

    const {data, isSuccess} = api.useGetLabelsQuery();
    let amount = [];
    let labels =  [];
    let blue = "54, 208, 245";
    let pink = "255, 177, 193";
    let orange ="255, 205, 86";
    let BarData={
        labels: [],
        datasets: [{
          label: 'Total:',
          data: [],
          backgroundColor: [
            `rgba(${blue}, 0.3)`,
            `rgba(${pink},0.3)`,
            `rgba(${orange},0.3)`
          ],
          borderColor: [
            `rgb(${blue})`, //Blue
            `rgb(${pink})`, //Pink
            `rgb(${orange})` //orange
          ],
          borderWidth: 1
        }],
    }


    if(isSuccess)
    {
        let Data = GetData(data);
        amount = Data.map(item=>{
            return item.amount;
        })
        labels = Data.map(item=>{
            return item.type;
        })
        for(let l in labels)
        {
            if(labels[l]==="Investment")
            {
                BarData["datasets"][0].backgroundColor[l] = `rgba(${blue}, 0.3)`;
                BarData["datasets"][0].borderColor[l] = `rgb(${blue})`;
            }
            if(labels[l]==="Savings")
            {
                BarData["datasets"][0].backgroundColor[l] = `rgba(${pink}, 0.3)`;
                BarData["datasets"][0].borderColor[l] = `rgb(${pink})`;
            }
            if(labels[l]==="Expense")
            {
                BarData["datasets"][0].backgroundColor[l] = `rgba(${orange}, 0.3)`;
                BarData["datasets"][0].borderColor[l] = `rgb(${orange})`;
            }
        }
        BarData["labels"]=labels;
        BarData["datasets"][0].label = `Total: ₹ ${Data["Total"]}`;
        BarData["datasets"][0].data=amount;
    }
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

