
    const {ipcRenderer} = require('electron');
    // const {remote} = require('electron');
    const path = require("path");

    // const { PosPrinter } = remote.require("electron-pos-printer");

    // let printers = webContents.getPrinters(); //list the printers
    // console.log(printers);
    // pos-printer

    $('#btn-print-pos').click(function(){
      // array to keep table data from transaction
      var myTableArray = [];
      // looping to get data from transaction table to /* myTableArray */
      $("table#invoicetrnxtable tr").each(function() {
        var arrayOfThisRow = [];
        var tableData = $(this).find('td');
        if (tableData.length > 0) {
            tableData.each(function() { arrayOfThisRow.push($(this).text()); });
            myTableArray.push(arrayOfThisRow);
        }
      });
      console.log(myTableArray);
      // lllll
      var getsumt = document.getElementById("sum-items").innerHTML;
      var getsumq = document.getElementById("sum-price").innerHTML;

      // ;llll
      var poscompany = document.getElementById('cname').innerHTML;
      var posloc = document.getElementById('loc').innerHTML;
      var postel = document.getElementById('tel').innerHTML;
      var posmail = document.getElementById('mail').innerHTML;
      var pospost = document.getElementById('post').innerHTML;
      var postax = document.getElementById('tax').innerHTML;
      var totalp = getsumt;
      var tqy = getsumq;
      var rec = document.getElementById('in_no').innerHTML;
      var dat = document.getElementById('in_date').innerHTML;
      var tim = document.getElementById('in_time').innerHTML;
      // NetSales
      var posnet = parseFloat(totalp) - parseFloat(postax);
      // var rec = document.getElementById('in_no').innerHTML;
    // printer data

      function printData() {
      let data = [
            {
              type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
              value: poscompany,
              style: `text-align:center; font-size:16px; margin:0px 0px 0px 0px; width:100%;`,
              css: {"font-weight": "30"}

            },
            {
              type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
              value: posloc,
              style: `text-align:center; font-size:16px; margin:0px 0px 0px 0px; width:100%;`,
              css: {"font-weight": "30"}


            },
            {
              type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
              value: postel,
              style: `text-align:center; font-size:16px; margin:0px 0px 0px 0px; width:100%;`,
              css: {"font-weight": "30"}

            },
            {
              type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
              value: posmail,
              style: `text-align:center; font-size:16px; margin:0px 0px 0px 0px; width:100%;`,
              css: {"font-weight": "30"}

            },
            {
                type: "text",
                value: pospost,
                style: "text-align:center; font-size:16px; margin:0px 0px 0px 0px; width:100%;",
                css: {"font-weight": "30"}
            },
            {
              type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
              value: dat,
              style: `text-align:center; font-size:16px; margin:20px 0px 0px 0px; width:100%;`,
              css: {"font-weight": "30"}

            },
            {
              type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
              value: tim,
              style: `text-align:center; font-size:16px; margin:0px 0px 0px 0px;`,
              css: {"font-weight": "30"}

            },
            {
              type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
              value: 'Reciept: '+rec,
              style: `text-align:center; font-weight:300; font-size:18px; width:100%; margin-top:10px;`
              // css: {"font-weight": "300","font-size": "18px","border":"1px solid"}

            },
            {
             type: 'table',
             style: 'text-align: center; margin-top: 20px;',
             tableHeader: ['Qty', 'Unit', 'Product' ,'Payment', 'Total'],
             tableBody: myTableArray,
             tableFooter: ['T.Qty:',tqy,' -','Total:',totalp],
                 // tableHeaderStyle: '',
                 // custom style for the table body
                 tableBodyStyle: 'margin: 10px;',
                 // custom style for the table footer
                 tableFooterStyle: 'margin-top:20px; background-color: #000; color: white;',
            },
            {
              type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
              style: `text-align:center; font-weight:100; font-size:18px`,
              value: ['3% Vat: &#8373;'+postax +'  '+ '</br> Netsales: &#8373;'+posnet],
              style: `text-align:center;  font-weight:100; font-size:18px; margin:20px 0 10px 0; width:100%;`,
              css: {"font-weight": "100","font-size": "18px", "text-align":"center","border":"1px solid"}

            },
            {
              type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
              value: "Finacord(TM) &copy; all rights reserved",
              style: `text-align:center; width:100%; margin-left:0px;`,
              css: {"font-weight": "30","font-size": "12px","margin-top":"10px"}
            },
          ]
        // sending data to ipcmain (index.js to render to pos-printer)
        ipcRenderer.send('print', JSON.stringify(data));
      }
      // calling print-pos function
    printData();
  });
