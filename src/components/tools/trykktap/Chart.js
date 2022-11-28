import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  Area,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';


export default function Charts(props) {

const data = props.pressureDropMatrix 





    return (
      <ResponsiveContainer width="100%" height="100%" >
        <LineChart margin={{ right:15, bottom: 15 }} width={500} height={300} data={data} >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis type="number"  dataKey="strøm" padding={{ right: 0 }} >
          <Label value="Strøm per brønn [l/s]" offset={-10} position="insideBottom" /> </XAxis>

          <YAxis padding={{  top: 0 }} >
            <Label  angle={270} value="Trykkfall [kPa]" offset={10}  position="insideLeft" /> </YAxis>
          <Tooltip />
          
            <Legend verticalAlign="top" height={36}  />  

            
          
          <ReferenceLine x={props.minBrine} stroke="#912f4f" strokeWidth={4} >
          <Label value="Min brine" position="insideTopRight" /> 
          </ReferenceLine>
          
          <ReferenceLine x={props.nomBrine} stroke="#5ca17e" strokeWidth={4} >
          <Label value="Nominel brine" position="insideTopLeft" /> 
          </ReferenceLine>
          
          <Line type="monotone" unit="kPa"  dot={false} dataKey="totalPressureDrop" name='Trykkfall' stroke="#9087e8" activeDot={{ r: 8 }} strokeWidth={4} />
          <Line type="monotone"   unit="kPa" dot={false} dataKey="head" name='Head fra pump' stroke="#2e8281" activeDot={{ r: 8 }} strokeWidth={4} />
         
         
        </LineChart>
      </ResponsiveContainer>
    );
  }

