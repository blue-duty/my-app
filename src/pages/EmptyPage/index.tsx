import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Tag, Tooltip } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { getList } from '@/services/ant-design-pro/api';
import { isEmpty, PROTOCOL_COLORS } from '@/services/ant-design-pro/utils';
import ModalCreateForm from './ModalCreateForm';

const TableList: React.FC = () => {
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const handleDone = () => {
    setDone(done);
    setVisible(false);
  };

  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();

  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: <FormattedMessage id="pages.assetTable.ruleName.name" defaultMessage="Rule name" />,
      dataIndex: 'name',
      // tip: 'The rule name is the unique key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.assetTable.ruleName.protocol" defaultMessage="Protocol" />,
      dataIndex: 'protocol',
      render: (text, record) => {
        const title = `${record['ip'] + ':' + record['port']}`;
        return (
          <Tooltip title={title}>
            <Tag color={PROTOCOL_COLORS[text as any]}>{text}</Tag>
          </Tooltip>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.assetTable.ruleName.tags" defaultMessage="Tags" />,
      dataIndex: 'tags',
      render: (_, record) => {
        const tagDocuments: any[] = [];
        if (!isEmpty(record.tags)) {
          const tagArr = record.tags.split(',');
          for (let i = 0; i < tagArr.length; i++) {
            if (tagArr[i] === '-') {
              continue;
            }
            tagDocuments.push(<Tag key={tagArr[i]}>{tagArr[i]}</Tag>);
          }
        }
        return tagDocuments;
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleStatus" defaultMessage="Status" />,
      dataIndex: 'active',
      hideInForm: true,
      hideInSearch: true,
      valueEnum: {
        true: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.online" defaultMessage="Online" />
          ),
          status: 'Success',
        },
        false: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.outline" defaultMessage="Abnormal" />
          ),
          status: 'Error',
        },
      },
    },
    {
      title: (
        <FormattedMessage id="pages.assetTable.ruleName.ownerName" defaultMessage="OwnerName" />
      ),
      dataIndex: 'ownerName',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage
          id="pages.assetTable.ruleName.created"
          defaultMessage="Last create time"
        />
      ),
      sorter: (a, b) => Date.parse(a.created) - Date.parse(b.created),
      dataIndex: 'created',
      valueType: 'dateTime',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="access"
          onClick={() => {
            setVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.searchTable.access" defaultMessage="Configuration" />
        </a>,
        <a
          key="config"
          onClick={() => {
            setVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.searchTable.config" defaultMessage="Configuration" />
        </a>,
        <a
          key="changeOwner"
          onClick={() => {
            setVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.searchTable.changeOwner" defaultMessage="Configuration" />
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.assetTable.title',
          defaultMessage: 'Asset list',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={getList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
            </div>
          }
        >
          <Button
          // onClick={async () => {
          //   await handleRemove(selectedRowsState);
          //   setSelectedRows([]);
          //   actionRef.current?.reloadAndRest?.();
          // }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}

      <ModalCreateForm visible={visible} onDone={handleDone} model={currentRow} />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
