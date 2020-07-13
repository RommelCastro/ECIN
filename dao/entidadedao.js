class entidadeDAO{

	salvar(objEntidade, uploader){
	//Capturando os valores do formulário

	if (objEntidade.getNome()!=""&&objEntidade.getSite()!=""&&objEntidade.getTipo()!=""&&objEntidade.getLat()!=""&&objEntidade.getLng()!=""&&objEntidade.getLogradouro()!=""&&objEntidade.getNumero()!=""&&objEntidade.getCidade()!=""&&objEntidade.getUF()!=""&&objEntidade.getCEP()!=""){
	    let storageRef = storage.ref('/arquivos/'+uploader.name); // Define o caminho onde será guardada a imagem no storage
	    let uploadTask = storageRef.put(uploader); // guarda a imagem no storage

	    const rootRef = database.ref('/marcadores'); // define onse sera armazenada a imagem no database
	    const autoId = rootRef.push().key //cria uma key

	    uploadTask.on('state_changed', function(snapshot){ //entra empre que o status mudar
	      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {//Captura o URL da imagem upada no storage
	        rootRef.child(autoId).set({//guarda as nformações no database/
	        	URL:downloadURL,
	        	Nome: objEntidade.getNome(),
	        	Site: objEntidade.getSite(),
	        	Tipo: objEntidade.getTipo(),
	        	Latitude: objEntidade.getLat(),
	        	Longitude: objEntidade.getLng(),
	        	Logradouro: objEntidade.getLogradouro(),
	        	Numero: objEntidade.getNumero(),
	        	Complemento: objEntidade.getComplemento(),
	        	Bairro: objEntidade.getBairro(),
	        	Cidade: objEntidade.getCidade(),
	        	UF: objEntidade.getUF(),
	        	CEP: objEntidade.getCEP(),
	        	Usuario: objEntidade.getUserId(),
	        })
	        window.location.reload()
	    });
	  })
	}
}

buscar(entdId){
	let entidadeArray = []
	const rootRef = database.ref('/Usuario/'+ entdId);
	rootRef.once('value').then(function(snapshot){
		entidadeArray.push(snapshot.val())
	})
	return entidadeArray
}

buscarPorNome(entdName){
	const rootRef = database.ref('/marcadores');
	return rootRef.orderByChild("Nome").equalTo(entdName).once('child_added').then(function(child){ // Filtragem da barra
		let entidade = new Entidade(
			child.val().Nome, 
			child.val().Site, 
			child.val().Tipo,
			child.val().URL,
			child.val().Latitude,
			child.val().Longitude,
			child.val().Logradouro,
			child.val().Numero,
			child.val().Complemento,
			child.val().Bairro,
			child.val().Cidade,
			child.val().UF,
			child.val().CEP,
			child.key,
			child.val().Usuario,
			)
		return entidade
	})

}

varredura(){
	//Testar se eu consigo salvar todos as entides do banco de dados em variáveis locais;
	let entidadeArray = []
	const rootRef = database.ref('/marcadores');

	return rootRef.once('value').then(function(snapshot){
		snapshot.forEach(function(child){

			let entidade = new Entidade(
				child.val().Nome, 
				child.val().Site, 
				child.val().Tipo,
				child.val().URL,
				child.val().Latitude,
				child.val().Longitude,
				child.val().Logradouro,
				child.val().Numero,
				child.val().Complemento,
				child.val().Bairro,
				child.val().Cidade,
				child.val().UF,
				child.val().CEP,
				child.key,
				child.val().Usuario,
				)
			entidadeArray.push(entidade)
		})
		return entidadeArray
	})
}
}