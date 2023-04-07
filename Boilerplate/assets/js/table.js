export default class Table {

    constructor(data, containerId, onRowClick) {

        // Select HTML container where to load the table
        const container = document.querySelector(`#${containerId}`);

        const table = document.createElement('table');

        const rowData = Object.keys(data[0]);
        const tableHead = this.createTableHead(rowData);
        table.append(tableHead);

        const tableBody = this.createTableBody(data);

        if(onRowClick)
            tableBody.addEventListener('click', onRowClick)

        table.append(tableBody);
        container.append(table);
    }

    /**
     * Generate table head 
     * */
    createTableHead(rowData) {
        const tableHead = document.createElement('thead');
        const tableHeadRow = document.createElement('tr');
        rowData.forEach(key => {
            let th = document.createElement('th');
            th.textContent = key;

            tableHeadRow.append(th);
        })

        tableHead.append(tableHeadRow);
        return tableHead;
    }

    
    /**
     * Generate table body
     */
    createTableBody(data) {
        const tableBody = document.createElement('tbody');

        data.forEach((element, index) => {
            let tr = document.createElement('tr');
            tr.setAttribute('data-index', index);

            Object.keys(element).forEach(key => {
                let td = document.createElement('td');
                td.setAttribute('data-key', `${key}`)
                let text = document.createTextNode(element[key]);
                td.append(text);

                tr.append(td);
            })

            tableBody.append(tr);
        })

        return tableBody;
    }
}