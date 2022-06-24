import Willtable from "../components/Willtable";
import TableBase from "../components/TableBase";
import TableStripe from "../components/TableStripe";
import TableBorder from "../components/TableBorder";
import TableAlign from "../components/TableAlign";
import TableScrollbar from "../components/TableScrollbar";
import TableHighlight from "../components/TableHighlight";
import TableSelection from "../components/TableSelection";
import TableSort from "../components/TableSort";
import TableFilter from "../components/TableFilter";
import TableTooltip from "../components/TableTooltip";
import TableExpand from "../components/TableExpand";
import ElTableFilter from "../components/ElTableFilter";

const components = {
  TableBase,
  TableStripe,
  TableBorder,
  TableAlign,
  TableScrollbar,
  TableHighlight,
  TableSelection,
  TableSort,
  TableFilter,
  TableTooltip,
  TableExpand,
  Willtable,
  ElTableFilter,
};

export const routes = Object.entries(components).map(([name, component]) => {
  return {
    path: "/" + name,
    name: name,
    component,
  };
});
