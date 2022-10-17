// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    address?: string;
    // phone?: string;
    code?: number;
    id?: string;
    username?: string;
    nickname?: string;
    type?: string;
    message?: string;
  };

  type LoginResult = {
    // status?: string;
    // type?: string;
    // currentAuthority?: string;
    code?: number;
    data: string;
    message?: string;
  };

  type PageParams = {
    pageIndex?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    id?: string;
    active?: boolean;
    created: string;
    ip?: string;
    name?: string;
    owner?: string;
    ownerName?: string;
    port?: number;
    protocol?: string;
    sharerCount?: number;
    sshMode?: string;
    tags: string;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type TagsItemType = {
    name: string;
    id: string;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
