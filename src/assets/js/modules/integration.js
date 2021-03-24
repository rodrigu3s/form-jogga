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


const createClient = ( name, email, password, account_name, account_description, campaign_name,campaign_description, key_adword, origin, budget, phonetrack, mailings) =>{
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
        mailings: mailings

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
    const mailings = evento.target.querySelector('[data-mailings]').value

    createClient(name, email, password, account_name, account_description, campaign_name, campaign_description, key_adword, origin, budget, phonetrack, mailings  )
})
  

  
  
  
  
  
 
  