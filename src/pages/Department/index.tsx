import { Button,message,Modal,Card,Row,Col,Select,Input,Space} from 'antd';
import React, {Key, useRef,useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import CreateForm from './CreateForm';
import type { TableListItem } from './data.d';
import { addRule,removeRule,updateRule } from './service';
import { request } from 'umi';

const { Search } = Input;



const DepartmentList: React.FC = () => {
  
  const actionRef = useRef<ActionType>();

  const [defaultExpanded, setDefaultExpanded] = useState<Readonly<Key[]>>();

  const rule = async ( options?: { [key: string]: any }) => {
    // 发起请求
    const { data, success } = await request<{
      data: TableListItem[];
      success?: boolean;
    }>('/sss/departments', {
      method: 'GET',
      ...(options || {}),
      headers: {
        'X-Auth-Token': `${localStorage.getItem('X-Auth-Token')}`,
      },
    });;

    const newExpandedKeys:any[] = []

    const render = (data: TableListItem[]) => { // 获取到所有可展开的父节点
      data.map(item => {
        if (item.children) {
          newExpandedKeys.push(item.id)
          render(item.children)
        }
      })
      return newExpandedKeys
    }
    
    setDefaultExpanded(render(data))

    // 格式化返回数据
    return {
        data: data,
        success,
    };
};


  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<TableListItem> | undefined>(undefined);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleAdd = async (fields: TableListItem) => {
    try {
      await addRule({ ...fields });
      message.success('添加成功');
      return true;
    } catch (error) {
      message.error('添加失败请重试！');
      return false;
    }
  };

  const handleUpdate = async (fields: TableListItem) => {
    try {
      await updateRule({
        ...fields,
      });
      message.success('编辑成功');
      return true;
    } catch (error) {
      message.error('编辑失败，请重试！');
      return false;
    }
  };

  const handleSubmit = async (values: TableListItem) => {
    if(values?.id){
      const success = await handleAdd(values as TableListItem);
      if (success) {
        setVisible(false);
        if (actionRef.current) {
          actionRef.current.reload();
        }
      }
    }else{
      const success = await handleUpdate(values as TableListItem);
      if (success) {
        setVisible(false);
        if (actionRef.current) {
          actionRef.current.reload();
        }
      }
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await removeRule(id);
      message.success('删除成功，即将刷新');
      actionRef.current?.reload();
      return true;
    } catch (error) {
      message.error('删除失败，请重试');
      return false;
    }
  };

  const showDeleteConfirm = (record: TableListItem) => {
    Modal.confirm({
      title: '您确定要删除此项吗?',
      content: record.name,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => deleteItem(record.id),
    });
  };
 


  const columns: ProColumns<TableListItem>[] = [
    {
      title: '部门名称',
      dataIndex: 'name',
    },
    {
      title: '部门ID',
      dataIndex: 'id',
      valueType: 'textarea',
    },
    {
      title: '用户数',
      dataIndex: 'userCount',
    },
    {
      title: '设备数',
      dataIndex: 'assetCount',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button type="link" size='small' onClick={()=>{
          setVisible(true)
          setCurrent(record)
        }}>编辑</Button>,
        <Button type="link" size='small' onClick={()=>{
          showDeleteConfirm(record)
        }}>删除</Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <Card>
        <Row gutter={{ xs: 8, sm: 16, md: 24}}>
          <Col span={14}>
            <Select style={{width: 100,marginRight:10}} defaultValue="">
              <Select.Option value="">自动识别</Select.Option>
              <Select.Option value="name">部门名称</Select.Option>
              <Select.Option value="id">部门ID</Select.Option>
            </Select>

            <Search
              allowClear
              enterButton="搜索"
              style={{
                width: 200,
              }}
            />
          </Col>
          <Col span={10} style={{textAlign: 'right'}}>
            <Space>
              <Button type="primary" onClick={() => {setVisible(true);}}>新增</Button>
              <Button>导入</Button>
              <Button>导出</Button>
            </Space>
          </Col>   
        </Row>

      </Card>

      <ProTable<TableListItem>
        actionRef={actionRef}
        rowKey="key"
        search={false}
        options={false}
        request={rule}
        columns={columns}
        expandable={{defaultExpandedRowKeys: defaultExpanded}}
      />


      <CreateForm
        visible={visible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        current={current}
      />
      
    </PageContainer>
  );
};

export default DepartmentList;
