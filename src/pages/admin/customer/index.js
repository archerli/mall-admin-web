import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router';

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import List from './components/List';
import Filter from './components/Filter';

const Customer = ({
  customer,
  location,
  dispatch,
  loading
}) => {
  const { query, pathname } = location;

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      query: {
        ...query,
        ...newQuery,
      },
    }));
  };

  /*const operatorOpts = {
    onAdd() {
      dispatch({ type: 'customer/modifyState', payload: {addVisible: true}});
    }
  };*/

  const listOpts = {
    dataSource: customer.datas,
    loading: loading.models.customer,
    location,
    totalElement: customer.totalElements,
    onDelConfirm: (record) => {
      dispatch({ type: 'customer/deleteObj', payload: {id: record.id} }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (record) => {
        dispatch({ type: 'customer/modifyState', payload: {item: record, updateVisible: true} });
    },
  };

  const addOpts = {
    visible: customer.addVisible,
    title: "添加数据",
    maskClosable: false,
    confirmLoading: loading.effects['customer/addObj'],
    onOk: (obj) => {
      dispatch({ type: 'customer/modifyState', payload: { addVisible: false } });
      dispatch({ type: 'customer/addObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'customer/modifyState', payload: { addVisible: false } });
    }
  };
  const updateOpts = {
    visible: customer.updateVisible,
    title: `修改数据[${customer.item.name}]`,
    item: customer.item,
    maskClosable: false,
    confirmLoading: loading.effects['customer/updateObj'],
    onOk: (obj) => {
      dispatch({ type: 'customer/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'customer/updateObj', payload: obj }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'customer/modifyState', payload: { updateVisible: false } });
    }
  };

  const filterOpts = {
    onFilter(values) {
      handleRefresh({conditions: JSON.stringify(values)});
    }
  };

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 客户管理<b>（{customer.totalElements}）</b></h3>
        {/*<Operator {...operatorOpts}/>*/}
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {customer.addVisible && <AddModal {...addOpts}/>}
      {customer.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ customer, loading }) => ({ customer, loading }))(Customer);