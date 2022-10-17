import {
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  ProFormRadio,ProFormDigit,ProFormTextArea,ProFormSwitch
} from '@ant-design/pro-components';
import {
  Col,
  Collapse,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Tooltip,Typography
} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import { getTags} from '@/services/ant-design-pro/api';
import { useState,useEffect } from 'react';

const {Text} = Typography;
const {Panel} = Collapse;

type CreateFormProps = {
  visible: boolean;
  onDone: () => void;
  model:API.RuleListItem | undefined;
};

const ModalCreateForm: React.FC<CreateFormProps> = (props) => {
    const { visible, model, onDone } = props;

    // if (model.accountType === undefined) {
    //     model.accountType = 'rdp';
    // }
    // if(model['ssh-mode'] === undefined){
    //     model['ssh-mode'] = 'native'
    // }
    // let [accountType, setAccountType] = useState(model.accountType);
    // let [protocol, setProtocol] = useState(model.protocol);
    // let [sshMode, setSshMode] = useState(model['ssh-mode']);

    // let initAccountTypes = []
    // if (model.protocol) {
    //     initAccountTypes = protocolMapping[model.protocol];
    // }
    // let [accountTypes, setAccountTypes] = useState(initAccountTypes);
    // let [useSSL, setUseSSL] = useState(model['use-ssl']);

    // for (let key in model) {
    //     if (model.hasOwnProperty(key)) {
    //         if (model[key] === '-') {
    //             model[key] = '';
    //         }
    //     }
    // }

    // let [enableDrive, setEnableDrive] = useState(model['enable-drive']);
    // let [storages, setStorages] = useState([]);
    // useEffect(() => {
    //     const getStorages = async () => {
    //         let result = request('/sss/storages/shares');
    //         return setStorages(result['data']);
             
    //     }
    //     getStorages();
    // }, []);

    

  return (
    <ModalForm
        title="新建"
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
                {/* <Collapse defaultActiveKey={['remote-app', '认证', 'storage']} ghost>
                    {
                        protocol === 'rdp' ?
                            <>
                                <Panel header={<Text strong>认证</Text>} key="认证">
                                    <ProFormText
                                        name="domain"
                                        label="域"
                                        placeholder="身份验证时使用的域"
                                    />
                                </Panel>
                                <Panel header={<Text strong>Remote App</Text>} key="remote-app">
                                    <ProFormText
                                        name="remote-app"
                                        label={<Tooltip title="指定在远程桌面上启动的RemoteApp。
                                                如果您的远程桌面服务器支持该应用程序，则该应用程序(且仅该应用程序)对用户可见。
                                                Windows需要对远程应用程序的名称使用特殊的符号。
                                                远程应用程序的名称必须以两个竖条作为前缀。
                                                例如，如果您已经在您的服务器上为notepad.exe创建了一个远程应用程序，并将其命名为“notepad”，则您将该参数设置为:“||notepad”。">
                                            程序&nbsp;<ExclamationCircleOutlined/>
                                        </Tooltip>}
                                        placeholder="remote app"
                                    />

                                    <ProFormText
                                        name="remote-app-dir"
                                        label={<Tooltip
                                            title="remote app的工作目录，如果未配置remote app，此参数无效。">工作目录&nbsp;
                                            <ExclamationCircleOutlined/></Tooltip>}
                                        placeholder="remote app的工作目录"
                                    />

                                    <ProFormText
                                        name="remote-app-args"
                                        label={<Tooltip title="remote app的命令行参数，如果未配置remote app，此参数无效。">参数&nbsp;
                                            <ExclamationCircleOutlined/></Tooltip>}
                                        placeholder="remote app的命令行参数"
                                    />

                                </Panel>
                                <Panel header={<Text strong>映射网络驱动器</Text>} key="storage">
                                    <ProFormSwitch name="enable-drive" label="启用" />

                                    <Form.Item
                                        name="enable-drive"
                                        label="启用"
                                        valuePropName="checked"
                                    >
                                        <Switch checkedChildren="开启" unCheckedChildren="关闭"
                                                onChange={(checked, event) => {
                                                    setEnableDrive(checked);
                                                }}/>
                                    </Form.Item>
                                    {
                                        enableDrive ?

                                            <ProFormSelect
                                            name="drive-path"
                                            label="映射空间"
                                            tooltip='用于文件传输的映射网络驱动器，为空时使用操作人的默认空间'
                                           
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
                                            // <Form.Item
                                            //     name="drive-path"
                                            //     label="映射空间"
                                            //     tooltip='用于文件传输的映射网络驱动器，为空时使用操作人的默认空间'
                                            // >

                                            //     <Select onChange={null} allowClear placeholder='为空时使用操作人的默认空间'>
                                            //         {
                                            //             storages.map(item => {
                                            //                 return <Option
                                            //                     value={item['id']}>{item['name']}</Option>
                                            //             })
                                            //         }
                                            //     </Select>
                                            // </Form.Item> : undefined
                                    }

                                </Panel>
                            </> : undefined
                    }

                    {
                        protocol === 'ssh' ?
                            <>
                                <Panel header={<Text strong>模式设置</Text>} key="模式设置">
                                    <Form.Item
                                        name="ssh-mode"
                                        label='连接模式'
                                        tooltip={<span>指令控制模式会比非指令控制模式增加额外的速度开销。<br/>
                                        非指令控制模式不支持某些最新版本的ssh服务器密钥，此时需对服务器进行额外配置，或使用指令控制模式。
                                        </span>}
                                    >
                                        <Select onChange={(value) => {
                                            setSshMode(value)
                                        }}>
                                            <Option value="native">指令控制</Option>
                                            <Option value="guacd">非指令控制</Option>
                                        </Select>
                                    </Form.Item>
                                </Panel>
                                {
                                    isEmpty(sshMode) || sshMode === 'guacd' ?
                                        <>
                                            <Panel header={<Text strong>显示设置</Text>} key="显示设置">
                                                <Form.Item
                                                    name="color-scheme"
                                                    label="配色方案"
                                                    initialValue=""
                                                >
                                                    <Select onChange={null}>
                                                        <Option value="">默认</Option>
                                                        <Option value="gray-black">黑底灰字</Option>
                                                        <Option value="green-black">黑底绿字</Option>
                                                        <Option value="white-black">黑底白字</Option>
                                                        <Option value="black-white">白底黑字</Option>
                                                    </Select>
                                                </Form.Item>

                                                <ProFormText
                                                    name="font-name"
                                                    label="字体名称"
                                                    placeholder="为空时使用系统默认字体"
                                                />

                                                

                                                <Form.Item
                                                    name="font-size"
                                                    label="字体大小"
                                                >
                                                    <Input type='number' placeholder="为空时使用系统默认字体大小" min={8}
                                                            max={96}/>
                                                </Form.Item>
                                            </Panel>
                                        </> : undefined
                                }

                            </> : undefined
                    }

                    {
                        protocol === 'vnc' ?
                            <>
                                <Panel header={<Text strong>提示</Text>} key="提示">
                                    <div style={{width:'90%',marginLeft:20}}>
                                        <p>vnc服务器推荐使用tigervnc server，堡垒机与其数据传输速率最快。</p>
                                        <p>其余vnc server可能需要额外配置才能其保证稳定性与适配性，如real vnc较新版本，因其使用的是非公开标准的vnc协议认证方法，若不进行配置，则无法连接。</p>
                                    </div>
                                </Panel>
                            </> : undefined
                    }


                    {
                        protocol === 'telnet' ?
                            <>
                                <Panel header={<Text strong>显示设置</Text>} key="显示设置">
                                    <Form.Item
                                        name="color-scheme"
                                        label="配色方案"
                                        initialValue=""
                                    >
                                        <Select onChange={null}>
                                            <Option value="">默认</Option>
                                            <Option value="gray-black">黑底灰字</Option>
                                            <Option value="green-black">黑底绿字</Option>
                                            <Option value="white-black">黑底白字</Option>
                                            <Option value="black-white">白底黑字</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        name="font-name"
                                        label="字体名称"
                                    >
                                        <Input type='text' placeholder="为空时使用系统默认字体"/>
                                    </Form.Item>

                                    <Form.Item
                                        name="font-size"
                                        label="字体大小"
                                    >
                                        <Input type='number' placeholder="为空时使用系统默认字体大小" min={8} max={96}/>
                                    </Form.Item>
                                </Panel>
                            </> : undefined
                    }
                </Collapse> */}
            </Col>
        </Row>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label="签约客户名称"
            tooltip="最长为 24 位"
            placeholder="请输入名称"
          />
  
          <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="contract" label="合同名称" placeholder="请输入名称" />
          <ProFormDateRangePicker name="contractTime" label="合同生效时间" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            request={async () => [
              {
                value: 'chapter',
                label: '盖章后生效',
              },
            ]}
            width="xs"
            name="useMode"
            label="合同约定生效方式"
          />
          <ProFormSelect
            width="xs"
            options={[
              {
                value: 'time',
                label: '履行完终止',
              },
            ]}
            name="unusedMode"
            label="合同约定失效效方式"
          />
        </ProForm.Group>
        <ProFormText width="sm" name="id" label="主合同编号" />
        <ProFormText name="project" disabled label="项目名称" initialValue="xxxx项目" />
        <ProFormText width="xs" name="mangerName" disabled label="商务经理" initialValue="启途" />
      </ModalForm>
  );
};

export default ModalCreateForm;