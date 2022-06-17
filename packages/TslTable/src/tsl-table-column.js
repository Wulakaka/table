import { TableColumn } from "element-ui";
TableColumn.props["filterPlacement"] = {
  default: "bottom-start",
  type: String,
  required: false,
};
export default {
  ...TableColumn,
  name: "TslTableColumn",
};
