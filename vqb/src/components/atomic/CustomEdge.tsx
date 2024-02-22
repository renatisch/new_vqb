import { useContext } from "react";
import { BaseEdge, EdgeLabelRenderer, getStraightPath } from "reactflow";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { component } from "../../framework";
import { QueryBuilderContext } from "../../contexts/queryBuilderContext";

type CustomEdgeProps = {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}

export const CustomEdge = component<CustomEdgeProps>(({ id, sourceX, sourceY, targetX, targetY }) => {
  const [edgePath, labelX, labelY] = getStraightPath({ sourceX, sourceY, targetX, targetY });

  const { query, setQuery, action, setAction } = useContext(QueryBuilderContext);
  const handleChange = (event: SelectChangeEvent) => {
    setQuery({ ...query, action: event.target.value });
    setAction(event.target.value);
  };

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <FormControl
          fullWidth
          className="nodrag nopan z10"
          sx={{
            background: "white",
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
            width: 100,
            zIndex: 10000,
          }}
        >
          <InputLabel id="demo-simple-select-label">Action</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={action}
            label="Action"
            onChange={handleChange}
          >
            <MenuItem value="join">Join</MenuItem>
            <MenuItem value="union">Union</MenuItem>
          </Select>
        </FormControl>
      </EdgeLabelRenderer>
    </>
  );
});
