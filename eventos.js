const API_URL = 'http://localhost:8500'

function inserir(){
    event.preventDefault();
    let dados ={
        nome: input_nome.value,
        numero: parseInt(input_numero.value),
        cidade: input_cidade.value,
    };
    fetch(API_URL+'/telefones', {
       method: 'POST',
       body: JSON.stringify(dados),
       headers: {
        'content-type':'application/json'
       } 
    })
    .then(resposta => resposta.json())
    .then(resposta => atualizarlista());

    form_add.reset();
}

async function editar(){
    event.preventDefault();
        let dados = {
            nome : input_editar_nome.value,
            numero : input_editar_numero.value,
            cidade : input_editar_cidade.value,
        };
        await fetch(API_URL+'/telefones/'+input_editar_id.value,{
            method: 'PATCH',
            body: JSON.stringify(dados),
            headers: {
                'content-type': 'application/json',
            }
        })
        .then(res=>res.json())
        .then(()=>atualizarlista());

        let x = document.querySelector('[data-bs-dismiss="offcanvas"]');
        x.dispatchEvent(new Event('click'));
}

function buscarparaeditar(id) {      
    
    fetch(API_URL+'/telefones/'+id)
    .then(res=>res.json())
    .then(dados =>{
        input_editar_id.value = id;
        input_editar_nome.value = dados.nome;
        input_editar_numero.value = dados.numero;
        input_editar_cidade.value = dados.cidade;
        });
    }
        
function atualizarlista(){
    fetch (API_URL+ '/telefones')
    .then((resposta)=>{
        return resposta.json();
    })
    .then((lista)=>{
        tabela_telefones.innerHTML ='';
        lista.forEach((cadaItem) => {
            tabela_telefones.innerHTML +=`
            <tr>
            <td>${cadaItem.id}</td>
            <td>${cadaItem.nome}</td>
            <td>${cadaItem.numero}</td>
            <td>${cadaItem.cidade}</td>
            <td>
            <button onclick="buscarparaeditar(${cadaItem.id})" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEditar" class="btn btn-outline-warning btn-sm">
            Editar
            </button> 
            <button onclick="excluir(${cadaItem.id})" class="btn btn-outline-danger">
            Excluir
            </button>
            </td>
            </tr>`;
        });
    })   
}

async function excluir(id){
    let resposta = confirm('tem certeza?')
        if(resposta !==true){
            return;
        }
        await fetch(API_URL+'/telefones/'+id,{
            method: 'DELETE'
        });
        atualizarlista();
} 
    
atualizarlista();