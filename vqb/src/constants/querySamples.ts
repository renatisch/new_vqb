export const queryExamples = [
  {
    query: "SELECT * FROM ACME_ORG.MARKETING.department_table;",
  },
  {
    query: 'SELECT * FROM "DATA"."Schema"."Upload" WHERE "data" > 0;',
  },
  {
    query:
      "SELECT * FROM alteryx.staff.product_department JOIN alteryx.staff.offices ON location = location WHERE alteryx.staff.product_department.location = 'Prague';",
  },
];