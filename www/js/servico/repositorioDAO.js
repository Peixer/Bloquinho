angular.module('starter.services')
  .service('$repositorio', [function () {
    var db;

    function inicializarDB() {
      db = new PouchDB('bloquinho');
    };

    if (!db)
      inicializarDB();

    this.listar = function () {
      return db.allDocs({
        include_docs: true
      });
    };

    this.gravarCliente = function (cliente) {
      if (cliente._id != null) {
        return atualizarCliente(cliente);
      } else {
        return adicionarCliente(cliente);
      }
    };

    function adicionarCliente(cliente) {
      return db.post({
        nome: cliente.nome,
        total: cliente.total,
        endereco: cliente.endereco,
        email: cliente.email,
        telefone: cliente.telefone
      });
    };

    function atualizarCliente(cliente) {
      return db.put({
        _id: cliente._id,
        _rev: cliente._rev,
        nome: cliente.nome,
        total: cliente.total,
        endereco: cliente.endereco,
        email: cliente.email,
        telefone: cliente.telefone,
        movimentacoes: cliente.movimentacoes
      });
    };

    this.deletarCliente = function (item) {
      db.remove(item._id, item._rev);
    };

    this.obterClienteComId = function (id) {
      return db.get(id);
    };

  }]);

//todo como deveria ficar o registro de cliente
// {
//         Nome,
//         Endereco,
//         Telefone,
//         Email,
//         Movimentacoes: [
//             { Descricao, Valor, EhEntrada }
//         ]
// }
