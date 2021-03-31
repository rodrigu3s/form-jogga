const QTD_MAX_MAILINGS = [1]
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
// $( "#form" ).validate({
//     rules: {
//         mandatory: {
//             required: true,
//             minlength: 3
//         },
//         email: {
//             required: true,
//             email: true
//         },
//         phonetrack:{
//             required: true
//         },
//         account_name: {
//             required: true,
//             minlength: 3
//         },
//         account_description:{
//             required: true,
//             minlength: 3
//         },
//         campaign_name:{
//             required: true,
//             minlength: 3
//         },
//         campaign_description: {
//             required: true,
//             minlength: 3
//         },
//         key_adword: {
//             required: true,
//             minlength: 3
//         },
//         budget: {
//             required: true,
//             minlength: 3
//         },
//         mailings:{
//             required: true,
//             minlength: 3
//         }
//     },
//     messages:{
//         mandatory: {
//             required: "Campo Obrigatório",
//             minlength: "Nome deve Conter no Minimo 3 Letras"
//         },
//         email: {
//             required: "Campo Obrigatório",
//             email: "Email não é Válido"
//         },
//         phonetrack:{
//             required: "Campo Obrigatório"
//         }
//     }
//   });


var maxForm = 2;
var contId = 2;
var cont = 1;
$("#toAdd").on("click", function() {
    QTD_MAX_MAILINGS.push(contId)
    if(maxForm <= QTD_MAX_MAILINGS.length){
        $("#addform").append( `
        <div class="form-row align-items-center" id="form-row${cont}">
                <div class="form-group col-md-6" >
                  <label for="mailings_name">Nome</label>
                  <input type="text" class="form-control mailings_name" name="mailings_name-${contId}" >
                </div>
                <div class="form-group col-md-5">
                  <label for="mailings_email">Email</label>
                  <input type="email" class="form-control mailings_email" name="mailings_email-${contId}" >
                </div>
                <button type="button" id="${cont}" class="btn-delete btn btn-danger">Excluir</button>
        </div>
        `);
        maxForm++
        contId++
        cont ++
    }else{
    }

});


$( "form" ).on( "click", ".btn-delete", function() {
    var button_id = $( this ).attr("id");
    $("#form-row"+ button_id).remove()
    contId+2
    maxForm--
});



const createClient = (options) => {
    return fetch(`http://localhost:3000/profile`,{
        method: 'POST',
        headers:{
            'Accept': 'application/json',  
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(options)
    })

    .then( resposta=>{
        return resposta.body
    })
}


document.addEventListener('submit', (event)=>{
    event.preventDefault()
    
    const formEntries = new FormData(event.target).entries()
    let formObject = {}
    Array.from(formEntries).forEach(entry =>{ 
        formObject = {...formObject, [entry[0]]: entry[1] }
    })

    formObject.phonetrack = formObject.phonetrack.replace(/\D/g, "")
    formObject.budget = Number(formObject.budget)

    formObject = tranforMailings(formObject)
    createClient(formObject)
})

function tranforMailings(formObject){
    formObject.mailings  = []

    for(let i = 1; i <= QTD_MAX_MAILINGS.length; i++){

        if (formObject[`mailings_name-${i}`] && formObject[`mailings_email-${i}`]) {
            formObject.mailings.push({
                name: formObject[`mailings_name-${i}`],
                email: formObject[`mailings_email-${i}`]
            })
            delete formObject[`mailings_name-${i}`]
            delete formObject[`mailings_email-${i}`]
        }
    }

    return formObject
}
   












// const mailings_name = Array.from(document.querySelectorAll(`${event.target.id} .mailings_name`))
//     const mailings_name_array = [] 
//     mailings_name.forEach(mail =>{
//         const obj_name = {}
//         const [name, id] = mail.name.split('-')
//         // console.log(name, id);
//         obj_name[name] = mail.value
//         obj_name["id"] = id
//         console.log(obj_name);
//         mailings_name_array.push(obj_name)
//     })


    // const mailings_email = Array.from(document.querySelectorAll(`${event.target.id} .mailings_email`))
    // const mailings_email_array = [] 
    // mailings_email.forEach(mail=>{
    //     const obj_email = {}
    //     obj_email[mail.name] = mail.value
    //     mailings_email_array.push(obj_email)
    // })

    // let teste = mailings_name_array.concat(mailings_email_array)

    // console.log(teste)

    // console.log(teste)
    // console.log(mailings_email_array)