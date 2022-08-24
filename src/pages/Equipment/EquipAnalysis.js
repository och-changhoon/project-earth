import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import EquipPieChart from './components/EquipPieChart';
import TruckBarChart from './components/TruckBarChart';
import EquipDate from './components/EquipDate';
import timeStore from '../../stores/timeStore';

const EquipAnalysis = observer(() => {
  const navigate = useNavigate();
  const [equipData, setEquipData] = useState([]);
  const [rateData, setRateData] = useState([]);
  const [truckData, setTruckData] = useState([]);

  const getEquipData = async () => {
    const queryString = `?select=${timeStore.equipTime}`;
    navigate(`/equipment/analysis${queryString}`);
    //'/data/equipData.json'
    // `http://192.168.0.136:8000/equipment/analysis${queryString}`
    const res = await fetch('/data/equipData.json').then(res => res.json());
    const equip = [res.results].map(data => {
      return {
        excavators: data.excavators_state,
        backhoe: data.backhoe_state,
        bulldozer: data.bulldozer_state,
        wheel_loader: data.wheel_loader_state,
      };
    });
    const rate = [res.results].map(data => {
      return {
        excavators: Math.floor(data.excavators_state.utilization_rate * 100),
        backhoe: Math.floor(data.backhoe_state.utilization_rate * 100),
        bulldozer: Math.floor(data.bulldozer_state.utilization_rate * 100),
        wheel_loader: Math.floor(
          data.wheel_loader_state.utilization_rate * 100
        ),
      };
    });
    const truckCount = [res.results].map(data => {
      return [
        {
          name: 'A구역',
          pv: data.truck_count.구역A,
        },
        {
          name: 'B구역',
          pv: data.truck_count.구역B,
        },
        {
          name: 'C구역',
          pv: data.truck_count.구역C,
        },
        {
          name: 'D구역',
          pv: data.truck_count.구역D,
        },
        {
          name: 'E구역',
          pv: data.truck_count.구역E,
        },
      ];
    });
    setEquipData(equip[0]);
    setRateData(rate[0]);
    setTruckData(truckCount[0]);
  };

  useEffect(() => {
    getEquipData();
  }, []);

  // console.log('equipData:', equipData);
  // console.log('rateData:', rateData);
  // console.log('truckData:', truckData);

  return (
    <div className="relative">
      <div className="absolute top-3 right-10 flex justify-center py-1.5 h-11 w-52 rounded-full bg-achromatic-btn_action_select text-achromatic-text_secondary">
        {TIME_DATA.map(({ id, time, name }) => {
          return (
            <button
              onClick={e => timeStore.onChangeTime(e)}
              className={
                timeStore.equipTime === name
                  ? 'text-achromatic-bg_paper bg-blue-blue90 rounded-full h-8 w-16 '
                  : 'h-8 w-16'
              }
              name={name}
              key={id}
            >
              {time}
            </button>
          );
        })}
      </div>

      <div className="pb-1 text-xl font-bold">작업 장비 가동률</div>
      <div className="text-base text-achromatic-text_secondary">
        중장비별 Idle, Travel, Load, Unload Time 비율과 작업 시간 대비 Not Idle
        Time 비율입니다.
      </div>
      <div className="text-base text-achromatic-text_secondary">
        <EquipDate time={timeStore.equipTime} />
      </div>
      <div className="flex justify-center mb-16 ">
        {EQUIPINFO_DATA.map(({ id, sort }) => {
          return (
            <div className="w-full h-full flex flex-col pr-2 pl-2" key={id}>
              <div className="flex justify-center align-middle relative text-2xl font-bold top-[131px]">
                {rateData[sort]}%
              </div>
              <div className="flex justify-center">
                <EquipPieChart key={id} equipData={equipData} sort={sort} />
              </div>
              <div className="flex pt-3 justify-center text-3xl font-bold">
                {sort}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pb-5 text-xl font-bold">운송 장비 가동률</div>
      <div className="w-full h-auto">
        <TruckBarChart truckData={truckData} />
      </div>
    </div>
  );
});

const EQUIPINFO_DATA = [
  { id: 1, sort: 'excavators', name: 'excavators' },
  { id: 2, sort: 'backhoe', name: 'backhoe' },
  { id: 3, sort: 'bulldozer', name: 'bulldozer' },
  { id: 4, sort: 'wheel_loader', name: 'wheel_loader' },
];

const TIME_DATA = [
  { id: 1, time: '일별', name: 'daily' },
  { id: 2, time: '주별', name: 'weekly' },
  { id: 3, time: '월별', name: 'monthly' },
];

export default EquipAnalysis;
