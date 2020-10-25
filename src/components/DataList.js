import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const handleCollapseClick = (listId, openItems, setOpenItems) => () => {
  // flip the currently toggled list item
  setOpenItems({ ...openItems, [listId]: !openItems[listId] });
};

const DataList = ({ data }) => {
  const classes = useStyles();
  const [openItems, setOpenItems] = useState({});

  const ListItems = Object.keys(data).map((key) => {
    const InnerList = data[key]
      .sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      })
      .map((sorted) => {
        return (
          <ListItem button key={sorted.id} className={classes.nested}>
            <ListItemText primary={`id: ${sorted.id} | name: ${sorted.name}`} />
          </ListItem>
        );
      });
    return (
      <div key={key}>
        <ListItem
          button
          onClick={handleCollapseClick(key, openItems, setOpenItems)}
        >
          <ListItemText primary={`listId: ${key}`} />
          {openItems[key] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={!!openItems[key]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {InnerList}
          </List>
        </Collapse>
      </div>
    );
  });

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <List component="nav" aria-label="secondary mailbox folders">
          {ListItems}
        </List>
      </CardContent>
    </Card>
  );
};

export default DataList;
