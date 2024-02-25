import { CiViewTable } from "react-icons/ci";

import { component, useProp, useQuery } from "../../../framework";
import { TableQuery } from "../../../types/types";
import { api } from "../../../utils/api";
import { SchemaListerTreeItem } from "../../stateless/TreeItem";
import { PlusSquare } from "../../stateless/icons";
import { DataTypeIcon } from "../../stateless/DataTypeIcon";

type DbTableProps = {
  dbName: string;
  schemaName: string;
  tableName: string;
  isExpanded: boolean;
  onTableAdd: (table: TableQuery) => void;
};

export const TableNode = component<DbTableProps>(({ isExpanded, dbName, schemaName, tableName, onTableAdd }) => {
  const queryDbName = isExpanded ? dbName : undefined;
  const subNodes = useQuery(api.getColumnList, queryDbName, schemaName, tableName);
  const columns = useProp(subNodes.data, []);

  const onTableAddHandler = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    onTableAdd({ dbName, schemaName, tableName, columns });
  }

  return (
    <SchemaListerTreeItem
      nodeId={tableName}
      labelText={tableName}
      labelIcon={<CiViewTable />}
      controlIcon={subNodes.data && <PlusSquare onClick={onTableAddHandler} />}
      isLoadingChildren={subNodes.isLoading}
    >
      {columns.map(({ name, dataType }) =>
        <SchemaListerTreeItem key={name} noExpand nodeId={name} labelText={name} labelIcon={<DataTypeIcon dataType={dataType} />} />
      )}
    </SchemaListerTreeItem>
  );
});