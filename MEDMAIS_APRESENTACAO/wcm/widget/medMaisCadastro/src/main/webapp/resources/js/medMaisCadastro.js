var MyWidget = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,

    //método iniciado quando a widget é carregada
    init: function() {
    },
  
    //BIND de eventos
    bindings: {
        local: {
            'execute': ['click_executeAction']
        },
        global: {}
    },
 
    executeAction: function(htmlElement, event) {
    }

});

function enviar(){

    var constraints = []
    var constraint  = new Object();
    var qtdeItensTabela = parseInt($("#qtdeTable").val())

    var url = decodeURI(window.location.href.toString());
    url = url.split("portal")[0];

    constraint  = new Object();
    constraint._field  = "codigo"
    constraint._initialValue= $("#codigo").val()
    constraint._finalValue = $("#codigo").val() 
    constraint._type= 0 
    constraint._likeSearch= false
    constraints.push(constraint)

    constraint  = new Object();
    constraint._field  = "dataEmissao"
    constraint._initialValue= $("#dataEmissao").val()
    constraint._finalValue = $("#dataEmissao").val()
    constraint._type= 0 
    constraint._likeSearch= false
    constraints.push(constraint)
    
    constraint  = new Object();
    constraint._field  = "solicitante"
    constraint._initialValue= $("#solicitante").val()
    constraint._finalValue = $("#solicitante").val()
    constraint._type= 0 
    constraint._likeSearch= false
    constraints.push(constraint)

    for(var i=1; i <= qtdeItensTabela; i++){
        constraint  = new Object();
        constraint._field  = "codigoProduto"
        constraint._initialValue= $("#codigoProduto___"+i).val()
        constraint._finalValue = $("#codigoProduto___"+i).val()
        constraint._type= 0 
        constraint._likeSearch= false
        constraints.push(constraint)

        constraint  = new Object();
        constraint._field  = "produto"
        constraint._initialValue= $("#produto___"+i).val()
        constraint._finalValue = $("#produto___"+i).val()
        constraint._type= 0 
        constraint._likeSearch= false
        constraints.push(constraint)
    }

    var request_data = {
        url: url+'api/public/ecm/dataset/datasets', 
        method: 'POST',
        ajaxData: JSON.stringify(
            { name : "inclusao_cadastro",
            fields : [], 
            constraints : constraints,
            order : []
            }),
        data: {}	
    };

    var oauth = OAuth({
        consumer: {
            key: '712a5cdd1adae72e6660c709f14e9498779e5013',
            secret: '1de74b7ff0c9cd83b836fb7380c7461f'
        },
        signature_method: 'HMAC-SHA1',
        hash_function: function(base_string, key) {
            return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
        },
        nonce_length: 6
    });
        
    // Tokens do usuário aplicativo para o Oauth APP cadastrado
    var token = {
        key: '2828dd8b-ca23-4960-a008-ade35f68747d',
        secret: '338b70a2-c680-477b-af7a-31982832f869d62ab877-003c-4ecf-ac7f-42cb6dafe2e2'
    };

    $.ajax({
        url: request_data.url,
        type: request_data.method,
        data: request_data.ajaxData,
        contentType: "application/json",
        timeout:3000,
        async: false,
        headers: oauth.toHeader(oauth.authorize(request_data, token))
    })
    .success(function(data){
    			
        if (data.content.values){
            if (data.content.values.length > 0){
                status = data.content.values[0].STATUS;
            }
        }
        
        if(status == "success"){
            console.log(data);
            console.log("Sucesso na requisição " + data.content.values[0].IPROCESS)
            FLUIGC.toast({
                title: '',
                message: "Solicitação iniciada com sucesso: " + data.content.values[0].IPROCESS,
                type: 'success'
            });
        }else{
            console.log(data);
            console.log("Erro na requisição ")
            FLUIGC.toast({
                title: '',
                message: "Erro." + data.content.values[0].MESSAGE,
                type: 'danger'
            });
        }
    })
    .error(function(data){
        console.log(data);
        console.log("Erro na requisição ")
        FLUIGC.toast({
            title: '',
            message: "Erro.",
            type: 'danger'
        });
    })
}

function addTable(row){

    var newrow = $("<tr>");

    if(row == null){
		var linha = $("#qtdeTable").val();
		if(linha == 0){
			linha = 1;
		}
		else{
			linha++;
        }
        	
        var cols = '<td class="bpm-mobile-trash-column"><span class="fluig-style-guide fs-display-block fs-md-space"><i class="fluigicon fluigicon-trash fluigicon-md" onclick="Javascript:fnCustomDeleteContato(this)" style="cursor:pointer"></i></span></td><td><div class="form-group"><input type="hidden" class="form-control" id="sequencia___' + linha + '" name="sequencia___' + linha + '" readonly><div class="input-group"><input type="text" name="codigoProduto___' + linha + '" id="codigoProduto___' + linha + '" class="form-control"><td><div class="form-group"><input type="text" name="produto___' + linha + '" id="produto___' + linha + '" class="form-control"/></div></td><td><div class="form-group">';

		newrow.append(cols);
		$("#itens").append(newrow);
        $("#sequencia___" + linha).val(linha);
		$("#qtdeTable").val(linha);
	}
	else{
        var linha = row["sequencia"];
        
        var cols = '<td class="bpm-mobile-trash-column"><span class="fluig-style-guide fs-display-block fs-md-space"><i class="fluigicon fluigicon-trash fluigicon-md" onclick="Javascript:fnCustomDeleteContato(this)" style="cursor:pointer"></i></span></td><td><div class="form-group"><input type="hidden" class="form-control" id="sequencia___' + linha + '" name="sequencia___' + linha + '" readonly><div class="input-group"><input type="text" name="codigoProduto___' + linha + '" id="codigoProduto___' + linha + '" class="form-control"><td><div class="form-group"><input type="text" name="produto___' + linha + '" id="produto___' + linha + '" class="form-control"/></div></td><td><div class="form-group">';

		newrow.append(cols);
		$("#tabContato").append(newrow);
		$("#sequencia___" + linha).val(row["sequencia"]);
		$("#codigoProduto___" + linha).val(row["codigoProduto"]);
        $("#produto___" + linha).val(row["produto"]);
       
	}

}
