import Streamedian from '../Streamedian';
import { VehiclePieChart } from './VehiclePieChart';
import { ProcessPieChart } from './ProcessPieChart';
import { TableChart } from './TableChart';
import { useState, useEffect } from 'react';
import DataFilter from './dataFilter';

export const Main = () => {
  const [data, setData] = useState();
  const [tableList, setTableList] = useState([]);

  async function request() {
    try {
      const res = await fetch('http://192.168.0.136:8000');
      const result = await res.json();
      if (result.message === 'Not_Detected') {
        throw Error('Not_Detected');
      } else {
        setData(result.message[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // request();
    setData(DATA[0]);

    const timer = setInterval(() => {
      // request();
      setData(DATA[0]);
    }, 1000 * 10);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (data && data !== 'Not_Detected') {
      let newClass = new DataFilter(data);
      newClass.setCountByType();
      newClass.setCountByState();
      newClass.setTypeByState();
      setTableList(current => {
        const newCurrent = [...current];
        newCurrent.length >= 10 && newCurrent.pop();
        newCurrent.unshift(newClass);
        return newCurrent;
      });
    }
  }, [data]);

  return (
    <section className="flex justify-center items-start max-full w-full px-10 pt-3 gap-5">
      <div className=" flex justify-center items-start flex-col w-2/3 h-fit gap-12">
        <div className="w-full">
          <h1 className="text-2xl font-bold">상태별 중장비</h1>
          <VehiclePieChart data={tableList[0]} />
        </div>
        <div className="w-full">
          <h1 className="text-2xl font-bold">구역별 공정률</h1>
          <ProcessPieChart data={tableList[0]} />
        </div>
      </div>

      <div className="flex justify-center items-start flex-col w-1/3 h-fit gap-12">
        <div className="w-full">
          <h1 className="text-2xl font-bold">CCTV</h1>
          <div className="mt-5">
            <Streamedian id="test" url="rtsp://192.168.0.102/stream1" />
          </div>
        </div>
        <div className="w-full">
          <h1 className="text-2xl font-bold">시간별 중장비 상태</h1>
          <div className="mt-5">
            <TableChart data={tableList} />
          </div>
        </div>
      </div>
    </section>
  );
};

const DATA = [
  {
    datetime: '2022-08-19T19:23:24',
    type: [
      {
        detection_info: 'backhoe',
        state: 'unload',
      },
      {
        detection_info: 'wheel_loader',
        state: 'unload',
      },
      {
        detection_info: 'backhoe',
        state: 'load',
      },
      {
        detection_info: 'excavators',
        state: 'unload',
      },
      {
        detection_info: 'excavators',
        state: 'idle',
      },
      {
        detection_info: 'excavators',
        state: 'idle',
      },
      {
        detection_info: 'excavators',
        state: 'idle',
      },
      {
        detection_info: 'excavators',
        state: 'idle',
      },
    ],
  },
];
