let QTD_MAX_MAILINGS = [1]

// PHONE MASK
const lengthPhone = 15
$('#phonetrack').mask('(00) 0000-00009')
$('#phonetrack').on('blur', event => {
const { value } = event.target
if (value.length === lengthPhone) {
    $('#phonetrack').mask('(00) 00000-0009')
} else {
    $('#phonetrack').mask('(00) 0000-00009')
}
})


let contId = 2
let contDelete = 1
$("#toAdd").on("click", () => {
    QTD_MAX_MAILINGS.push(contId)
    if(contId <= QTD_MAX_MAILINGS.length){
        $("#addform").append( `
        <div class="form-row align-items-center" id="form-row${contDelete}">
                <div class="form-group col-md-6" >
                  <label for="mailings_name">Nome</label>
                  <input type="text" class="form-control mailings_name" name="mailings_name-${contId}" >
                </div>
                <div class="form-group col-md-5">
                  <label for="mailings_email">Email</label>
                  <input type="email" class="form-control mailings_email" name="mailings_email-${contId}" >
                </div>
                <button type="button" id="${contDelete}" class="btn-delete btn btn-danger">Excluir</button>
        </div>
        `);
        contId++
        contDelete ++
    }else{
    }
})


$( "form" ).on( "click", ".btn-delete", function() {
    var button_id = $( this ).attr("id");
    $("#form-row"+ button_id).remove()
})


// EYE MASK
document.getElementById('eye').addEventListener('mousedown', () => {
    document.getElementById('password').type = 'text';
});
  
document.getElementById('eye').addEventListener('mouseup', () => {
    document.getElementById('password').type = 'password';
});


const createClient = options => {
    return fetch(`http://localhost:3000/profile`,{
        method: 'POST',
        headers:{
            'Accept': 'application/json',  
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(options)
    })

    .then( response => {
        return response.body
    })
}


document.addEventListener('submit', event => {
    event.preventDefault()
    
    const formEntries = new FormData(event.target).entries()
    let formObject = {}
    Array.from(formEntries).forEach(entry => { 
        formObject = {...formObject, [entry[0]]: entry[1] }
    })

    formObject.phonetrack = formObject.phonetrack.replace(/\D/g, "")
    formObject.budget = Number(formObject.budget)

    let newFormObject = {
        name: formObject.name,
        email: formObject.email,
        password: formObject.password,
        account_name: formObject.account_name,
        account_description: formObject.account_description,
        campaign_name: formObject.campaign_name,
        campaign_description: formObject.campaign_description,
        key_adword: formObject.key_adword.mailings,
        budget: formObject.budget,
        phonetrack: formObject.phonetrack
    }

    newFormObject.mailings = transforMailings(formObject)
    
    console.log(newFormObject)
    console.log(formObject)

    createClient(newFormObject)
})


const transforMailings = formObject => {
    mailings  = []

    for(let i = 1; i <= QTD_MAX_MAILINGS.length; i++){
        if (formObject[`mailings_name-${i}`] && formObject[`mailings_email-${i}`]) {
            mailings.push({
                name: formObject[`mailings_name-${i}`],
                email: formObject[`mailings_email-${i}`]
            })
        }
    }

    return mailings
}
   
