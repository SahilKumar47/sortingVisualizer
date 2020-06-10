export let bubbleSort = (inputArr) => {
  let len = inputArr.length;
  let animations = [];
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      let animation = {};
      if (inputArr[j] > inputArr[j + 1]) {
        let tmp = inputArr[j];
        inputArr[j] = inputArr[j + 1];
        inputArr[j + 1] = tmp;
        animation.swapIndex = [j, j + 1];
        animation.values = [inputArr[j], inputArr[j + 1]];
        animation.swapped = true;
      } else {
        animation.swapIndex = [j, j + 1];
        animation.values = [inputArr[j], inputArr[j + 1]];
        animation.swapped = false;
      }
      animations.push(animation);
    }
  }
  return animations;
};

export const insertionSort = (arr) => {
  let animations = [];
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;
    let temp = arr[i];
    let animation = {};
    while (j >= 0 && arr[j] > temp) {
      let animation = {};
      animation.swapIndex = [j, j + 1];
      animation.values = [arr[j], arr[j]];
      animation.swapped = true;
      animations.push(animation);
      arr[j + 1] = arr[j];
      j--;
    }
    animation.insertedValue = [j + 1, i, temp];
    animations.push(animation);
    arr[j + 1] = temp;
  }
  return animations;
};
