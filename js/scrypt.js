const filterBox = document.querySelector('.filterItemContainer');
const createBtn = document.querySelector('.crateButton');
const clearBtn = document.querySelector('.clearButton');
const inputBtnNumber = document.querySelector('.boxNumber');
const inputBtnSize = document.querySelector('.boxSize');
const inputBtnRadius = document.querySelector('.boxRadius');
const outHexColorCode = document.querySelector('.outHexColorCode');

filterBox.addEventListener('click', onButtonClick);
createBtn.addEventListener('click', configFilterElements);
clearBtn.addEventListener('click', clearFilterEltments);
let backColor = '';

// filterConfig = {
//   number: inputBtnNumber.value,
//   size: elementSize,
//   radius: elementBorderRadius,
//   color: hexRandomColor,
// };

// createFilterElements(2, elementSize(80), elementBorderRadius(20), '#999999');
// createFilterElements(filterConfig);

function clearFilterEltments() {
  inputBtnNumber.value = 0;
  inputBtnSize.value = 0;
  inputBtnRadius.value = 0;
  filterBox.innerHTML = '';
  filterBox.style.backgroundColor = '';
  outHexColorCode.textContent = '0';
  outHexColorCode.style.color = '';
}

function configFilterElements() {
  const filterConfig = {
    number: inputBtnNumber.value,
    size: elementSize(inputBtnSize.value),
    radius: elementBorderRadius(inputBtnRadius.value),
    color: hexRandomColor,
  };

  createFilterElements(filterConfig);

  //   inputBtnNumber.value = 0;
  //   inputBtnSize.value = 0;
  //   inputBtnRadius.value = 0;
}

function createFilterElements({ number, size, radius, color }) {
  let contentPattern = '';
  for (let i = 1; i <= number; i += 1) {
    const randomColor = color();
    contentPattern += `<button class="filterElement" data-number="${i}" colorHEX = ${randomColor} style="background-color: ${randomColor}; 
	 ${size}; ${radius};">Btn №${i}</button>`;
  }
  //   console.log(contentPattern);
  //   filterBox.innerHTML = '';
  filterBox.insertAdjacentHTML('beforeend', contentPattern);
}

function hexRandomColor() {
  return `#${Math.round(Math.random() * 16000000000)
    .toString(16)
    .slice(1, 7)}`;
}

function elementBorderRadius(percentRadius) {
  return `border-radius: ${percentRadius}%;`;
}

function elementSize(size) {
  return `width: ${size}px; height:${size}px;`;
}

function onButtonClick(e) {
  const isButton = e.target.classList.contains('filterElement');
  const activeButtonOld = document.querySelector('.isActive');
  const activeButtonNew = e.target;
  const currentColor = e.target.style.backgroundColor;
  const realButtonColor = e.target.getAttribute('colorhex');

  if (!isButton) {
    return;
  }

  if (activeButtonOld === activeButtonNew) {
    //  console.log(activeButtonOld === activeButtonNew);
    return;
  }

  if (activeButtonOld) {
    activeButtonOld.classList.remove('isActive');
    activeButtonOld.style.backgroundColor = backColor;
    activeButtonOld.style.outline = 'none';
  }

  backColor = currentColor;
  activeButtonNew.classList.add('isActive');
  activeButtonNew.style.outline = `3px solid ${hexRandomColor()}`;
  activeButtonNew.style.backgroundColor = hexRandomColor();
  filterBox.style.backgroundColor = backColor;
  outHexColorCode.textContent = `hex ${realButtonColor}, ${backColor}`;
  outHexColorCode.style.color = realButtonColor;
  console.log(
    `Нажата кнопка №${e.target.dataset.number}, with color hex ${realButtonColor}, and ${backColor}`,
  );
}
