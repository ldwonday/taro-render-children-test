import Taro from '@tarojs/taro';
import { model } from '@/utils/commonModel';
import { listDevice, overallSum, duration, overallTop } from './service';
import modelExtend from '@/utils/modelExtend';
import action from '@/utils/action';
import { DeviceListItem } from '../type';
import { IOverSum, IDuration, IOverTop } from './data.d';

export interface StateType {
  devices: DeviceListItem[];
  chartData: IDuration;
  overSum: IOverSum;
  overTop: IOverTop;
}

const Model = modelExtend<StateType>(model, {
  namespace: 'dataOverview',
  state: {
    devices: [],
    chartData: [],
    overSum: {},
    overTop: [],
  },
  effects: {
    *init({ payload }, { put, all }) {
      yield put.resolve(action('deviceList'))
      yield put(action('getData', payload))
    },
    *getData({ payload }, { put, all, call }) {
      Taro.showLoading({ mask: true, title: '加载中...' })
      try {
        const [topRes, sumRes, durationRes] = yield all([
          call(overallTop, payload),
          call(overallSum, payload),
          call(duration, payload),
        ]);
        yield put(
          action('save', {
            overTop: topRes.data || [],
            overSum: sumRes.data || {},
            chartData: durationRes.data || [],
          }),
        );
        Taro.hideLoading();
      } catch (e) {
        Taro.showToast({
          icon: 'none',
          title: '加载失败！',
        });
      }
    },
    *deviceList(_, { call, put }) {
      const filter = { current: 1, pageSize: 9999, status: 1 };
      const { data } = yield call(listDevice, filter);
      yield put(action('save', { devices: data.list || [] }));
    },
    *overallTop({ payload }, { call, put }) {
      const { data } = yield call(overallTop, payload);
      yield put(action('save', { overTop: data || [] }));
    },
    *overallSum({ payload }, { call, put }) {
      const { data } = yield call(overallSum, payload);
      yield put(action('save', { overSum: data || {} }));
    },
    *duration({ payload }, { call, put }) {
      const { data } = yield call(duration, payload);
      yield put(action('save', { chartData: data || [] }));
    },
  },
});

export default Model;
