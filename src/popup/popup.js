function Franchise() {
    var tables = document.getElementsByClassName("list-table")
    var row = tables[0].insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "NEW CELL1";
    cell2.innerHTML = "NEW CELL2";
}