
function debugLog(...args) {
    if (devMode) {
        console.log(...args);
    }
}
const devMode = true;


const drawViz = (data) => {
  console.log('data', data);
  // Clear the body
  document.body.innerHTML = '';

  // Return if there's no data
  if (!data.tables || !data.tables.DEFAULT || data.tables.DEFAULT.length === 0) {
    return;
  }

  // Get the dimension config id, field id and name.
  const dimConfigId = 'dim';
  console.log('data.fields', data.fields);
  console.log('data.fields[dimConfigId]', data.fields[dimConfigId]);
  const dimField = data.fields[dimConfigId][0];
  const dimFieldId = dimField.id;
  const dimName = dimField.name;

  // Create a header for the dimension name and clear button
  const header = document.createElement('div');
  header.id = 'header';

  const dimNameSpan = document.createElement('span');
  dimNameSpan.textContent = dimName;
  header.appendChild(dimNameSpan);

  const clearButton = document.createElement('div');
  clearButton.id = 'clear-button';
  clearButton.innerHTML = '&#x1F58D;'; // Eraser icon
  header.appendChild(clearButton);

  clearButton.addEventListener('click', () => {
    dscc.sendInteraction('filter', 'FILTER', { concepts: [dimFieldId], values: [] });
  });

  document.body.appendChild(header);


  // Create a container for the items
  const container = document.createElement('div');
  container.id = 'container';
  document.body.appendChild(container);

  // Get style settings
  const layout = data.style.layoutSelect ? data.style.layoutSelect.value : 'AUTO';
  const fill = data.style.fillLeftToRight ? data.style.fillLeftToRight.value : 'L2RTD';
  const requireCtrlToMultiSelect = data.style.requireCtrlToMultiSelect ? data.style.requireCtrlToMultiSelect.value : false;

  // Apply layout styles
  container.style.display = 'flex';
  container.style.flexWrap = 'wrap';
  if (layout === 'FORCE_COL1') {
    container.style.flexDirection = 'column';
  } else if (layout === 'FORCE_ROW1') {
    container.style.flexDirection = 'row';
  } else { // AUTO
    if (fill === 'T2BLR') {
      container.style.flexDirection = 'column';
    } else {
      container.style.flexDirection = 'row';
    }
  }

  // Get selected values
  let selectedValues = [];
  if (data.interactions.filter && data.interactions.filter.value && data.interactions.filter.value.values) {
    selectedValues = data.interactions.filter.value.values.map(v => v[0]);
  }

  // Draw items
  data.tables.DEFAULT.forEach(row => {
    if (!row) return; // Skip if row is null or undefined

    const item = document.createElement('div');
    item.className = 'item';
    const dimValue = row[dimConfigId][0];
    item.textContent = dimValue === null ? '(empty)' : dimValue;

    // Set selection state
    if (selectedValues.includes(dimValue)) {
      item.classList.add('selected');
    } else {
      item.classList.add('not-selected');
    }

    // Handle click
    item.addEventListener('click', (event) => {
      let newSelectedValues;

      const isSelected = selectedValues.includes(dimValue);

      if (requireCtrlToMultiSelect) {
        if (event.ctrlKey) {
          // Toggle selection for the clicked item
          if (isSelected) {
            newSelectedValues = selectedValues.filter(v => v !== dimValue);
          } else {
            newSelectedValues = [...selectedValues, dimValue];
          }
        } else {
          // Select only the clicked item
          if (isSelected && selectedValues.length === 1) {
            newSelectedValues = [];
          } else {
            newSelectedValues = [dimValue];
          }
        }
      } else {
        // Toggle selection for the clicked item
        if (isSelected) {
          newSelectedValues = selectedValues.filter(v => v !== dimValue);
        } else {
          newSelectedValues = [...selectedValues, dimValue];
        }
      }

      const newFilter = { concepts: [dimFieldId], values: newSelectedValues.map(v => [v]) };
      dscc.sendInteraction('filter', 'FILTER', newFilter);
    });

    container.appendChild(item);
  });
};

dscc.subscribeToData(drawViz, {
  transform: dscc.objectTransform
});