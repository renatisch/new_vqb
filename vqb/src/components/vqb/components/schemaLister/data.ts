const TableData = [
  {
    id: "db1",
    name: "DB 1",
    objectType: "database",
    children: [
      {
        id: "1",
        name: "renats_schema",
        objectType: "schema",
        children: [
          {
            id: "table-1",
            name: "Orders",
            objectType: "table",
            expanded: false,
            children: [
              {
                id: "column-1",
                objectType: "column",
                name: "id",
                dataType: "integer",
                selected: false,
              },
              {
                id: "column-2",
                objectType: "column",
                name: "product_name",
                dataType: "string",
                selected: false,
              },
              {
                id: "column-3",
                objectType: "column",
                name: "product_category",
                dataType: "string",
                selected: false,
              },
              {
                id: "column-4",
                objectType: "column",
                name: "product_price",
                dataType: "integer",
                selected: false,
              },
              {
                id: "column-5",
                objectType: "column",
                name: "order_type",
                dataType: "string",
                selected: false,
              },
            ],
          },
          {
            id: "table-2",
            name: "Payments",
            objectType: "table",
            expanded: false,
            children: [
              {
                id: "table-2-column-1",
                objectType: "column",
                name: "order_id",
                dataType: "integer",
                selected: false,
              },
              {
                id: "table-2-column-2",
                objectType: "column",
                name: "payment_type",
                dataType: "string",
                selected: false,
              },
              {
                id: "table-2-column-3",
                objectType: "column",
                name: "product",
                dataType: "string",
                selected: false,
              },
              {
                id: "table-2-column-4",
                objectType: "column",
                name: "delivery_address",
                dataType: "string",
                selected: false,
              },
            ],
          },
        ],
      },
    ],
  },
];

export { TableData };
