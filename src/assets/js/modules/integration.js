// Valida Número de Telefone
const length = 15;
$('#phonetrack').mask('(00) 0000-00009');
$('#phonetrack').on('blur', event => {
const { value } = event.target;
if (value.length === length) {
    $('#phonetrack').mask('(00) 00000-0009');
} else {
    $('#phonetrack').mask('(00) 0000-00009');
}
});


//Olho mágico Senha
$( "#eye" ).mousedown(function() {
    $("#password").attr("type", "text");
  });
  
  $( "#eye" ).mouseup(function() {
    $("#password").attr("type", "password");
  });


// Valida Formulário
$( "#form-web" ).validate({
    rules: {
        mandatory: {
            required: true,
            minlength: 3
        },
        email: {
            required: true,
            email: true
        },
        phonetrack:{
            required: true
        },
        account_name: {
            required: true,
            minlength: 3
        },
        account_description:{
            required: true,
            minlength: 3
        },
        campaign_name:{
            required: true,
            minlength: 3
        },
        campaign_description: {
            required: true,
            minlength: 3
        },
        key_adword: {
            required: true,
            minlength: 3
        },
        budget: {
            required: true,
            minlength: 3
        },
        mailings:{
            required: true,
            minlength: 3
        }
    },
    messages:{
        mandatory: {
            required: "Campo Obrigatório",
            minlength: "Nome deve Conter no Minimo 3 Letras"
        },
        email: {
            required: "Campo Obrigatório",
            email: "Email não é Válido"
        },
        phonetrack:{
            required: "Campo Obrigatório"
        }
    }
  });


  

// function addTable(){
//     document.getElementById("addform").innerHTML = `
//     <div class="form-row" id="form-row">
//         <div class="form-group col-md-6" >
//             <label for="mailings-name">Nome</label>
//             <input type="text" class="form-control" id="mailings-name" name="mailings-name" data-mailings>
//         </div>
//         <div class="form-group col-md-6">
//             <label for="mailings-email">Email</label>
//             <input type="email" class="form-control" id="mailings-email" name="mailings-email" data-mailings>
//         </div>
//     </div>      
//     ` 

// }

var maxForm = 0;

$("#toAdd").click(function(){
    maxForm++
    if(maxForm <= 2){
        $("#addform").append( `
        <div class="form-row" id="form-row">
                <div class="form-group col-md-6" >
                  <label for="mailings_name">Nome</label>
                  <input type="text" class="form-control" id="mailings_name" name="mailings_name" data-mailings-name${maxForm}>
                </div>
                <div class="form-group col-md-6">
                  <label for="mailings_email">Email</label>
                  <input type="email" class="form-control" id="mailings_email" name="mailings_email" data-mailings-email${maxForm} >
                </div>
        </div>
        `);
    }else{
    }
});














const createClient = ( name, email, password, account_name, account_description, campaign_name,campaign_description, key_adword, origin, budget, phonetrack, mailings_name, mailings_email ) =>{
    return fetch(`http://localhost:3000/profile`,{
        method: 'POST',
        headers:{
            'Accept': 'application/json',  
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
        name: name,
        email: email,
        login: email,
        password: password,
        account_name: account_name,
        account_description: account_description,
        campaign_name: campaign_name,
        campaign_description: campaign_description,
        key_adword: key_adword,
        origin: origin,
        budget: budget,
        phonetrack: phonetrack,
        mailings: [{ mailings_name, mailings_email }]

        })
    })

    .then( resposta=>{
        return resposta.body
    })
}

const formulario = document.querySelector("[data-form]")
formulario.addEventListener('submit', (evento)=>{
    evento.preventDefault()
    const name = evento.target.querySelector('[data-name]').value
    const email = evento.target.querySelector('[data-email]').value
    const password = evento.target.querySelector('[data-password]').value
    const account_name = evento.target.querySelector('[data-account_name]').value
    const account_description = evento.target.querySelector('[data-account_description]').value
    const campaign_name = evento.target.querySelector('[data-campaign_name]').value
    const campaign_description = evento.target.querySelector('[data-campaign_description]').value
    const key_adword = evento.target.querySelector('[data-key_adword]').value
    const origin = evento.target.querySelector('[data-origin]').value
    const budget = evento.target.querySelector('[data-budget]').value
    const phonetrack = evento.target.querySelector('[data-phonetrack]').value
    const mailings_name = evento.target.querySelector('[data-mailings-name]').value
    const mailings_email = evento.target.querySelector('[data-mailings-email]').value

    createClient(name, email, password, account_name, account_description, campaign_name, campaign_description, key_adword, origin, budget, phonetrack, mailings_name, mailings_email  )
})
  

  
  
  
  
  
 
  