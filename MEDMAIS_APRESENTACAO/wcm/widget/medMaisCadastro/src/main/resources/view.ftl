<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidget.instance()">
     <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

    <div class="panel panel-primary">
	    <div class="panel-heading">
	        <h3 class="panel-title">Dados</h3>
	    </div>
	    <div class="panel-body">
	    	<div class="row">
	    		<div class="col-md-2">
	    			<label class="control-label">Código</label>
					<div class="input-group">
						<input type="text" class="form-control" id="codigo" name="codigo">
					</div>
	    		</div>
	    		<div class="col-md-2">
	    			<label class="control-label">Data de Emissão</label>
					<input type="text" class="form-control" id="dataEmissao" name="dataEmissao">
	    		</div>
	    		<div class="col-md-3">
	    			<label class="control-label">Solicitante</label>
					<input type="text" class="form-control" id="solicitante" name="solicitante">
	    		</div>
				<div class="col-md-3">
	    			<label class="control-label">Upload Arquivo</label>
					<input type="file" class="form-control" id="arquivo" name="arquivo">
	    		</div>

                <div class="col-md-2">
			    	<button type="button" class="btn btn-warning" style="margin-top: 25px" onclick="enviar()">Enviar</button>
			    </div>

    		</div>
		    <div class="row">
				<div class="col-md-12">
                    <input type="hidden" id="qtdeTable" name="qtdeTable" value="0">
		    		<table class="table table-striped table-hover" id="itens" tablename="itens" noaddbutton="true" nodeletebutton="true">
		    			<colgroup>
							<col width="5%">
		    				<col width="15%">
		    				<col width="30%">
		    			</colgroup>
		    			<thead>
		    				<tr>
								<th></th>
		    					<th>Cod. Produto</th>
		    					<th>Produto</th>
		    				</tr>
		    			</thead>
		    			<tbody>
							<tr class="linha_itens">
							</tr>	
		    			</tbody>
		    		</table>
	    		</div>
			</div> 
	    </div>
	</div>
</div>
