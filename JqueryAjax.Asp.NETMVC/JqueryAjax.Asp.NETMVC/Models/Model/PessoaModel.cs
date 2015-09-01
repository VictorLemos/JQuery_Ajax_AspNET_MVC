using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JqueryAjax.Asp.NETMVC.Models.Model
{
    public class PessoaModel
    {
        public int Id { get; set; }

        public String Nome { get; set; }

        public DateTime DataNascimento { get; set; }

        public String Email { get; set; }
    }
}