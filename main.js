function debugLog(...args) {
    if (devMode) {
        console.log(...args);
    }
}
const devMode = false;


const drawViz = (data) => {
  debugLog('data', data);

  // Remove previous custom CSS
  const existingCustomCSS = document.getElementById('qlikpicker-custom-css');
  if (existingCustomCSS) {
    existingCustomCSS.remove();
  }

  // Inject custom CSS
  const customCSS = data.style.advcss ? data.style.advcss.value : false;
  if (customCSS) {
    const style = document.createElement('style');
    style.id = 'qlikpicker-custom-css';
    style.innerHTML = customCSS;
    document.head.appendChild(style);
  }

  // Clear the body
  document.body.innerHTML = '';

  // Return if there's no data
  if (!data.tables || !data.tables.DEFAULT || data.tables.DEFAULT.length === 0) {
    return;
  }

  // Get the dimension config id, field id and name.
  const dimConfigId = 'dim';
  debugLog('data.fields', data.fields);
  debugLog('data.fields[dimConfigId]', data.fields[dimConfigId]);
  const dimField = data.fields[dimConfigId][0];
  const dimFieldId = dimField.id;
  const dimName = dimField.name;

  // Create a header for the dimension name and clear button
  const header = document.createElement('div');
  header.id = 'header';
  header.classList.add('qlikpicker-header');

  const dimNameSpan = document.createElement('span');
  dimNameSpan.textContent = dimName;
  dimNameSpan.classList.add('qlikpicker-dim-name');
  header.appendChild(dimNameSpan);

  const clearButton = document.createElement('div');
  clearButton.id = 'clear-button';
  clearButton.classList.add('qlikpicker-clear-button');
  clearButton.innerHTML = '&#x1F5D1;'; // Wastebasket icon (I can't find a good one)
  header.appendChild(clearButton);

  clearButton.addEventListener('click', () => {
    dscc.sendInteraction('filter', 'FILTER', { concepts: [dimFieldId], values: [] });
  });

  document.body.appendChild(header);


  // Create a container for the items
  const container = document.createElement('div');
  container.id = 'container';
  container.classList.add('qlikpicker-container');
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
  if (data.interactions && data.interactions.filter) {
    const filterInteraction = data.interactions.filter;
    debugLog('Inspecting filter interaction object:', JSON.stringify(filterInteraction, null, 2));

    // Path from user's log: filter.value.data.values
    if (filterInteraction.value && filterInteraction.value.data && filterInteraction.value.data.values) {
      selectedValues = filterInteraction.value.data.values.map(v => v[0]);
    }
    // Standard path from docs: filter.value.values
    else if (filterInteraction.value && filterInteraction.value.values) {
      selectedValues = filterInteraction.value.values.map(v => v[0]);
    }
    // Another fallback: filter.values
    else if (filterInteraction.values) {
      selectedValues = filterInteraction.values.map(v => v[0]);
    }
  }
  debugLog('Selected values:', selectedValues);

  // Draw items
  data.tables.DEFAULT.forEach(row => {
    if (!row) return; // Skip if row is null or undefined

    const item = document.createElement('div');
    item.className = 'item qlikpicker-item';
    const dimValue = row[dimConfigId][0];
    item.textContent = dimValue === null ? '(empty)' : dimValue;
    debugLog('Dimension value:', dimValue);

    // Set selection state
    if (selectedValues.map(String).includes(String(dimValue))) {
      item.classList.add('selected');
    } else {
      item.classList.add('not-selected');
    }

    // Handle click
    item.addEventListener('click', (event) => {
      const isSelected = selectedValues.map(String).includes(String(dimValue));
      let newSelectedValues;

      // Default behavior: toggle selection.
      // This is used if multi-select does not require CTRL, or if CTRL is pressed.
      const toggle = !requireCtrlToMultiSelect || event.ctrlKey;

      if (toggle) {
        if (isSelected) {
          newSelectedValues = selectedValues.filter(v => String(v) !== String(dimValue));
        } else {
          newSelectedValues = [...selectedValues, dimValue];
        }
      } else {
        // If multi-select requires CTRL and it's not pressed, this is a single-select action.
        // If it's already selected and it's the only one, deselect it. Otherwise, select just this one.
        if (isSelected && selectedValues.length === 1) {
          newSelectedValues = [];
        } else {
          newSelectedValues = [dimValue];
        }
      }

      debugLog('New selected values:', newSelectedValues);

      const newFilter = { concepts: [dimFieldId], values: newSelectedValues.map(v => [v]) };
      dscc.sendInteraction('filter', 'FILTER', newFilter);
    });

    container.appendChild(item);
  });
};

dscc.subscribeToData(drawViz, {
  transform: dscc.objectTransform
});