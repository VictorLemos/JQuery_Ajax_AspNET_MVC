//Listamos todos os dados Existentes
Listar();

//FUNCOES

//Recebe a classe css para o tipo, seja sucesso ou erro.
//Passamos como parâmetro SUCESS(para sucesso) ou DANGER(para erro)
function Mensagem(stringCss, mensagem) {
    //caso exista uma mensagem, ele remove
    $("#mensagem").remove();

    //serve para limitar um tempo para aparecer a nova mensagem
    setTimeout(function () {
        //tempo de 10 sec..
        $('#formDados').append("<div class='alert alert-" + stringCss + "' id=mensagem role=alert>" + mensagem + "</div>");
    });
}

function LimparFormulario() {
    //Limpar formulario
    //pega todos os ítens do form e limpa
    $('#formDados').each(function () {
        this.reset();
    });
}

//Valida campos do formulario
function ValidarFormulario() {
    var nome = formDados.nome.value;
    var email = formDados.Email.value;

    if (nome == "") {
        alert('Preencha o campo com seu nome');
        form1.nome.focus();
        return false;
    }

    if (email == "") {
        alert('Preencha o campo com seu Email');
        form1.email.focus();
        return false;
    }


}

//Metodo Cadastrar
function Cadastrar() {
    ValidarFormulario(); //chamada para validar campos
    var dadosSerializados = $('#formDados').serialize(); //Pegamos o id do nosso formulário via Jquery, usamos a função serialize(), que transforma nosso formulário em uma série de strings
    $.ajax({    //Inicializamos a função $.ajax() do Jquery, passando os valores dos seguintes atributos: 
        type: "POST",                     //type: Informamos o tipo de requisição, podendo ser: GET, POST, PUT ou DELETE.
        url: "/Pessoa/Cadastrar",         //url: Nosso caminho /Controller/Action criada em nosso NET MVC, para onde enviaremos os dados do formulário.
        data: dadosSerializados,          //data: Serão os dados que enviaremos por parâmetro para a Action,  mandaremos os dados do nosso formulário.
        success: function () {
            Mensagem("success", "Cadastrado com Sucesso!");
            Listar();                     // chamo o metodo listar
        },
        error: function () {
            Mensagem("danger", "Erro ao Cadastrar!");
        }
    });
}

//Metodo de listar
function Listar() {
    //chamamos nosso método auxiliar para limpar os campos
    LimparFormulario();

    $.ajax({  //Inicializamos nosso $.ajax
        type: "GET",
        url: "/Pessoa/Listar",  //url: referenciará a Action Listar, de onde virão nossos dados.
        success: function (dadosPessoa) {  //success: aqui, recebemos a resposta do servidor, que no caso é a lista de pessoas que estão cadastradas em nosso sistema.
            
            //if (dadosPessoa.length == 0) {
            if (dadosPessoa == null) {
                    $('table').addClass('hidden');
                } else {
                    $('table').removeClass('hidden');

                $('#tbody').children().remove(); //Aqui definimos que toda vez que chamar o método de listagem, ele irá remover todos os itens que está dentro da tr para não replicar os dados em nossa tabela.

                $(dadosPessoa).each(function (i) {  //Aqui pegamos os dados (nossa lista), e vamos usar a função do JQuery each. Ela nos permite trabalhar com cada objeto dentro de uma lista, passando como atributo o index(este index, será utilizado como as posições de um for, para cada posição desta lista, ele incrementa este valor e pegamos objeto daquela posição).
                    var dataMiliSegundos = dadosPessoa[i].DataNascimento.replace('/Date(', '').replace(')/', ''); //dataMiliSegundos – quando este objeto vir do C# ele vem em formato de Milissegundos, junto à uma string. Removemos esta string e mantemos somente os números, para assim, na linha debaixo criar uma nova data, passando estes milissegundos.
                    var dataNascimento = new Date(parseInt(dataMiliSegundos)).toLocaleDateString();
                    var tbody = $('#tbody');
                    var tr = "<tr>";
                    tr += "<td>" + dadosPessoa[i].Id;
                    tr += "<td>" + dadosPessoa[i].Nome;
                    tr += "<td>" + dataNascimento;
                    tr += "<td>" + dadosPessoa[i].Email;
                    tr += "<td>" + "<button class='btn btn-info' onclick=Editar(" + dadosPessoa[i].Id + ")>" + "Editar";
                    tr += "<td>" + "<button class='btn btn-danger' onclick=Deletar(" + dadosPessoa[i].Id + ")>" + "Deletar";
                    tbody.append(tr);
                });
            }
        }
    });
}

//Metodo de Deletar
function Deletar(idPessoa) {
    var confirma = confirm("Deseja Realmente Apagar ?");
    if (confirma) {
        $.ajax({
            type: 'POST',
            url: "/Pessoa/Deletar",
            data: { id: idPessoa },
            success: function () {
                Listar();
                Mensagem("success","Deletado com sucesso!");
            },
            error: function () {
                Mensagem("danger","Erro ao deletar!");
            }
        });
    }
}

//Metodo de Alterar
function Editar(idPessoa) {
    $.ajax({
        type: 'GET',
        url: '/Pessoa/Editar',

        //informamos que nossa controler possui um parametro com nome 'id'
        // e enviamos o nosso id que pegamos no botao editar.
        data: { id: idPessoa },
        success: function (dados) {
            // faz a formatacao novamente da data que vem do C# em formado JSON
            var dataMiliSegundos = dados.DataNascimento.replace('/Date(', '').replace(')/', '');

            //converte para a data em formato local
            var dataFormatoLocal = new Date(parseInt(dataMiliSegundos)).toLocaleDateString();

            //como nosso atributo TYPE DATE do HTML
            //suporta o somente o formato yyyy-mm-dd (ano-mes-dia)
            //faremos a formatacao do mesmo.
            var dataFormatada = "";

            //com o metodo SUBSTRING do JAVASCRIPT, pegamos os Indexes da string. no exemplo
            //10-01-12 - a substring inicia-se em 0 entao,
            //se queremos pegar o valor apenas do dia, será de
            //0 a 2 pois no primeiro parametro informamos o indice e no segundo a posicao do valor

            dataFormatada += dataFormatoLocal.substring(6, 10) + '-';
            dataFormatada += dataFormatoLocal.substring(3, 5) + '-';
            dataFormatada += dataFormatoLocal.substring(0, 2);

            //após voltar os dados do nosso backend, ele insere estes valores
            //no input de cada item
            $('#idPessoa').val(dados.Id);
            $('#nome').val(dados.Nome);
            $('#DataNascimento').val(dataFormatada);
            $('#Email').val(dados.Email);

            //como queremos EDITAR um determinado contato, ocultaremos o botao SALVAR
            //e mostraremos o botao ATUALIZAR usando a funcao do JQUERY
            $("#salvar").addClass("hidden");
            $("#atualizar").removeClass("hidden");
        }
    });
}

//Metodo Atualizar para View
function Atualizar() {
    //recebemos novamente nosso formulário
    var dadosSerializados = $('#formDados').serialize();
    $.ajax({
        type: "POST",
        url: "/Pessoa/Atualizar",
        //nossa controller receberá os dados
        data: dadosSerializados,
        success: function () {
            Mensagem("success", "Alterado com Sucesso!");
            //depois que ocorrer toda a operação com sucesso
            //ocultaremos o botao atualizar e mostraremos novamente o de salvar
            $("#salvar").removeClass("hidden");
            $("#atualizar").addClass("hidden");
            //por fim, listamos os arquivos novamente.
            Listar();
        },
        error: function myfunction() {
            alert("Erro!");
        }
    });
}