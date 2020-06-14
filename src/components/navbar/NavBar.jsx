import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

//Icons
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appbar: {
    flexGrow: 1,
    top: "auto",
    bottom: 0,
    background: "#726a95",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  generate: {
    backgroundColor: "#f54291",
    color: "#fff",
    transition: "0.5s background-color ease",
    "&:hover": {
      backgroundColor: "#0a97b0",
    },
  },
  title: {
    flexGrow: 1,
  },
  button: {
    backgroundColor: "#0a97b0",
    marginRight: "7px",
    borderRadius: 100,
    transition: "0.5s background-color ease",
    "&:hover": {
      backgroundColor: "#f54291",
    },
  },
  slider: {
    maxWidth: 150,
    marginLeft: 20,
  },
  speedMenu: {
    maxWidth: 150,
    marginLeft: 20,
  },
  speedInput: {
    border: "none",
    color: "#fff",
    width: 100,
    height: 30,
    "&:hover": {
      border: "2px solid #f54291",
    },
  },
}));

export default function NavBar({
  handleSpeedChange,
  handleSizeChange,
  handleColorChange,
  size,
  speed,
  color,
  generateNewArr,
  doBubbleSort,
  doInsertionSort,
  doSelectionSort,
  doMergeSort,
}) {
  const classes = useStyles();
  const PrettoSlider = withStyles({
    root: {
      color: "#f54291",
      height: 8,
      paddingBottom: 0,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      marginTop: -8,
      marginLeft: -12,
      "&:focus, &:hover, &$active": {
        boxShadow: "inherit",
        color: "#0a97b0",
      },
    },
    active: {},
    valueLabel: {
      left: "calc(-50% + 4px)",
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);
  return (
    <AppBar position="fixed" className={classes.appbar}>
      <Toolbar>
        <Fab
          edge="start"
          variant="extended"
          size="small"
          aria-label="add"
          className={classes.generate}
          onClick={generateNewArr}
        >
          <AddOutlinedIcon className={classes.navIcon} />
          Generate Array
        </Fab>
        <div className={classes.slider}>
          <PrettoSlider
            max={150}
            min={10}
            valueLabelDisplay="auto"
            aria-labelledby="continuous-slider"
            onChangeCommitted={handleSizeChange}
            defaultValue={size}
          />
          <Typography variant="body2" color="#fff" className={classes.typo}>
            Adjust Array Size
          </Typography>
        </div>

        <div>
          <Tooltip placement="top" title="Adjust Sorting Speed">
            <FormControl className={classes.speedMenu}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={speed}
                onChange={handleSpeedChange}
                className={classes.speedInput}
                variant="outlined"
              >
                <MenuItem value={0.5}>0.5s</MenuItem>
                <MenuItem value={1}>1s</MenuItem>
                <MenuItem value={5}>5s</MenuItem>
                <MenuItem value={10}>10s</MenuItem>
                <MenuItem value={50}>50s</MenuItem>
                <MenuItem value={100}>100s</MenuItem>
                <MenuItem value={500}>500s</MenuItem>
                <MenuItem value={1000}>1000s</MenuItem>
              </Select>
            </FormControl>
          </Tooltip>
        </div>

        <div>
          <Tooltip placement="top" title="Change Bar Color">
            <FormControl className={classes.speedMenu}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={color}
                onChange={handleColorChange}
                className={classes.speedInput}
                variant="outlined"
              >
                <MenuItem value="cyan">Cyan</MenuItem>
                <MenuItem value="#ffea00">Yellow</MenuItem>
                <MenuItem value="#d500f9">Pink</MenuItem>
                <MenuItem value="#2a3eb1">Indigo</MenuItem>
                <MenuItem value="#ff9100">Orange</MenuItem>
              </Select>
            </FormControl>
          </Tooltip>
        </div>

        <Typography variant="h6" className={classes.title}></Typography>
        <div>
          <Button
            color="inherit"
            onClick={doBubbleSort}
            className={classes.button}
          >
            Bubble Sort
          </Button>
          <Button
            color="inherit"
            onClick={doInsertionSort}
            className={classes.button}
          >
            Insertion Sort
          </Button>
          <Button
            color="inherit"
            onClick={doSelectionSort}
            className={classes.button}
          >
            Selection Sort
          </Button>
          <Button
            color="inherit"
            onClick={doMergeSort}
            className={classes.button}
          >
            Merge Sort
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
