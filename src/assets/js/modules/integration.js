(() => {
	"use strict";

	let amount_max_mailings = [1];
	// PHONE MASK
	const lengthPhone = 15;
	$("#phonetrack").mask("(00) 0000-00009");
	$("#phonetrack").on("blur", event => {
		const { value } = event.target;
		if (value.length === lengthPhone) {
			$("#phonetrack").mask("(00) 00000-0009");
		} else {
			$("#phonetrack").mask("(00) 0000-00009");
		}
	});


	let contId = 2;
	let contDelete = 1;
	$("#toAdd").on("click", () => {
		amount_max_mailings.push(contId);
		if(contId <= amount_max_mailings.length){
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
			contId++;
			contDelete ++;
		}
	});


	$( "form" ).on( "click", ".btn-delete", function() {
		const button_id = $( this ).attr("id");
		$("#form-row"+ button_id).remove();
	});


	// EYE MASK
	document.getElementById("eye").addEventListener("mousedown", () => {
		document.getElementById("password").type = "text";
	});

	document.getElementById("eye").addEventListener("mouseup", () => {
		document.getElementById("password").type = "password";
	});


	const createClient = options => {
		return fetch("http://localhost:3000/profile",{
			method: "POST",
			headers:{
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(options)
		})

			.then( response => {
				return response.body;
			});
	};

	const destructForm = formObject => {
		const {name, email, password, account_name, account_description, campaign_name, campaign_description, key_adword, budget, phonetrack} = formObject;

		return {name, email, password, account_name, account_description, campaign_name, campaign_description, key_adword, budget, phonetrack};
	};

	const transforMailings = formObject => {
		const mailings  = [];

		for(let i = 1; i <= amount_max_mailings.length; i++){
			if (formObject[`mailings_name-${i}`] && formObject[`mailings_email-${i}`]) {
				mailings.push({
					name: formObject[`mailings_name-${i}`],
					email: formObject[`mailings_email-${i}`]
				});
			}
		}

		return mailings;
	};

	document.addEventListener("submit", event => {
		event.preventDefault();
		const formEntries = new FormData(event.target).entries();
		let formObject = {};
		Array.from(formEntries).forEach(entry => {
			formObject = {...formObject, [entry[0]]: entry[1] };
		});

		formObject.phonetrack = formObject.phonetrack.replace(/\D/g, "");
		formObject.budget = Number(formObject.budget);

		const mailings = transforMailings(formObject);
		const dataDestruct = destructForm(formObject);
		const newFormObject = Object.assign({
			mailings: mailings
		}, dataDestruct);

		console.log(newFormObject);
		console.log(formObject);
		createClient(newFormObject);
	});

})();
