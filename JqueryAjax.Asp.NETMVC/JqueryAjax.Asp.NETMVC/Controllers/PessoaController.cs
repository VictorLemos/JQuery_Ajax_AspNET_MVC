using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

//Importamos as namespaces para manipular as classes
using JqueryAjax.Asp;
using JqueryAjax.Asp.NETMVC.Models.Model;
using JqueryAjax.Asp.NETMVC.Models.Business;

namespace JqueryAjax.Asp.NETMVC.Controllers
{
    public class PessoaController : Controller
    {

        private PessoaBus business = new PessoaBus();

        // GET: Pessoa
        public ActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public void Cadastrar(PessoaModel pessoa)
        {
            try
            {
                business.Cadastrar(pessoa);
            }
            catch (Exception)
            {
                
                throw;
            }
        }

        
        public ActionResult Listar()
        {
            try
            {
                var listaPessoas = business.Listar();               
                //Retornamos um JSON, ou seja, uma lista de objetos Javascript, para o nosso Ajax
                //Smpre que trabalhamos com Ajax e ASP.MVC usamos o retorno JSON para que o Javascript consiga interpretar nossos objetos
                return Json(listaPessoas, JsonRequestBehavior.AllowGet);                
            }
            catch (Exception)
            {      
                throw;
            }       
        }

        public void Deletar(int id)
        {
            try
            {
                business.Deletar(id);
            }
            catch (Exception)
            {
                
                throw;
            }
        }

        public ActionResult Editar(int id)
        {
            try
            {
                //Pego o ID da pessoa selecionada
                var pessoa = business.GetById(id);

                //Retorno ao Ajax o Json, para requisição GET
                return Json(pessoa, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {            
                throw;
            }
            
        }

        [HttpPost]
        public void Atualizar(PessoaModel pessoa)
        {
            try
            {
                business.Atualizar(pessoa);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}