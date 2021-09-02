import React from "react";
import { makeStyles} from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";

// Styling for the 'chips'
const useStyles = makeStyles((theme) => ({
  chips: {
    display: "flex",
    flexDirection: "row"
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

// Styling for the drop-down
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export default function CheckboxDropdown({users}) {
  const classes = useStyles();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const names = Object.keys(users).map(userID => users[userID].user_name);

  return (
    <div>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="mutiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
    </div>
  );
}