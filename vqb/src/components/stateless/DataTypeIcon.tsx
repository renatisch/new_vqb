import { MdAbc } from "react-icons/md";
import { GoNumber } from "react-icons/go";
import { CiSquareCheck, CiViewList } from "react-icons/ci";

import { component } from "../../framework"
import { DataType } from "../../types/types";

type DataTypeIconProps = {
  dataType: DataType;
}

export const DataTypeIcon = component<DataTypeIconProps>(({ dataType }) => {
  if (dataType === "boolean") {
    return <CiSquareCheck />;
  }

  if (dataType === "string") {
    return <MdAbc />;
  }

  if (dataType === "integer") {
    return <GoNumber />;
  }

  return <CiViewList />;
});