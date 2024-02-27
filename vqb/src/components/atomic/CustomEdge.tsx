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
          size='small'
          sx={{
            m: 1,
            fontSize: 'small',
            background: "#f9fcfe",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px) scale(0.6)`,
            pointerEvents: "all",
            width: 100,
            zIndex: 10000,
          }}
        >
          <InputLabel id="demo-simple-select-label">Action</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            size='small'
            value={action}
            margin={'none'}
            label="Action"
            onChange={handleChange}
          >
            <MenuItem value="join" sx={{ fontSize: 'medium' }}>Join</MenuItem>
            <MenuItem value="union" sx={{ fontSize: 'medium' }}>Union</MenuItem>
          </Select>
        </FormControl>
      </EdgeLabelRenderer>
    </>
  );
});
