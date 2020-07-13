//Bubble Sort

export let bubbleSort = (arr) => {
  let len = arr.length;
  let animations = [];
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      let animation = {};
      if (arr[j] > arr[j + 1]) {
        let tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
        animation.swapIndex = [j, j + 1];
        animation.values = [arr[j], arr[j + 1]];
        animation.swapped = true;
      } else {
        animation.swapIndex = [j, j + 1];
        animation.values = [arr[j], arr[j + 1]];
        animation.swapped = false;
      }
      animations.push(animation);
    }
  }
  return animations;
};

// Insertion Sort

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

// Selection Sort

export const selectionSort = (arr) => {
  let len = arr.length;
  let animations = [];
  for (let i = 0; i < len; i++) {
    let animation = {};
    let min = i;
    for (let j = i + 1; j < len; j++) {
      animation = {};
      animation.min = min;
      animation.comparisonIndex = [min, j];
      if (arr[min] > arr[j]) {
        min = j;
        animation.updatedMin = j;
      }
      animations.push(animation);
    }
    if (min !== i) {
      animation = {};
      let tmp = arr[i];
      arr[i] = arr[min];
      arr[min] = tmp;
      animation.swapped = true;
      animation.swapIndex = [min, i];
      animation.swapValues = [arr[min], arr[i]];
    }
    animations.push(animation);
  }
  return animations;
};

// Merge Sort

export function mergeSort(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    let animation = {};
    animation.compare = [i, j];
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animation.value = [k, auxiliaryArray[i]];
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animation.value = [k, auxiliaryArray[j]];
      mainArray[k++] = auxiliaryArray[j++];
    }
    animations.push(animation);
  }
  while (i <= middleIdx) {
    let animation = {};
    animation.compare = [i, middleIdx];
    animation.value = [k, auxiliaryArray[i]];
    mainArray[k++] = auxiliaryArray[i++];
    animations.push(animation);
  }
  while (j <= endIdx) {
    let animation = {};
    animation.compare = [j, endIdx];
    animation.value = [k, auxiliaryArray[j]];
    mainArray[k++] = auxiliaryArray[j++];
    animations.push(animation);
  }
}
