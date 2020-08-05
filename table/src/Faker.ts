import faker from 'faker';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';

type RowFields = {
  name: string;
  job: string;
  companyName: string;
  department: string;
  salary: string;
  phone: string;
  email: string;
  age: number;
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
  ip: string;
  password: string;
  website: string;
  domain: string;
  productName: string;
  productMaterial: string;
  color: string;
};

type Row = RowFields & {
  id: string;
};

type Column = {
  dataKey: string;
  label: string;
  editable?: boolean;
};

export class TableDataFaker {
  private _rows: Row[] = [];
  private _columns: Column[] = [];

  constructor(rowsCount: number, columnsCount: number) {
    this.setRows(rowsCount);
    this.setColumns(columnsCount);
  }

  get rows() {
    return this._rows;
  }

  get rowsCount() {
    return this._rows.length;
  }

  get columns() {
    return this._columns;
  }

  get columnsCount() {
    return this._columns.length;
  }

  private setRows = (userRowsCount: number) => {
    this._rows = [];
    const rowsCount = Math.max(1, userRowsCount);

    for (let i = 0; i < rowsCount; i++) {
      this._rows.push({
        id: uuid(),
        ...this.generateSingleRow(),
      });
    }
  };

  private generateSingleRow = () => ({
    name: faker.name.findName(),
    job: faker.name.jobDescriptor(),
    companyName: faker.company.companyName(),
    department: faker.commerce.department(),
    salary: `${faker.finance.amount()}$`,
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    age: faker.random.number(),
    country: faker.address.country(),
    state: faker.address.state(),
    city: faker.address.city(),
    street: faker.address.streetName(),
    zipCode: faker.address.zipCode(),
    ip: faker.internet.ip(),
    password: faker.internet.password(),
    website: faker.internet.url(),
    domain: faker.internet.domainName(),
    productName: faker.commerce.productName(),
    productMaterial: faker.commerce.productMaterial(),
    color: faker.internet.color(),
  });

  private setColumns = (userColumnsCount: number) => {
    this._columns = [];

    const objectFieldNames = _.sortBy(Object.keys(this.generateSingleRow()));
    const maxColumnsCount = objectFieldNames.length;
    const columnsCount = Math.max(
      1,
      Math.min(userColumnsCount, maxColumnsCount),
    );

    for (let i = 0; i < columnsCount; i++) {
      this._columns.push({
        dataKey: objectFieldNames[i],
        label: _.startCase(objectFieldNames[i]),
        editable: i == 1,
      });
    }
  };
}
