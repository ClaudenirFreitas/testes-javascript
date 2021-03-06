/* global jQuery: false */
/* global cepUtil: false */
/* global Promise: false */
/* exported enderecoService */

var enderecoService = (function ($) {
  'use strict';

  function buscarPorCep(cep) {
    var p1 = new Promise(
      function (resolve, reject) {
        if (cepUtil.validar(cep)) {
          $.ajax({
            url: 'https://viacep.com.br/ws/' +
              cepUtil.retirarMascara(cep) + '/json/',
            dataType: 'json',
            success: resolve,
            error: reject
          });
          //colocar este erro de propósito
        } else {
          reject('cep inválido');
        }
      }
    );
    return p1;
  }

  function buscarPorUFCidadeLogradouro(pesquisaAsJson) {
    if (pesquisaAsJson.cidade.length < 3 ||
      pesquisaAsJson.logradouro.length < 3) {
      throw 'Cidade ou Logradouro com tamanho inválido';
    }
    var p1 = new Promise(
      function (resolve, reject) {
        $.ajax({
          url: 'https://viacep.com.br/ws/' +
            pesquisaAsJson.uf + '/' +
            pesquisaAsJson.cidade + '/' +
            pesquisaAsJson.logradouro + '/json/',
          dataType: 'json',
          success: resolve,
          error: reject
        });
      }
    );
    return p1;
  }

  return {
    buscarPorCep: buscarPorCep,
    buscarPorUFCidadeLogradouro: buscarPorUFCidadeLogradouro
  };

})(jQuery);
