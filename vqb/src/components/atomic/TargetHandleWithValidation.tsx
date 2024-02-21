import { FC } from "react";
import { Handle, HandleProps } from "reactflow";

export const TargetHandleWithValidation: FC<HandleProps> = ({ position, type }) =>
  <Handle
    type={type}
    position={position}
    onConnect={(params) => console.log("handle onConnect", params)}
    style={{ background: "blue" }}
  />