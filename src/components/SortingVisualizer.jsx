import React, { Component, Fragment } from "react";
import NavBar from "./navbar/NavBar";
import {
  bubbleSort,
  insertionSort,
  selectionSort,
} from "./utils/sortingAlgorithm";

//MUI stuff
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box, Tooltip } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Switch from "@material-ui/core/Switch";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = {
  paper: {
    marginTop: 10,
    width: "96%",
    height: "86vh",
    marginRight: "2%",
    marginLeft: "2%",
    background: "",
    position: "relative",
  },
  arrContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
  snackBar: {
    width: "100%",
    "& > * + *": {
      marginTop: 2,
    },
  },
  switch: {
    position: "absolute",
    top: 0,
    left: 0,
  },
};

class SortingVisualizer extends Component {
  state = {
    generatedArr: [],
    open: false,
    openSuccess: false,
    vertical: "top",
    horizontal: "center",
    size: 150,
    speed: 0.5,
    color: "cyan",
    theme: false,
    width: null,
  };

  componentDidMount() {
    this.generateNewArr();
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    if (this.state.open) {
      this.setState({ open: false });
    } else if (this.state.openSuccess) {
      this.setState({ openSuccess: false });
    }
  };

  handleSizeChange = (event, size) => {
    this.setState({ size });
  };

  handleSpeedChange = (event) => {
    this.setState({ speed: event.target.value });
  };

  handleColorChange = (event) => {
    this.setState({ color: event.target.value });
  };

  handleThemeChange = (event) => {
    this.setState({ theme: event.target.checked });
  };

  generateNewArr = () => {
    const generatedArr = [];
    let width;
    const { size } = this.state;
    for (let i = 0; i < size; i++) {
      generatedArr.push(this.randomArr(5, 600));
    }
    if (size <= 20) width = 60;
    else if (size > 20 && size <= 50) width = 23;
    else if (size > 50 && size <= 100) width = 8;
    else width = 3.5;
    this.setState({ generatedArr, open: true, width });
  };

  randomArr = (min, max) => {
    return Math.floor(Math.random() * (max - min - 1) + min);
  };

  doBubbleSort = () => {
    const { generatedArr, speed, color } = this.state;
    let ani = bubbleSort(generatedArr);
    for (let i = 0; i < ani.length; i++) {
      const { swapIndex, values, swapped } = ani[i];
      setTimeout(() => {
        const arrBar = document.getElementsByClassName("arrElement");

        if (swapped) {
          arrBar[swapIndex[1]].style.backgroundColor = "green";
          arrBar[swapIndex[0]].style.backgroundColor = "green";
          arrBar[swapIndex[1]].style.height = `${values[1]}px`;
          arrBar[swapIndex[0]].style.height = `${values[0]}px`;
          console.log("runned");
        } else {
          arrBar[swapIndex[1]].style.backgroundColor = "red";
          arrBar[swapIndex[0]].style.backgroundColor = "red";
          console.log("running");
        }
        setTimeout(() => {
          arrBar[swapIndex[1]].style.backgroundColor = color;
          arrBar[swapIndex[0]].style.backgroundColor = color;
        }, speed / 4);
      }, i * speed);
    }
    setTimeout(() => {
      this.setState({ openSuccess: true });
    }, ani.length * speed);
  };

