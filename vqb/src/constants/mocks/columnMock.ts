import { ColumnQuery } from "../../types/types";

type ColumnMock = {
  tableName: string;
  columns: ColumnQuery[];
}[];

export const columnsMock: ColumnMock = [
  {
    tableName: "Orders",
    columns: [
      {
        name: "id",
        dataType: "integer",
      },
      {
        name: "product_name",
        dataType: "string",
      },
      {
        name: "product_category",
        dataType: "string",
      },
      {
        name: "product_price",
        dataType: "integer",
      },
      {
        name: "order_type",
        dataType: "string",
      },
    ],
  },
  {
    tableName: "Payments",
    columns: [
      {
        name: "order_id",
        dataType: "integer",
      },
      {
        name: "payment_type",
        dataType: "string",
      },
      {
        name: "product",
        dataType: "string",
      },
      {
        name: "delivery_address",
        dataType: "string",
      },
    ]
  }
];