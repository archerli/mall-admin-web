import React from 'react';
import {DatePicker, Form, Modal} from 'antd';
import ReplyModal from '@/pages/admin/feedback/components/ReplyModal';

const FormItem = Form.Item;
const {MonthPicker} = DatePicker;

@Form.create()
class DownloadModal extends React.Component {

  state = {
    month:'',
  }

  onChange = (date, value) => {
    this.setState({month: value});
  }

  render() {
    const {
      onOk,
      form: {
        getFieldDecorator,
        validateFieldsAndScroll,
      },
      ...modalProps
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
      },
    };

    const handleOk = (e) => {
      e.preventDefault();

      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
          onOk({month: this.state.month});
        }
      });
    }

    const modalOpts = {
      ...modalProps,
      onOk: handleOk
    }

    return(
      <Modal {...modalOpts} >
        <Form layout="horizontal">
          <FormItem {...formItemLayout} label="选择年月">
            <FormItem >
              {getFieldDecorator('month', {rules: [{required: true, message: '选择年月'}]})(<MonthPicker format="YYYYMM" onChange={this.onChange} size="large" placeholder="请选择年月" />)}
            </FormItem>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default DownloadModal;
