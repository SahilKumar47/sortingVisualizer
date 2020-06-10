import React, { Component, Fragment } from "react";
import NavBar from "./navbar/NavBar";
import { bubbleSort, insertionSort } from "./utils/sortingAlgorithm";

//MUI stuff
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

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
    const { generatedArr, speed } = this.state;
    let ani = bubbleSort(generatedArr);
    let timeToShowAlert;
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
          arrBar[swapIndex[1]].style.backgroundColor = "cyan";
          arrBar[swapIndex[0]].style.backgroundColor = "cyan";
        }, speed / 4);
      }, i * speed);
    }
    setTimeout(() => {
      this.setState({ openSuccess: true });
    }, ani.length * speed);
  };

  doInsertionSort = () => {
    const { generatedArr, speed } = this.state;
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
            arrBar[swapIndex[1]].style.backgroundColor = "cyan";
            arrBar[swapIndex[0]].style.backgroundColor = "cyan";
          } else {
            arrBar[insertedValue[0]].style.backgroundColor = "cyan";
            arrBar[insertedValue[1]].style.backgroundColor = "cyan";
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
      openSuccess,
    } = this.state;
    return (
      <Fragment>
        <NavBar
          generateNewArr={this.generateNewArr}
          size={size}
          speed={speed}
          handleSizeChange={this.handleSizeChange}
          handleSpeedChange={this.handleSpeedChange}
          doBubbleSort={this.doBubbleSort}
          doInsertionSort={this.doInsertionSort}
        />
        <Paper elevation={3} className={classes.paper}>
          <div className={classes.snackBar}>
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              autoHideDuration={1500}
              onClose={this.handleClose}
            >
              <Alert onClose={this.handleClose} severity="info">
                New Array generated of size {size}
              </Alert>
            </Snackbar>
            <Snackbar
              // anchorOrigin={{ vertical, horizontal }}
              open={openSuccess}
              autoHideDuration={1500}
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
                bgcolor="cyan"
                key={index}
                id="arrBox"
                className="arrElement"
                style={{ height: `${ele}px` }}
              ></Box>
            ))}
          </Box>
        </Paper>
      </Fragment>
    );
  }
}

export default withStyles(styles)(SortingVisualizer);
