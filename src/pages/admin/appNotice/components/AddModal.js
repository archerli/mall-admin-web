import React from 'react';
import { Form, Icon, Input, Modal, Radio, Switch } from 'antd';
import { formItemLayout_large } from '@/utils/common';

const FormItem = Form.Item;

@Form.create()
class AddModal extends React.Component {

  state = {
    openMode: ''
  };

  render() {
    const {
      onOk,
      form: {
        getFieldDecorator,
        validateFieldsAndScroll,
      },
      ...modalProps
    } = this.props;

    const handleOk = (e) => {
      e.preventDefault();

      validateFieldsAndScroll((errors, values) => {
        values.status = values.status?"1":"0";
        // console.log(values);
        if(!errors) {
          onOk(values);
        }
      });
    };

    const modalOpts = {
      ...modalProps,
      onOk: handleOk
    };

    const onRadioChange = (e) => {
      const val = e.target.value;
      this.setState({openMode: val});
    };

    const openMode = this.state.openMode;

    return(
      <Modal {...modalOpts} style={{"minWidth":"80%", "top":"20px"}}>
        <Form layout="horizontal">
          <FormItem {...formItemLayout_large} label="公告内容">
            {getFieldDecorator('content', {rules: [{required: true, message: '公告内容不能为空'}]})(<Input placeholder="输入公告内容"/>)}
          </FormItem>
          <FormItem {...formItemLayout_large} label="显示状态">
            {getFieldDecorator("status")(<Switch checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="close" />}/>)}
          </FormItem>
          <FormItem {...formItemLayout_large} label="打开方式">
            {getFieldDecorator("openMode", {rules: [{required: true, message: '打开方式不能为空'}]})(
              <Radio.Group onChange={onRadioChange}>
                <Radio value="0">不打开</Radio>
                <Radio value="1">弹窗方式打开</Radio>
                <Radio value="2">链接跳转</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem {...formItemLayout_large} label="链接模式">
            {getFieldDecorator('navMode')(<Input disabled={openMode!=="2"} placeholder="链接模式，如：navigate"/>)}
            <span className="dark">可选：navigate、redirect、switchTab、reLaunch、navigateBack、exit</span>
          </FormItem>
          <FormItem {...formItemLayout_large} label="链接地址">
            {getFieldDecorator('url')(<Input disabled={openMode!=="2"} placeholder="链接跳转方式时，输入地址"/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default AddModal;

