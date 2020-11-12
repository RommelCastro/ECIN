//Variaveis
const database = firebase.database();
const storage = firebase.storage();
let usuarioLogadoKey;
let usuarioKey;
let usuarioAtual
//ObjetosDAO
let usuariodao = new usuarioDAO

if(localStorage.getItem('usuarioLogadoKey')){
  const queryString = window.location.search;  
  usuarioLogadoKey = localStorage.getItem('usuarioLogadoKey');
  //alert("Storage:" + usuarioLogadoKey)
  identificarUsuario(queryString.slice(1), usuarioLogadoKey)
}

function identificarUsuario(userId, userlogId) {
  usuariodao.buscar(userId).then(function(usuario){
    usuarioAtual = usuario

    if(userId === userlogId){
      document.getElementById('tituloUsuario').innerHTML = `
      <h5 class="d-flex justify-content-center font-weight-bold">Meu Perfil</h5>`
      document.getElementById('dadosUsuario').innerHTML = `
      <small id="dadosUsuario" class="form-row d-flex justify-content-center">
      <a class="mr-1" href="javascript:void(0)">Estatisticas</a>
      <p> - </p>
      <a class="ml-1" href="javascript:void(0)" onclick="chamarModalReport()">Reportar Bugs/Melhorias</a>
      <p> - </p>
      <a href="mailto:ecim@gmail.com?subject=Assunto do email&amp;body=Olá,%0D%0A%0D%0A[corpo do email]%0D%0A%0D%0AAtenciosamente,%0D%0A[nome do usuário]">Fale conosco</a>
      </small>`
    }
    document.getElementById('nomeUsuario').innerHTML = `<h5 id="nomeUsuario" class="font-weight-bold">${usuarioAtual.getNome()}</h5>`
    document.getElementById('emailUsuario').innerHTML = `<h6>${usuarioAtual.getEmail()}</h6>`
  })
}

function chamarModalReport(){
	$('#ModalReport').modal('show');
	document.getElementById('nomeRealto').value = ""
	document.getElementById('tipoRelato').value = 1
	document.getElementById('areatextoRelato').value = ""
}

function enviarRelato(){
  //Capturando os valores do formulário
  let titulo = document.getElementById('nomeRealto').value
  let tipo = document.getElementById('tipoRelato').value
  let relato = document.getElementById('areatextoRelato').value
  
  usuariodao.enviarRelato(titulo, tipo, relato)
}
