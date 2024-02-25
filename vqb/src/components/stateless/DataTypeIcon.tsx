import { MdAbc } from "react-icons/md";
import { component } from "../../framework"
import { GoNumber } from "react-icons/go";

type DataTypeIconProps = {
  dataType: string;
}

export const DataTypeIcon = component<DataTypeIconProps>(({ dataType }) => {
  if (dataType === "string") {
    return <MdAbc height={10} />
  }

  if (dataType === "integer") {
    return <GoNumber height={10} />
  }

  return <GoNumber height={10} />
});