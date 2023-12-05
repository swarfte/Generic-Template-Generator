import { data, FileData } from "../types/dataType";

abstract class AbstractAdapter {
  public constructor(private filename: string, private data: Array<Object>) {
    this.data = this.parseData(filename);
  }

  public abstract parseData(filename: string): Array<Object>;

  public getData(): Array<Object> {
    return this.data;
  }

  public getFilename(): string {
    return this.filename;
  }

  public getDataByRow(rowIndex: number): Object {
    return this.data[rowIndex];
  }

  public getDataByCol(columnName: string): Array<data> {
    const dataByCol: Array<data> = [];
    for (const row of this.data) {
      dataByCol.push((row as FileData)[columnName]);
    }

    return dataByCol;
  }
}
