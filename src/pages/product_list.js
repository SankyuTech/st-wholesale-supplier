let net = require('net');
const axios = require('axios').default;

function loadInitialData(){
    let supplier_id = sessionStorage.getItem("supplier_id");

    const url = "https://st-w.sankyutech.com.my/api/products";
    const detail ={
        supplier_id:supplier_id
    }


    axios({
            
        method: 'post',
        url: url,
        data:detail

    }).then(function (response){

        let products = response.data

        console.log(products);

        var table = document.getElementById('tbody')

        for (var i = 0; i < products.length; i++){
            var row = `<tr>
                          <td>
                            <div class="d-flex px-2 py-1">
                              <div>
                                ${i + 1}
                              </div>
                              <div class="d-flex flex-column justify-content-center">
          
                               
                              </div>
                            </div>
                          </td>
                          <td>
                            <p class="text-xs font-weight-bold mb-0">${products[i].sku}</p>
                          </td>
                          <td class="align-middle text-center text-sm">
                            <p class="text-xs text-secondary mb-0">${products[i].category_name} (${products[i].design_name})</p>
                          </td>
     
                          <td class="align-middle" style="text-align: center;">
                             <span class="badge badge-sm bg-gradient-success">
                                <a href="#" onclick="printLabel(${products[i].id})" class="text-white">
                                  Print Label
                                </a>
                            </span>
                          </td>
                    </tr>`


                      
            table.innerHTML += row
        }

    }).catch(err=>console.log(err))

}


function printLabel(id){

    let supplier_id = sessionStorage.getItem("supplier_id");
    let printer_ip = sessionStorage.getItem("printer_ip");

    const url = "https://st-w.sankyutech.com.my/api/get-print-sku";
    const detail = {
        supplier_id:supplier_id,
        product_id:id
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

          alert('Successfully print label');

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


    
}
