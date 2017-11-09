(function () {
    var tables = document.getElementsByClassName("list-table")
    
    var table = tables[0];
    var listItems = table.getElementsByClassName("list-item");
    
    var ri = 21;
    
    var row = listItems[ri].getElementsByClassName("list-table-data")[0];
    // row.style.display = 'none';
    
    // var http = new XMLHttpRequest();
    // var url = "https://myanimelist.net/api/account/verify_credentials.xml";
    // var params = "u=radimir_kun:war40war";
    // http.open("GET", url+"?"+params, false);
    // http.send( null );
    
    // var iRow = table.insertRow(ri+1);
    // var cell1 = iRow.insertCell(0);
    // var cell2 = iRow.insertCell(1);
    // cell1.innerHTML = listItems.length;
    //iRow = listItems[ri];
    
    // var tmp = listItems[0].innerHTML;
    // listItems[0].innerHTML = listItems[1].innerHTML;
    // listItems[1].innerHTML = tmp;
    
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
        
        var iRow = table.insertRow(ri+1);
        var cell1 = iRow.insertCell(0);
        var cell2 = iRow.insertCell(1);
        cell1.innerHTML = "N";
        //https://myanimelist.net/
        
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
                
                /// extract links
                var response = http.responseText;
                var tempDiv = document.createElement('div');
                tempDiv.innerHTML = response.replace(/<script(.|\s)*?\/script>/g, '');
                var rels = tempDiv.getElementsByClassName('anime_detail_related_anime')[0];
                
                for (var i = 0; i < rels.rows.length; i++)
                {
                    var row1 = rels.rows[i];
                    var type = row1.cells[0].textContent;
                    
                    if (type != "Adaptation:" && type != "Character:")
                    {
                        var titleLinks = row1.getElementsByTagName('a');
                
                        for (var j = 0; j < titleLinks.length; j++) {
                            var tl = titleLinks[j].toString();
                            
                            if (titles.indexOf(tl) == -1) {
                                titles.push(tl);
                                stack.push(tl);
                            }
                        }
                    }
                }
            }
        }
        
        var rel = '';
        
        for (var i = 0; i < titles.length; i++)
        {
            rel += titles[i] + ', ';
        }
        
        cell2.innerHTML = rel;//http.responseText;
    }
})();