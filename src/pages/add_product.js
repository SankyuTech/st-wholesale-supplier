
let net = require('net');
const axios = require('axios').default;
var $ = require( "jquery" );

function fetchData(){

    let supplier_id = sessionStorage.getItem("supplier_id");
    let printer_ip = sessionStorage.getItem("printer_ip");

    const url = "https://st-w.sankyutech.com.my/api/products/add/data";
    const detail ={
        supplier_id:supplier_id
    }


    axios({
            
        method: 'post',
        url: url,
        data:detail

    }).then(function (response){

    // console.log(response.data);
    let factories = response.data.factories;
    let categories = response.data.categories;
    let designs = response.data.designs;
    let purities = response.data.purities;

    // factory dropdown
    let dropdown_factory = $('#dropdown-factory');

    dropdown_factory.empty();
    dropdown_factory.prop('selectedIndex', 0);
    $.each(factories, function (key, entry) {
        dropdown_factory.append($('<option></option>').attr('value', entry.id).text(entry.name));
      })

    // factory categories
    let dropdown_categories = $('#dropdown-categories');

    dropdown_categories.empty();
    dropdown_categories.prop('selectedIndex', 0);
    $.each(categories, function (key, entry) {
        dropdown_categories.append($('<option></option>').attr('value', entry.id).text(entry.name));
      })


    // factory designs
    let dropdown_designs = $('#dropdown-designs');

    dropdown_designs.empty();
    dropdown_designs.prop('selectedIndex', 0);
    $.each(designs, function (key, entry) {
        dropdown_designs.append($('<option></option>').attr('value', entry.id).text(entry.name));
      })

    // factory purities
    let dropdown_purities = $('#dropdown-purities');

    dropdown_purities.empty();
    dropdown_purities.prop('selectedIndex', 0);
    $.each(purities, function (key, entry) {
        dropdown_purities.append($('<option></option>').attr('value', entry.id).text(entry.name));
      })


    }).catch(err=>console.log(err))

}

function addProduct(){

    let supplier_id = sessionStorage.getItem("supplier_id");

    let wm_capital_type;
    let wm_sales_type;

    var capital_radio = document.getElementsByName('wm_capital');
    
    for(i = 0; i < capital_radio.length; i++) {
        if(capital_radio[i].checked)
        wm_capital_type = capital_radio[i].value
    }

    var sales_radio = document.getElementsByName('wm_sales');
    
    for(i = 0; i < sales_radio.length; i++) {
        if(sales_radio[i].checked)
        wm_sales_type = sales_radio[i].value
    }

    var factory = document.getElementById("dropdown-factory").value;
    var type = document.getElementById("type").value;
    var weight = document.getElementById("weight").value;
    var category = document.getElementById("dropdown-categories").value;
    var designs = document.getElementById("dropdown-designs").value;
    var purities = document.getElementById("dropdown-purities").value;
    var wm_capital_amount = document.getElementById("capital_amount").value;
    var wm_sales_amont = document.getElementById("sales-amount").value;

    if(factory && type && weight && category && designs && purities && wm_capital_amount && wm_sales_amont && wm_capital_type && wm_sales_type){


        const url = "https://st-w.sankyutech.com.my/api/products/add";

        const detail ={
            category:category,
            design:designs,
            purity:purities,
            weight:weight,
            workmanship_capital:wm_capital_type,
            upah_modal_value:wm_capital_amount,
            workmanship_price:wm_sales_type,
            upah_jualan_value:wm_sales_amont,
            type:type,
            factory:factory,
            supplier_id:supplier_id,
        }

        axios({
                
            method: 'post',
            url: url,
            data:detail

        }).then(function (response){

    
            let supplier_id = sessionStorage.getItem("supplier_id");
            let printer_ip = sessionStorage.getItem("printer_ip");

            const url = "https://st-w.sankyutech.com.my/api/get-print-sku";
            const detail = {
                supplier_id:supplier_id,
                product_id:response.data
            }

            axios({
                    
                method: 'post',
                url: url,
                data:detail

            }).then(function (response){

                let zpl = response.data

                const HOST = printer_ip;
                const PORT = 9100;

                let client = net.connect(PORT, HOST, ()=>{
                  console.log('Printing labels...');
                  client.write(zpl);
                  client.end();

                });

                client.on('data', (data)=>{
                  console.log(data.toString());
                  console.log('socket.bytesRead is ' + client.bytesRead);
                  client.end();
                });

                client.on('end', ()=>{
                  console.log('client disconnected');
                });



            }).catch(err=>console.log(err))



        }).catch(err=>console.log(err))

        
    }else{

        alert('Please fill up all field');
    }


}