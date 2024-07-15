import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { getEmpLeadsnApps } from '../../utils/Endpoint';


const WorkLeadChart = ({date}) => {
    const axios = useAxiosPrivate();

    const [data,setData] = useState([]);

    const getData = async()=>{
        await axios.get(`${getEmpLeadsnApps}?date=${date}`)
        .then((res)=>{
            setData(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getData()
    },[date])

    return (
        <ResponsiveContainer width="100%" height={400} >
        <BarChart 
        data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <XAxis 
            dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="leadCount" fill="rgb(33 150 243 / 1)" stackId="a" name="Leads" />
            <Bar dataKey="workCount" fill="rgb(255 235 59 / 1)" stackId="b" name="Applications" />
        </BarChart>

        </ResponsiveContainer>
    )
}

export default WorkLeadChart




