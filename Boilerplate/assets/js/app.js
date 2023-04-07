import Table from './table.js';
import ModalWindow from './modalWindow.js';


/**
 * Create Form element based on incoming object properties
 */
const createFormFromObject = (data) => {
    const form = document.createElement('form');
    Object.keys(data).forEach(key => {
        let div = document.createElement('div');
        let label = document.createElement('label');
        label.textContent = key;

        let input = document.createElement('input');
        input.type = 'text';
        input.value = `${data[key]}`;
        input.setAttribute('data-key', key)

        div.append(label);
        div.append(input);
        form.append(div);
    })

    return form;
}   

/**
 * Update the table and data array with values from generated form
 */
const updateOnSave = (modal, tr, rowData) => {
    const modalBody = modal.getBody();
    const cells = Array.from(tr.querySelectorAll('td'));

    cells.forEach(cell => {
        const key = cell.getAttribute('data-key');
        const inputSelector = `input[data-key="${key}"]`;
        const value = modalBody.querySelector(inputSelector).value;

        cell.textContent = value;
        rowData[key] = value;
    })

    modal.close();
}

/**
 * function to be executed on table row press
 */
const onRowClick = (modal, data) => event => {
    const target = event.target;
    const tr = target.nodeName === 'tr' ? target : target.closest('tr');

    if(!tr)
        return;

    const rowIndex = tr.getAttribute('data-index');
    const rowData = data[rowIndex];
  
    const form = createFormFromObject(rowData);
    modal.setBody(form);

    const saveButton = modal.getContent().querySelector('.modal-footer .btn-primary');

    const onSave = () => {
        updateOnSave(modal, tr, rowData);
        saveButton.removeEventListener('click', onSave);
    }

    saveButton.addEventListener('click', onSave);

    modal.show();

}

/**
 *  init form
 */
function app(data){
    const modal = new ModalWindow('rowModal');
    new Table(data, 'tableContainer', onRowClick(modal, data) )
}


/**
 * Fetch the data for the table 
 */
fetch('https://raw.githubusercontent.com/vega/vega/master/docs/data/movies.json')
.then(response => response.json())
.then(json => app(json));