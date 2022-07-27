
const axios = require('axios').default;

function login(){

    document.getElementById("login_button").disabled = true;

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(email && password){

        const url = "https://www.st-wholesale.sankyutech.com.my/api/login";
        const detail ={
            email:email,
            password:password
        }

        axios({
            method: 'post',
            url: url,
            data:detail

        }).then(function (response){

            sessionStorage.setItem("email", response.data.user.email);
            sessionStorage.setItem("name", response.data.user.name);

            if(response.data.status == 1){
                let supplier_id = response.data.user.supplier_id;
                sessionStorage.setItem("supplier_id", supplier_id);

                // const url = "https://st-wholesale.sankyutech.com.my/api/printer-settings";

                // const detail ={
                //     supplier_id:supplier_id
                // }

                // axios({
                //     method: 'post',
                //     url: url,
                //     data:detail

                // }).then(function (response){
            
                //     let printerIp = response.data.printer_ip;

                //     sessionStorage.setItem("printer_ip", printerIp);


                // }).catch(err=>console.log(err))
                
                window.location.href = "./pages/product_list.html";

            }else{

                document.getElementById("invalid_credential").style.display = "block";
                document.getElementById("danger_alert").style.display = "none";
            }

            

        }).catch(err=>console.log(err))


    }else{
        document.getElementById("invalid_credential").style.display = "none";
        document.getElementById("danger_alert").style.display = "block";
    }


    document.getElementById("login_button").disabled = false;

}