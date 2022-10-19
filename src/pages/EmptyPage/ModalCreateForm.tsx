import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormRadio,ProFormDigit,ProFormTextArea
} from '@ant-design/pro-components';
import {
  Col,
  Row,
} from "antd";
import { getTags} from '@/services/ant-design-pro/api';

type CreateFormProps = {
  visible: boolean;
  onDone: () => void;
  model:API.RuleListItem | undefined;
};

const ModalCreateForm: React.FC<CreateFormProps> = (props) => {
    const { visible, model, onDone } = props;

    

  return (
    <ModalForm
        title="新建"
        layout="horizontal"
        visible={visible}
        initialValues={model}
        modalProps={{
          onCancel: () => onDone()
        }}
        
      >
        <Row>
            <Col span={13}>
                <ProFormText hidden={true} name="id" />

                <ProFormText
                  name="name"
                  label="主机名称"
                  rules={[{ required: true, message: '请输入主机名称' }]}
                  placeholder="请输入"
                />

                <ProFormText
                  name="ip"
                  label="主机IP"
                  rules={[{ required: true, message: '请输入主机的IP地址' }]}
                  placeholder="请输入"
                />

                <ProFormRadio.Group
                  name="protocol"
                  label="接入协议"
                  rules={[{required: true, message: '请选择接入协议'}]}
                  
                  options={[
                    {
                      label: 'RDP',
                      value: 'rdp',
                    },
                    {
                      label: 'SSH',
                      value: 'ssh',
                    },
                    {
                      label: 'Telnet',
                      value: 'telnet',
                    },
                    {
                      label: 'VNC',
                      value: 'vnc',
                    },
                  ]}
                />

                <ProFormDigit 
                  label="端口号" 
                  name="port"
                  rules={[{required: true, message: '请输入端口号'}]} 
                  placeholder="请输入TCP端口"
                  min={1} 
                  max={65535} 
                />

                <ProFormSelect
                    name="tags"
                    label="标签"
                    placeholder="标签可以更加方便的检索资产"
                    request={async () => {
                        return getTags().then(({ data }) => {
                          return data.map((item) => {
                            return {
                              label: item.name,
                              value: item.id,
                            };
                          });
                        });
                      }}
                />

                <ProFormTextArea
                  name="description"
                  label="备注"
                  placeholder="关于资产的一些信息您可以写在这里"
                />
            </Col>
            <Col span={11}>

               
            </Col>
        </Row>
      </ModalForm>
  );
};

export default ModalCreateForm;