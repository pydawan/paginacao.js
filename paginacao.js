/**
 * @author thiago-amm
 * @version v1.0.0 12/07/2017
 * @version v1.0.1 22/08/2017 
 * Criação de grupos de paginação evitando excesso de links de páginas.
 */
function Paginacao() {
    
    var paginacao = this;
    var _registros = []
    var _totalPaginas = 0;
    var _totalRegistros = 10;
    var _registrosPorPagina = 0;
    var _totalPaginasExibicao = 10;
    var _totalGruposPaginacao = 0;
    var _deslocamento = 0;
    var _atual = null;
    var _primeira = null;
    var _ultima = null;
    var _anterior = null;
    var _proxima = null;
    var _links = [];
    var _paginas = {
        'primeira': {
            'html': function() {
                var html = '';
                html += '<li id="primeira-pagina" class="page-item">\n';
                html += '<a class="page-link" href="#" aria-label="Primeira">';
                html += '<span aria-hidden="true">&laquo;</span>';
                html += '<span class="sr-only">Primeira</span>';
                html += '</a>';
                html += '</li>';
                return html;
            }
        },
        'ultima': {
            'html': function() {
                var html = '';
                html += '<li id="ultima-pagina" class="page-item">\n';
                html += '<a class="page-link" href="#" aria-label="Última">';
                html += '<span aria-hidden="true">&raquo;</span>';
                html += '<span class="sr-only">Última</span>';
                html += '</a>';
                html += '</li>';
                return html;

            }
        },
        'anterior': {
            'html': function() {
                var html = '';
                html += '<li class="page-item">\n';
                html += '<a class="page-link" href="#" aria-label="Anterior">';
                html += '<span aria-hidden="true">&lsaquo;</span>';
                html += '<span class="sr-only">Anterior</span>';
                html += '</a>';
                html += '</li>';
                return html;
            }
        },
        'proxima': {
            'html': function() {
                var html = '';
                html += '<li class="page-item">';
                html += '<a class="page-link" href="#" aria-label="Próxima">';
                html += '<span aria-hidden="true">&rsaquo;</span>';
                html += '<span class="sr-only">Próxima</span>';
                html += '</a>';
                html += '</li>';
                return html;
            }
        },
        '_html': function() {
            var html = '';
            var pagina = '';
            html += _paginas.primeira.html();
            html += _paginas.anterior.html();
            for (var i = 0; i < paginacao.totalPaginas(); i++) {
                pagina = i + 1;
                html += '<li id="pagina-' + pagina;
                if (pagina == 1) {
                    html += '" class="page-item active">'
                } else {
                    html += '" class="page-item">'
                }
                html += '<a class="page-link" href="">' + _registros[i] + '</a></li>';
            }
            html += _paginas.proxima.html();
            html += _paginas.ultima.html();
            return html;
        },
        'html': function() {
            return _paginas.links();
        },
        'links': function() {
            var html = '';
            var pagina = '';
            var grupoPaginacao = paginacao.calcularGrupoPaginacao(_atual, _totalPaginasExibicao);
            var deslocamento = paginacao.calcularDeslocamento(grupoPaginacao);
            var limiteInferior = paginacao.calcularLimiteInferior(grupoPaginacao);
            var limiteSuperior = paginacao.calcularLimiteSuperior(grupoPaginacao);
            var links = range(limiteInferior, limiteSuperior);
            html += _paginas.primeira.html();
            html += _paginas.anterior.html();
            for (var i = 0; i < links.length; i++) {
                pagina = i + 1 + deslocamento;
                if (pagina <= paginacao.totalPaginas()) {
                    html += '<li id="pagina-' + pagina;
                    if (pagina == _atual) {
                        html += '" class="page-item active">';
                    } else {
                        html += '" class="page-item">';
                    }
                    html += '<a class="page-link" href="">' + (pagina < 10 ? '0' + pagina : pagina) + '</a></li>';
                }
            }
            html += _paginas.proxima.html();
            html += _paginas.ultima.html();
            return html;
        }
    };
    
    this.registros = function(registros) {
        if (registros === undefined) {
            return _registros;
        } else {
            _registros = registros;
        }
    };
    
    this.totalRegistros = function(totalRegistros) {
        if (totalRegistros === undefined) {
            return _totalRegistros;
        } else {
            if (totalRegistros !== null) {
                if (totalRegistros.constructor === Number) {
                    if (totalRegistros <= 0) {
                        _registros = [];
                    } else {
                        _registros = range(1, totalRegistros + 1);
                    }
                    _totalRegistros = totalRegistros;
                }
            }
        }
    };
    
    this.registrosPorPagina = function(registrosPorPagina) {
        if (registrosPorPagina === undefined) {
            return _registrosPorPagina;
        } else {
            _registrosPorPagina = registrosPorPagina;
        }
    };
    
    this.totalPaginas = function() {
        return Math.ceil(this.totalRegistros() / this.registrosPorPagina());
    };
    
    this.paginas = function() {
        return _paginas;
    };
    
    this.html = function() {
        var html = '';
        html += '<nav aria-label="Page navigation">';
        html += '<ul class="pagination">';
        html += _paginas.html();
        html += '</ul>';
        html += '</nav>';
        return html;
    };
    
    this.pagina = function(pagina) {
        if (pagina === undefined) {
            return _atual;
        } else {
            pagina = parseInt(pagina);
            if (pagina >= 1) {
                _primeira = 1;
                _atual = pagina;
                _ultima = this.totalPaginas();
                _anterior = pagina > 1 ? pagina - 1 : _primeira;
                _proxima = pagina < _ultima ? pagina + 1 : _ultima;
                console.log('PÁGINA ATUAL: ' + pagina);
                this.marcar(pagina);
            }
        }
    };
    
    this.marcar = function(pagina) {
        console.log('MARCA PÁGINA: ' + pagina);
        $('li.page-item').each(function(e) {
            $(this).removeClass('active');
        });
        $('li#pagina-' + pagina).addClass('active');
    };
    
    this.desabilitar = function(pagina) {
        console.log('Desabilitar página: ' + pagina);
        $('li#pagina-' + pagina).removeClass('active');
        $('li#pagina-' + pagina).addClass('disabled');
    }
    
    this.converter = function(pagina) {
        console.log('CONVERTER PÁGINA: ' + pagina);
        if (pagina !== undefined) {
            var p = '' + pagina;
            if (p.contains('Primeira')) {
                pagina = 1;
            }
            if (p.contains('Última')) {
                pagina = this.totalPaginas();
            }
            if (p.contains('Anterior')) {
                pagina = _atual > _primeira ? _atual - 1 : _primeira;
            }
            if (p.contains('Próxima')) {
                pagina = _atual < _ultima ? _atual + 1 : _ultima;
            }
            pagina = parseInt(pagina);
            if (pagina >= 1) {
                _primeira = 1;
                _atual = pagina;
                _ultima = this.totalPaginas();
                _anterior = pagina > 1 ? pagina - 1 : _primeira;
                _proxima = pagina < _ultima ? pagina + 1 : _ultima;
                this.marcar(pagina);
            }
            return pagina;
        }
    };
    
    this.primeiraPagina = function() {
        return _primeira;
    };
    
    this.ultimaPagina = function() {
        return _ultima;
    };
    
    this.voltarPagina = function() {
        return _anterior;
    };
    
    this.avancarPagina = function() {
        return _proxima;
    };
    
    this.totalPaginasExibicao = function(totalPaginasExibicao) {
        if (totalPaginasExibicao === undefined) {
            return _totalPaginasExibicao;
        } else {
            _totalPaginasExibicao = totalPaginasExibicao;
        }
    };
    
    this.totalGruposPaginacao = function(totalGruposPaginacao) {
        if (totalGruposPaginacao === undefined) {
            _totalGruposPaginacao = Math.ceil(this.totalPaginas() / this.totalPaginasExibicao());
            return _totalGruposPaginacao;
        } else {
            _totalGruposPaginacao = totalGruposPaginacao;
        }
    };
    
    this.deslocamento = function(deslocamento) {
        if (deslocamento === undefined) {
            return _deslocamento;
        } else {
            _deslocamento = deslocamento;
        }
    };
    
    this.calcularGrupoPaginacao = function(pagina, totalPaginasExibicao) {
        if (pagina === undefined || pagina === null) {
            pagina = _atual == null ? 1 : _atual;
        }
        if (totalPaginasExibicao === undefined) {
            totalPaginasExibicao = _totalPaginasExibicao;
        }
        var grupoPaginacao = Math.ceil(pagina / totalPaginasExibicao);
        grupoPaginacao = grupoPaginacao - 1;
        return grupoPaginacao;
    };
    
    this.calcularDeslocamento = function(grupoPaginacao) {
        if (grupoPaginacao === undefined) {
            grupoPaginacao = paginacao.calcularGrupoPaginacao();
        }
        return grupoPaginacao * paginacao.totalPaginasExibicao();
    };
    
    this.calcularLimiteInferior = function(grupoPaginacao, totalPaginasExibicao) {
        if (grupoPaginacao === undefined) {
            grupoPaginacao = paginacao.calcularGrupoPaginacao();
        }
        if (totalPaginasExibicao === undefined) {
            totalPaginasExibicao = paginacao.totalPaginasExibicao();
        }
        var limiteInferior = grupoPaginacao * totalPaginasExibicao + 1;
        return limiteInferior;
    };
    
    this.calcularLimiteSuperior = function(grupoPaginacao, totalPaginasExibicao) {
        if (grupoPaginacao === undefined) {
            grupoPaginacao = paginacao.calcularGrupoPaginacao();
        }
        if (totalPaginasExibicao === undefined) {
            totalPaginasExibicao = paginacao.totalPaginasExibicao();
        }
        var limiteSuperior = (grupoPaginacao + 1) * totalPaginasExibicao + 1;
        return limiteSuperior;
    };
    
}
