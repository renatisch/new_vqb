export const queryExamples = [
  {
    query: "SELECT * FROM ACME_ORG.MARKETING.department_table;",
  },
  {
    query: 'SELECT * FROM "DATA"."Schema"."Upload" WHERE "data" > 0;',
  },
  {
    query:
      "SELECT * FROM alteryx.staff.product_department JOIN alteryx.staff.offices ON location = location\nWHERE alteryx.staff.product_department.location = 'Prague';",
  },
];