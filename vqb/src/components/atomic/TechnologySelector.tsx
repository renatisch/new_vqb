import { Select, MenuItem } from "@mui/material";

import { component } from "../../framework";
import { Dispatch, SetStateAction } from "react";

export type TechnologySelectorProps = {
  technology: string;
  setTechnology: Dispatch<SetStateAction<string>>;
};

export const TechnologySelector = component<TechnologySelectorProps>(({ technology, setTechnology }) => {
  const handleChange = (value: string) => setTechnology(value);

  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={technology}
      label="Technology"
      onChange={(event) => handleChange(event.target.value)}
    >
      <MenuItem value={"Snowflake"}>Snowflake</MenuItem>
      <MenuItem value={"Databricks"}>Databricks</MenuItem>
      <MenuItem value={"Google_BigQuery"}>Google Big Query</MenuItem>
    </Select>
  );
});
