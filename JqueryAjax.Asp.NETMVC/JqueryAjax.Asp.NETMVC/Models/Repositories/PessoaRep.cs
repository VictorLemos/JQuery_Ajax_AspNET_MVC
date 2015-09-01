using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//importando namespace da classe model.... para utilizar a classe
using JqueryAjax.Asp.NETMVC.Models.Model;

//Lista estática.... dados em memoria
namespace JqueryAjax.Asp.NETMVC.Models.Repositorio
{
    public class PessoaRep
    {
        //Como não utilizarei banco de dados, criamos uma lista estática
        private static List<PessoaModel> _listPessoas;

        //Construtor da classe "CTOR"
        public PessoaRep()
        {
            //Caso a lista não for instanciada, ele cria a nova instancia
            if (_listPessoas == null)
            {
                _listPessoas = new List<PessoaModel>();

                //caso queira que inicie com algum valor.
                _listPessoas.Add(new PessoaModel { Id = 1, Nome = "Victor Melhem Deoud Lemos", DataNascimento = new DateTime(1988, 10, 05), Email = "desnuey@gmail.com" });
            }
        }


        //Retorna o objeto que possuir aquele Id expecifico
        public PessoaModel GetById (int id)
        {
            return _listPessoas.SingleOrDefault(p => p.Id == id);
        } 

        //Responsável pelo cadastro de novas pessoas.
       
        public void Cadastrar(PessoaModel pessoa)
        {

            //Pequena logica de incremento para o ID
            var id = 1;

            //Incrementa a variavel até não existir um Id com aquele valor

            while (_listPessoas.Any(i => i.Id == id))
                id++;

                //Após encontrar um ID que não está sendo utilizado
                //Atribui à nossa nova pessoa um ID
                pessoa.Id = id;
 
                //Adiciona a pessoa no nosso banco de dados fictício
                    _listPessoas.Add(pessoa);                       
        }
        
        

        //Responsável por verificar uma pessoa existente, e atualizar os dados
        public void Atualizar(PessoaModel pessoa)
        {
            //Pega em nosso banco de dados fictício aquela pessoa existente pelo ID
            var pessoaDadoAnterior = GetById(pessoa.Id);
            if (pessoaDadoAnterior != null)
            {
                //Pegamos todas as propriedades daquela pessoa com exceção do ID
                //e adicionamos o novo valor ao objeto
                foreach (var pessoaProperty in typeof(PessoaModel)
                    .GetProperties().Where(p => p.Name != "Id"))
                {
                    //Primeiro parâmetro é o objeto antigo..
                    //Segundo parâmetro é onde vai setar o novo valor
                    pessoaProperty.SetValue(pessoaDadoAnterior, pessoaProperty.GetValue(pessoa));
                }
            }
        }

        //Responsável por remover um item
        public void Deletar(int id)
        {
            //Pega no banco de dados fictício a pessoa pelo id
            var obj = GetById(id);

            //remove da lista estática(banco de dados fictício)
            _listPessoas.Remove(obj);
        }

        //Responsável por listar
        public IEnumerable<PessoaModel> Listar()
        {
            //Retorna a lista
            return _listPessoas;
            
        }
    }
}