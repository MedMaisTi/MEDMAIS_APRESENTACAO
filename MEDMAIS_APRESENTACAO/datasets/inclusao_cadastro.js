function createDataset(fields, constraints, sortFields) {
	log.info("<<<< CHAMOU O DATASET - Inclusão Cadastro");
	
	var newDataset = DatasetBuilder.newDataset();
    newDataset.addColumn("IPROCESS");
    newDataset.addColumn("STATUS");
    newDataset.addColumn("MESSAGE");
	
	try{
		retorno = iniciaSolicitacao(constraints);
		var response = getResponse(retorno);

	    newDataset.addRow(new Array(response.iProcess, response.status, response.message ));
	 }
	 catch(e){
		 newDataset.addRow(new Array("0", "error", e.message));
	 }
	
	 return newDataset;

}

function iniciaSolicitacao(constraints){
	try {
	    var workflowEngineServiceProvider 	= ServiceManager.getServiceInstance("ECMWorkflowEngineService");
	    var workflowEngineServiceLocator 	= workflowEngineServiceProvider.instantiate("fluig.ECMWorkflowEngineServiceService");
	    var workflowEngineService        	= workflowEngineServiceLocator.getWorkflowEngineServicePort();
	    var objectFactory 					= workflowEngineServiceProvider.instantiate("fluig.ObjectFactory");
	    var processAttachmentDtoArray 		= workflowEngineServiceProvider.instantiate("fluig.ProcessAttachmentDtoArray");
		var colleaguesId 					= workflowEngineServiceProvider.instantiate("fluig.StringArray");
		var appointment 					= workflowEngineServiceProvider.instantiate("fluig.ProcessTaskAppointmentDtoArray");
	    var cardData = workflowEngineServiceProvider.instantiate("fluig.StringArrayArray");
	    var itens = [];
	    
	    if (constraints != null){
		    for (var i = 0; i < constraints.length; i++) {
		    	log.info(" constraints[i].fieldName " + constraints[i].fieldName);
		    	log.info(" constraints[i].getInitialValue().toString() " + constraints[i].getInitialValue().toString());
		    	log.info(" constraints[i].getFinalValue().toString() " + constraints[i].getFinalValue().toString());
		    	
		    	var name = constraints[i].fieldName ;	    	
		    	var valor = constraints[i].getInitialValue().toString();
		    	
		    	if(name == 'codigoProduto'){

                    itens.push({'coluna': name, 'valor':  valor});
		    		
                    log.info(" codigoProduto " + valor);
		    		
		    	}else if(name=='produto'){
                    itens.push({'coluna': name, 'valor':  valor})
                    
                    log.info(" produto " + valor);
                }
                else{
		    		addField(objectFactory,cardData,name,valor);
		    	}
		    }
		}  
	    
	    //preencheTableItens(objectFactory, cardData, itens);
		
		var config = getConfig();
		
	    var retorno = 
	        workflowEngineService.startProcess(config.user,
	      		  config.password, 
	      		  config.companyId,  
	      		  config.processId, 
	      		  config.choosedState, 
	      		  colleaguesId, 
	      		  config.comments, 
	      		  config.userId, 
	      		  config.completeTask, 
	      		  processAttachmentDtoArray, 
	      		  cardData, 
	      		  appointment, 
	      		  false); 
	    return retorno;
	}
	catch(e){
		throw e;
	}
    
}

function addField(objectFactory, cardData, fieldName, value){
	log.info(" Entrou addField");
	
	field = objectFactory.createStringArray();
	field.getItem().add(fieldName);
	field.getItem().add(value); 
	cardData.getItem().add(field);	
}


function getResponse(retorno){
	var msg = "";
	var status = "error";
	var processNumber = 0
	var message = "";
	for (var i = 0; i < retorno.getItem().size(); i++){
        var item =  retorno.getItem().get(i).getItem();
        log.info("item " +item);
        if (item.contains("iProcess")){
        	processNumber = item.get(1);
        	message = "Incluído com sucesso."
        	break
        }
        
        if (item.contains("ERROR")){
        	message = item.get(1);
        	break
        }
     }
	
	if (processNumber){
		status = "success"
	}
	
	const jsonResponse = {
			"iProcess": processNumber, "status": status, "message" : message
	};
	
	log.info("<<<jsonResponse>>> " + jsonResponse);
	
	return  jsonResponse;
}


function getConfig(){
	const config = {
		user: "alisson.hausmann",//login do usuário.
		password: "123",//senha do usuário.
		companyId: getValue("WKCompany"), //código da empresa.
		processId: "cadastro_widget", //código do processo.
		choosedState: 9,//número da atividade.
		colleagueIds: "Papel Teste Treinamento",//usuário que receberá a tarefa. Caso a solicitação esteja sendo atribuída "Para um Papel" ou "Para um Grupo", o parâmetro colleagueIds deve ser informado da seguinte forma: Papel: Pool:Role:Nome_do_papel Grupo: Pool:Group:Nome_do_grupo
		comments: "Processo incluído via Widget",//comentários.
		userId: getValue("WKUser"),//matrícula do usuário que vai iniciar a solicitação.
		completeTask: true,//indica se deve completar a tarefa (true) ou somente salvar (false).
		managerMode: false//indica se usuário esta iniciando a solicitação como gestor do processo.
		}
	
	return config;
}
/*
function preencheTableItens(objectFactory, cardData, itens){
	log.info("REBECA >>> " + contatos);
	
	if(contatos != ""){
		var objContatos = JSON.parse(contatos);
		
		for(var i=0; i < objContatos.length; i++){
			var id = i + 1;
			
			addField(objectFactory, cardData, 'nomeContato___'+id, objContatos[i]['nome']);
			addField(objectFactory, cardData, 'telefoneContato___'+id, objContatos[i]['telefone']);
		}
	}
}
*/