  doInsertionSort = () => {
    const { generatedArr, speed, color } = this.state;
    const animations = insertionSort(generatedArr);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const { swapIndex, values, insertedValue, swapped } = animations[i];
      setTimeout(() => {
        const arrBar = document.getElementsByClassName("arrElement");
        if (swapped) {
          arrBar[swapIndex[1]].style.backgroundColor = "green";
          arrBar[swapIndex[0]].style.backgroundColor = "green";
          arrBar[swapIndex[1]].style.height = `${values[1]}px`;
          arrBar[swapIndex[0]].style.height = `${values[0]}px`;
        } else {
          arrBar[insertedValue[0]].style.backgroundColor = "purple";
          arrBar[insertedValue[1]].style.backgroundColor = "purple";
          arrBar[insertedValue[0]].style.height = `${insertedValue[2]}px`;
        }
        setTimeout(() => {
          if (swapped) {
            arrBar[swapIndex[1]].style.backgroundColor = color;
            arrBar[swapIndex[0]].style.backgroundColor = color;
          } else {
            arrBar[insertedValue[0]].style.backgroundColor = color;
            arrBar[insertedValue[1]].style.backgroundColor = color;
          }
        }, speed / 4);
      }, i * speed);
    }
    setTimeout(() => {
      this.setState({ openSuccess: true });
    }, animations.length * speed);
  };

  doSelectionSort = () => {
    const { generatedArr, speed, color } = this.state;
    const animations = selectionSort(generatedArr);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const {
        min,
        comparisonIndex,
        updatedMin,
        swapped,
        swapIndex,
        swapValues,
      } = animations[i];
      console.log(min);

      setTimeout(() => {
        const arrBar = document.getElementsByClassName("arrElement");
        if (min) {
          arrBar[min].style.backgroundColor = "red";
          arrBar[comparisonIndex[0]].style.backgroundColor = "purple";
          arrBar[comparisonIndex[1]].style.backgroundColor = "purple";
        }

        if (updatedMin) {
          arrBar[updatedMin].style.backgroundColor = "blue";
        }
        if (swapped) {
          arrBar[swapIndex[0]].style.backgroundColor = "green";
          arrBar[swapIndex[1]].style.backgroundColor = "green";
          arrBar[swapIndex[0]].style.height = `${swapValues[0]}px`;
          arrBar[swapIndex[1]].style.height = `${swapValues[1]}px`;
        }
        setTimeout(() => {
          if (min) {
            arrBar[min].style.backgroundColor = color;
            arrBar[comparisonIndex[0]].style.backgroundColor = color;
            arrBar[comparisonIndex[1]].style.backgroundColor = color;
          }
          if (updatedMin) {
            arrBar[updatedMin].style.backgroundColor = color;
          }
          if (swapped) {
            arrBar[swapIndex[0]].style.backgroundColor = color;
            arrBar[swapIndex[1]].style.backgroundColor = color;
          }
        }, speed / 4);
      }, i * speed);
    }
  };

  render() {
    const { classes } = this.props;
    const {
      generatedArr,
      open,
      vertical,
      horizontal,
      size,
      speed,
      width,
      color,
      openSuccess,
      theme,
    } = this.state;
    const bacgcolor = !theme ? "#fff" : "rgba(0, 0, 0, 0.54)";
    const toolTipMessage =
      bacgcolor === "#fff" ? "Switch to Dark mode" : "Switch to Light Mode";
    return (
      <Fragment>
        <NavBar
          generateNewArr={this.generateNewArr}
          size={size}
          speed={speed}
          color={color}
          handleSizeChange={this.handleSizeChange}
          handleSpeedChange={this.handleSpeedChange}
          doBubbleSort={this.doBubbleSort}
          doInsertionSort={this.doInsertionSort}
          doSelectionSort={this.doSelectionSort}
          handleColorChange={this.handleColorChange}
        />
        <Paper
          elevation={3}
          className={classes.paper}
          style={{ backgroundColor: bacgcolor }}
        >
          <div className={classes.switch}>
            <Tooltip placement="bottom" title={toolTipMessage}>
              <Switch
                checked={theme}
                onChange={this.handleThemeChange}
                name="theme"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </Tooltip>
          </div>
          <div className={classes.snackBar}>
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              autoHideDuration={500}
              onClose={this.handleClose}
            >
              <Alert onClose={this.handleClose} severity="info">
                New Array generated of size {size}
              </Alert>
            </Snackbar>
            <Snackbar
              open={openSuccess}
              autoHideDuration={500}
              onClose={this.handleClose}
            >
              <Alert onClose={this.handleClose} severity="success">
                Array Sorted
              </Alert>
            </Snackbar>
          </div>
          <Box component="div" className={classes.arrContainer}>
            {generatedArr.map((ele, index) => (
              <Box
                component="div"
                display="inline-block"
                width={width}
                marginX="3px"
                key={index}
                id="arrBox"
                className="arrElement"
                style={{ height: `${ele}px`, backgroundColor: `${color}` }}
              ></Box>
            ))}
          </Box>
        </Paper>
      </Fragment>
    );
  }
}

export default withStyles(styles)(SortingVisualizer);
