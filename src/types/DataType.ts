export type data =
  | number
  | string
  | boolean
  | Object
  | Array<number>
  | Array<string>
  | Array<boolean>
  | Array<Object>;
export interface FileData {
  [key: string]: data;
}
