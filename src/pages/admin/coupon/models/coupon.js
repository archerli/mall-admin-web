import { message } from 'antd';
import { httpGet } from '@/utils/normalService';

const baseService = "couponService";
export default {
  state: {
    item:{},
    totalElements:0,
    datas:[],
    addVisible: false,
    updateVisible: false,
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
  },
  effects: {
    *list({ payload: query }, { call, put }) {
      query.apiCode = baseService+".list";
      const data = yield call(httpGet, query);
      //console.log(data);
      yield put({ type:'modifyState', payload: {totalElements: data.size, datas: data.datas} });
    },
    *addObj({payload: obj}, {call}) {
      obj.apiCode = baseService+".add";
      const data = yield call(httpGet, obj);
      if(data) {message.success("保存成功");}
    },
    *updateObj({payload: obj},{call}) {
      obj.apiCode = baseService+".update";
      const data = yield call(httpGet, obj);
      if(data) {message.success("保存成功");}
    },
    *deleteObj({payload: obj}, {call}) {
      obj.apiCode = baseService+".delete";
      const data = yield call(httpGet, obj);
      if(data) {message.info(data.message);}
    },

    *modifyRepeat({payload: obj}, {call}) {
      obj.apiCode = baseService+".updateRepeat";
      const data = yield call(httpGet, obj);
      if(data) {message.info(data.message);}
    },
    *modifyStatus({payload: obj}, {call}) {
      obj.apiCode = baseService+".updateStatus";
      const data = yield call(httpGet, obj);
      if(data) {message.info(data.message);}
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/coupon') {
          dispatch({ type: 'list', payload: location.query });
        }
      })
    }
  }
}
