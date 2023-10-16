import { Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import graphsBg from '../../assets/branding/graphsBg.svg';
import graphsBgFull from '../../assets/branding/graphsBgFull.svg';
import { setShowFullMode } from '../../features/insights/insightsSlice';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  // Title,
  Tooltip,
  Filler
} from 'chart.js';
import { Line, Bar, Pie, Scatter } from 'react-chartjs-2';
import GraphContainer from './GraphContainer';
import { graphs } from '../../app/constants/graphs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  PointElement,
  // Title,
  Tooltip,
  Filler
  // Legend
);

const options = {
  responsive: true,
  plugins: {
    // legend: {
    //   position: 'top' as const
    // },
    // title: {
    //   display: true,
    //   text: 'Chart.js Line Chart'
    // }
  }
};
export const data1 = {
  labels: ['0', '1', '2', '3', '4'],
  datasets: [
    {
      fill: true,
      data: [300, 450, 500, 680, 100],
      backgroundColor: 'rgba(10, 171, 106, 0.9)'
    },
    {
      fill: true,
      data: [550, 850, 750, 250, 400],
      backgroundColor: 'rgba(173, 219, 233, 0.9)'
    }
  ]
};

export const data2 = {
  labels: ['1', '2', '3', '4', '5'],
  datasets: [
    {
      label: '1',
      data: [80, 95, 100, 95, 80],
      backgroundColor: ['#A74343', '#F69F9F', '#ED7C7C', '#3D2727', '#AD4B4B']
    }
  ]
};

export const data3 = {
  datasets: [
    {
      data: [661, 922, 74, 420, 388, 564, 493, 687, 775],
      backgroundColor: ['#F8B30E'],
      borderColor: ['#ffffff'],
      borderWidth: 2
    }
  ]
};

export const data4 = {
  labels: ['0', '1', '2', '3', '4', '5'],
  datasets: [
    {
      label: '1',
      data: [12, 45, 50, 50, 49, 100],
      backgroundColor: '#9851A4'
    },
    {
      label: '1',
      data: [30, 20, 40, 10, 0, 25],
      backgroundColor: '#7377A8'
    }
  ]
};

export const options5 = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};
export const data5 = {
  datasets: [
    {
      label: 'A',
      data: Array.from({ length: 9 }, () => ({
        x: Math.random() * (100 - 0) + 0,
        y: Math.random() * (100 - 0) + 0
      })),
      backgroundColor: '#FB7833'
    },
    {
      label: 'B',
      data: Array.from({ length: 9 }, () => ({
        x: Math.random() * (100 - 0) + 0,
        y: Math.random() * (100 - 0) + 0
      })),
      backgroundColor: '#5DD1D5'
    }
  ]
};

export const data6 = {
  labels: ['0', '1', '2', '3', '4'],
  datasets: [
    {
      label: '1',
      data: [100, 85, 35, 60, 25],
      backgroundColor: '#A6CEE3',
      tension: 0.5
    }
  ]
};

export default function GraphsWrapper() {
  const dispatch = useAppDispatch();

  const { isShowFullMode, showedGraph, isUpdatePosition } = useAppSelector((state) => state.insights);

  const renderGraph = (id: string) => {
    switch (id) {
      case graphs.PIE_CHART:
        return (
          <GraphContainer title="Title" isPieChart={true} id={graphs.PIE_CHART}>
            <Pie data={data3} />
          </GraphContainer>
        );
      case graphs.LINE_GRAPH:
        return (
          <GraphContainer title="Title" id={graphs.LINE_GRAPH}>
            <Line options={options} data={data1} />
          </GraphContainer>
        );
      case graphs.BAR_CHART:
        return (
          <GraphContainer title="Title" id={graphs.BAR_CHART}>
            <Bar options={options} data={data2} />
          </GraphContainer>
        );
      case graphs.HISTOGRAM:
        return (
          <GraphContainer title="Title" id={graphs.HISTOGRAM}>
            <Line options={options} data={data4} />
          </GraphContainer>
        );
      case graphs.SCATTER_PLOT:
        return (
          <GraphContainer title="Title" id={graphs.SCATTER_PLOT}>
            <Scatter options={options5} data={data5} />
          </GraphContainer>
        );
      case graphs.ADDITIONAL:
        return (
          <GraphContainer title="Title" id={graphs.ADDITIONAL}>
            <Line options={options} data={data6} />
          </GraphContainer>
        );
    }
  };

  const renderBackground = () => {
    if (isUpdatePosition) {
      if (isShowFullMode) {
        return graphsBgFull;
      } else {
        return graphsBg;
      }
    }
    return '';
  };

  return (
    <div
      style={{
        minWidth: isShowFullMode ? '752px' : '390px',
        transition: '0.2s',
        backgroundImage: `url(${renderBackground()})`
      }}
      className="relative"
    >
      <div
        className="absolute top-10 cursor-pointer"
        style={{ left: isShowFullMode ? '-9px' : '-9px' }}
        onClick={() => dispatch(setShowFullMode(!isShowFullMode))}
      >
        {'<|>'}
      </div>
      <section style={{ minHeight: '0', maxHeight: '89vh' }} className="w-full h-full px-4 pb-0 overflow-auto">
        {showedGraph ? <Fragment>{renderGraph(showedGraph)}</Fragment> : null}
      </section>
    </div>
  );
}
