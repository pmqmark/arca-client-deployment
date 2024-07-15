import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';


const BasicCalendar = ({value, onChange}) => {

//   const [value, onChange] = useState(new Date());


  return (
    <div className='w-fit rounded-lg h-full ml-10'>
      <Calendar className="w-96 h-full rounded-lg" 
      onChange={onChange} value={value} 
      />
    </div>
  );
}


export default BasicCalendar