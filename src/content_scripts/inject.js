(/*window.onload = */function () {
    var tables = document.getElementsByClassName("list-table")
    
    var table = tables[0];
    var listItems = table.getElementsByClassName("list-item");
    
    var ri = 23;
    
    var row = listItems[ri].getElementsByClassName("list-table-data")[0];
    
    var titleList = table.getElementsByClassName("data title clearfix");
    var listedTitles = [];
    
    for (var d = 0; d < titleList.length; d++) {
        listedTitles.push(titleList[d].firstChild.toString());
    }
    
    var iRow = table.insertRow(ri+1);
    var cell1 = iRow.insertCell(0);
    var cell2 = iRow.insertCell(1);
    cell1.innerHTML = "N";
    
    cell2.innerHTML = listedTitles.length;
    // row.style.display = 'none';
    
    //ExchangeTitleRows(0, 1);
    InsertTitleLinks(row);
    
    function ExchangeTitleRows(first, second) {
        var tmp = listItems[first].innerHTML;
        listItems[first].innerHTML = listItems[second].innerHTML;
        listItems[second].innerHTML = tmp;
        
        // var iRow = table.insertRow(ri+1);
        // var cell1 = iRow.insertCell(0);
        // var cell2 = iRow.insertCell(1);
        // cell1.innerHTML = listItems.length;
    }
    
    function InsertTitleLinks(row) {
        
        var http = new XMLHttpRequest();
        var url = row.cells[2].getElementsByTagName('a')[0];
        
        var titles = [];
        GetRelatedTitiles(url, titles);
        
        function GetRelatedTitiles(stack, titles) {
            var stack = [];
            
            titles.push(url);
            stack.push(url);
            
            while (stack.length > 0) {
                // cell2.innerHTML = "!!!";
                
                var tUrl = stack.pop();
                http.open("GET", tUrl, false);
                http.send(null);
                
                // extract table with links
                var response = http.responseText;
                var tempDiv = document.createElement('div');
                tempDiv.innerHTML = response.replace(/<script(.|\s)*?\/script>/g, '');
                var tableR = tempDiv.getElementsByClassName('anime_detail_related_anime')[0];
                
                var len = tableR.rows.length;
                
                for (var i = 0; i < len; i++) {
                    var row1 = tableR.rows[i];
                    var type = row1.cells[0].textContent;
                    
                    if (type != "Adaptation:" && type != "Character:") { // do not parse these types because of interactions with other franchises
                        var titleLinks = row1.getElementsByTagName('a');
                
                        for (var j = 0; j < titleLinks.length; j++) {
                            var tl = titleLinks[j].toString();
                            
                            if (titles.indexOf(tl) == -1 && listedTitles.indexOf(tl) != -1) {
                                titles.push(tl);
                                
                                if (type != "Other:") { // others are only put in 'titles'
                                    stack.push(tl);
                                }
                            }
                        }
                    }
                }
            }
        }
        
        var rel = '';
        
        for (var i = 0; i < /*listedTitles*/titles.length; i++)
        {
            rel += /*listedTitles*/titles[i] + ', ';
        }
        
        cell2.innerHTML = rel;//http.responseText;
    }
})();
