import { ModalForm,
    ProFormTreeSelect,
    ProFormText,
    ProFormTextArea
} from '@ant-design/pro-components';
import type { TableListItem } from './data.d';

    
type CreateFormProps = {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (values: TableListItem) => void;
    current: Partial<TableListItem> | undefined;
};
  
const CreateForm: React.FC<CreateFormProps> = (props) => {
    const { visible, onCancel, onSubmit,current } = props;

    const formLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 10},
    };
      
  
    return (
        <ModalForm<TableListItem>
        title={`${current ? '编辑' : '新建'}部门`}
        layout="horizontal"
        visible={visible}
        initialValues={current}
        modalProps={{
            onCancel: () => onCancel()
        }}
        onFinish={async (values) => {
            onSubmit(values);
        }}
        {...formLayout}
        >
            <ProFormText hidden={true} name="id" />

            <ProFormTreeSelect
                name="superior"
                label="上级部门"
                rules={[{ required: true, message: '请选择上级部门' }]}
                request={async () => {
                    return [
                    {
                        title: 'Node1',
                        value: '0-0',
                        children: [
                        {
                            title: 'Child Node1',
                            value: '0-0-0',
                        },
                        ],
                    },
                    {
                        title: 'Node2',
                        value: '0-1',
                        children: [
                        {
                            title: 'Child Node3',
                            value: '0-1-0',
                        },
                        {
                            title: 'Child Node4',
                            value: '0-1-1',
                            children: [
                                {
                                    title: 'Child Node6',
                                    value: '',
                                },
                                ],

                        },
                        {
                            title: 'Child Node5',
                            value: '0-1-2',
                        },
                        ],
                    },
                    ];
                }}

            />
  
            <ProFormText
                name="name"
                label="部门名称"
                rules={[{ required: true, message: '请输入部门名称' }]}
                placeholder="请输入"
            />

            <ProFormTextArea
                name="desc"
                label="描述"
            />
         
        </ModalForm>
    );
  };
  
  export default CreateForm;