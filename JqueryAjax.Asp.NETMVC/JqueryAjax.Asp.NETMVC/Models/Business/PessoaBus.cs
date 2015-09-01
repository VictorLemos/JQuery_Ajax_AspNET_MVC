using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//Importamos a namespace para usar a classe PessoaModel
using JqueryAjax.Asp.NETMVC.Models.Model;

//Importamos a namespace para usar nosso repositorio
using JqueryAjax.Asp.NETMVC.Models.Repositorio;

namespace JqueryAjax.Asp.NETMVC.Models.Business
{
    //Classe de negocios, responsável pelo intermédio da Controllers para Repositorio....
    public class PessoaBus
    {

        private PessoaRep repositorio = new PessoaRep();

        public void Cadastrar(PessoaModel pessoa)
        {

            repositorio.Cadastrar(pessoa);
        }

        public void Atualizar(PessoaModel pessoa)
        {
            repositorio.Atualizar(pessoa);
        }

        public void Deletar(int idPessoa)
        {
            repositorio.Deletar(idPessoa);
        }

        public PessoaModel GetById(int id)
        {
            return repositorio.GetById(id);
        }

        public IEnumerable<PessoaModel> Listar()
        {
            return repositorio.Listar();
        }
    }
}