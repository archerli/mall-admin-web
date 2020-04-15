import React from 'react';
import { Pagination, Table } from 'antd';
import styles from '@/pages/admin/carousel/components/list.css';

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  totalElement,
  onRelationImage,
  ...listOpts
}) => {

  const columns = [{
    title:"图片",
    dataIndex: "id",
    render:(text, record)=> {
      return (
        <a href={record.headImgUrl} target="_blank" rel="noopener noreferrer"><img src={record.headImgUrl} alt={record.nickname} className={styles.avatarImg}/></a>
      );
    }
  }, {
    title: '昵称',
    dataIndex: 'nickname',
    render:(text, record) => {
      const status = record.status;
      return (
        <div>
          <p>{record.nickname}</p>
          <p>{status==='1'?<b className="blue">关注</b>:<b className="red">取消关注</b>}</p>
        </div>
      )
    }
  }, {
    title: 'id',
    render: (record)=> {
      return (
        <div>
          <p>oid:{record.openid}</p>
          <p>uid:{record.unionid}</p>
        </div>
      )
    }
  }, {
    title: "日期",
    render: (record)=> {
      return (
        <div>
          <p>初次关注：{record.firstFollowTime}</p>
          <p>最近关注：{record.followTime}</p>
        </div>
      )
    }
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <div>
          -
        </div>
      );
    }
  }];

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const pager = () => {
    return (
      <Pagination showQuickJumper defaultPageSize={15} total={totalElement} onChange={handlePageChange}/>
    );
  };

  return (
    <Table {...listOpts} columns={columns} rowKey="id" pagination={false} footer={pager}/>
  );
};

export default List;
