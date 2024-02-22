import { Handle, HandleProps } from "reactflow";

import { component } from "../../framework";

export const TargetHandleWithValidation = component<HandleProps>(({ position, type }) =>
  <Handle
    type={type}
    position={position}
    onConnect={(params) => console.log("handle onConnect", params)}
    style={{ background: "blue" }}
  />
);