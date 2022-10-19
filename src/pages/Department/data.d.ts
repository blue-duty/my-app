export type TableListItem = {
  key: number;
  name: string;
  id: number;
  userCount:number;
  assetCount:number;
  description: string;
  appCount:string;
  fatherID:number;
  children:TableListItem[]
};