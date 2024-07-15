import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { getLeadStages } from '../../utils/Endpoint';


const Leadstages = ({date}) => {
    const axios = useAxiosPrivate();

    const [data, setData] = useState([]);

    const getData = async () => {
        await axios.get(`${getLeadStages}?date=${date}`)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getData()
    }, [date])

    const colorMap = {
        'Untouched': 'rgb(255, 255, 0)',
        'Converted': 'rgb(0, 128, 0)',
        'Hot': 'rgb(255, 123, 0)',
        'Warm': 'rgb(255, 165, 0)',
        'Not Interested': 'rgb(255, 0, 0)',
        'Visa Approved': 'rgb(255, 0, 0)',
        'Not Contactable': 'rgb(255, 0, 0)',
    }

    return (
        <ResponsiveContainer width="100%" height={400} >
            <BarChart
                data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <XAxis
                    dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count"
                    fill={'rgb(33 150 243 / 1)'}
                    stackId="a" name="Leads" >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colorMap[entry._id]} />
                    ))}
                </Bar>

            </BarChart>

        </ResponsiveContainer>
    )
}

export default Leadstages




