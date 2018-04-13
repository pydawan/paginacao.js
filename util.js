/**
    @author: thiago.amm
    @data: 10/11/2015
    @version: v1.0.0
*/

const REGEX_TEMPORAL = /^\d{2}\/\d{2}\/\d{4}( \d{2}:\d{2}:\d{2}(\.\d{1,6})?)?$/igm;
const REGEX_DATETIME = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}(\.\d{1,6})?$/igm;
const REGEX_DATE = /^\d{2}\/\d{2}\/\d{4}$/igm;
const REGEX_TIME = /^\d{2}:\d{2}:\d{2}(\.\d{1,6})?$/igm;

const REGEX_SQL_TEMPORAL = /^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2}(\.\d{1,6})?)?$/igm;
const REGEX_SQL_DATETIME = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(\.\d{1,6})?$/igm;
const REGEX_SQL_DATE = /^\d{4}-\d{2}-\d{2}$/igm;
const REGEX_SQL_TIME = /^\d{2}:\d{2}:\d{2}(\.\d{1,6})?$/igm;

Number.prototype.formatMoney = function(c, d, t) {
   var n = this,
      c = isNaN(c = Math.abs(c)) ? 2 : c,
      d = d == undefined ? "," : d,
      t = t == undefined ? "." : t,
      s = n < 0 ? "-" : "",
      i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
      j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

Number.prototype.money = function() {
   return this.formatMoney(2, ',', '.');
};

Array.prototype.contains = function(obj) {
   if (obj != null) {
      if (typeof (obj) === 'number') {
         for (var i = 0; i < this.length; i++) {
            if (this[i] == obj) {
               return true;
            }
         }
      } else if (typeof (obj) === 'string') {
         var pattern = '({0})+'.format(obj);
         var regex = new RegExp(pattern, 'g');
         return regex.test(this.join(''));
      }
   }
   return false;
};

Array.prototype.index = function() {
   return this;
};

Array.prototype.empty = function() {
   return this.length == 0;
};

String.prototype.reverse = function() {
   var reversed = '';
   for (var i = this.length - 1; i > -1; i--) {
      reversed += this.charAt(i);
   }
   return reversed;
};

String.prototype.upper = function() {
   return this.toUpperCase();
};

String.prototype.lower = function() {
   return this.toLowerCase();
};

String.prototype.capitalize = function() {
   return this.charAt(0).upper() + this.substring(1, this.length);
};

String.prototype.isdigit = function() {
   return /^(\d)+$/.test(this);
};

String.prototype.isalnum = function() {
   return /[\w\d]+/.test(this);
};

String.prototype.isalpha = function() {
   return /^[a-zA-z]+$/.test(this);
};

String.prototype.isspace = function() {
   return /^\s+$/.test(this);
};

String.prototype.istitle = function() {
   return false;
};

String.prototype.format = function() {
   var result = '';
   var pattern = '';
   var regex = '';
   if (arguments.length == 1) {
      result = this;
      args = arguments[0];
      if (typeof (arguments[0]) === 'string') {
         args = [ arguments[0] ];
      }
      for (var i in args) {
         pattern = '\\{' + i + '\\}';
         regex = new RegExp(pattern);
         result = result.replace(regex, args[i]);
      }
   } else if (arguments.length > 1) {
      result = this;
      for (var i in arguments) {
         if (!typeof (arguments[i]) === 'string') {
            return '';
         } else {
            pattern = '\\{' + i + '\\}';
            regex = new RegExp(pattern);
            result = result.replace(regex, arguments[i]);
         }
      }
   }
   return result;
};

String.prototype.isupper = function() {
   return this == this.toUpperCase();
};

String.prototype.islower = function() {
   return this == this.toLocaleLowerCase();
};

String.prototype.ispalindrome = function() {
   return this == this.reverse();
};

String.prototype.times = function(n) {
   var result = '';
   if (n != null && n > 0) {
      for (var i = 0; i < n; i++) {
         result += this;
      }
   }
   return result;
};

String.prototype.startswith = function(s) {
   var result = false;
   if (s != null && typeof (s) === 'string') {
      var pattern = '^(' + s + ')';
      var regex = new RegExp(pattern);
      return regex.test(this);
   }
   return result;
};

String.prototype.endswith = function(s) {
   var result = false;
   if (s != null && typeof (s) === 'string') {
      var pattern = '(' + s + ')$';
      var regex = new RegExp(pattern);
      return regex.test(this);
   }
   return result;
};

String.prototype.ljust = function(width, fillchar) {
   if (width > this.length) {
      return this + fillchar.times(width - this.length);
   }
   return this;
};

String.prototype.rjust = function(width, fillchar) {
   if (width > this.length) {
      return fillchar.times(width - this.length) + this;
   }
   return this;
};

String.prototype.center = function(width, fillchar) {
   switch (arguments.length) {
      case 1:
         if (width != null && typeof (width) === 'number' && width > this.length) {
            var times = width - this.length;
            times = Math.round(times / 2);
            return ' '.times(times) + this + ' '.times(times);
         }
         break;
      case 2:
         var width = arguments[0];
         var fillchar = arguments[1];
         if (width != null && typeof (width) === 'number' && width > this.length && fillchar != null
            && typeof (fillchar) === 'string') {
            var times = width - this.length;
            times = Math.round(times / 2);
            return fillchar.times(times) + this + fillchar.times(times);
         }
         break;
   }
   if (arguments.length == 1) {

   } else if (arguments.length == 2) {
      var width = arguments[0];
      var fillchar = arguments[1];
      if (arguments[0] != null && typeof (arguments[0]) === 'number' && arguments[0] > this.length
         && fillchar != null && typeof (fillchar) === 'string') {
         var times = width - this.length;
         times = Math.round(times / 2);
         return fillchar.times(times) + this + fillchar.times(times);
      }
   }
   return this;
};

String.prototype.swapcase = function() {
   return this.isupper() ? this.lower() : this.upper();
};

String.prototype.join = function(collection) {
   if (typeof (collection) === 'object') {
      return collection.join(this);
   }
   return collection;
};

String.prototype.shuffle = function() {
   if (!this.empty()) {
      var chars = [];
      var random_number = 0;
      var sorted_random_numbers = [];
      var i = 0;
      while (i < this.length) {
         random_number = Math.floor(Math.random() * this.length);
         if (!sorted_random_numbers.contains(random_number)) {
            chars.push(this.charAt(random_number));
            sorted_random_numbers.push(random_number);
            i++;
         }
      }
      return ''.join(chars);
   }
   return this;
};

String.prototype.randomize = function() {
   if (!this.empty()) {
      var chars = [];
      var random_number = 0;
      var i = 0;
      while (i < this.length) {
         random_number = Math.floor(Math.random() * this.length);
         chars.push(this.charAt(random_number));
         i++;
      }
      return ''.join(chars);
   }
   return this;
};

String.prototype.lstrip = function() {
   return this.replace(/^\s+/, '');
};

String.prototype.rstrip = function() {
   return this.replace(/\s+$/, '');
};

String.prototype.strip = function() {
   return this.rstrip().lstrip();
};

String.prototype.count = function() {
   var value = null;
   var modifier = 'g';
   if (arguments.length) {
      value = arguments[0];
   }
   if (arguments.length == 2) {
      modifier = arguments[1];
   }
   if (value && typeof (value) === 'string') {
      return (this.length - this.replace(new RegExp(value, modifier), '').length) / value.length;
   }
   return 0;
};

String.prototype.empty = function() {
   return this.length == 0 ? true : false;
};

String.prototype.notEmpty = function() {
   return this.length > 0 ? true : false;
};

String.prototype.zfill = function(size) {
   var times = size - this.length;
   return '0'.times(times) + this;
};

String.prototype.contains = function(e) {
   var array = this.split('');
   return array.contains(e);
};

String.prototype.index = function() {
   return this;
};

String.prototype.splitlines = function() {
   return this.split('\n');
};

String.prototype.partition = function() {
   return this;
};

String.prototype.find = function() {
   return this;
};

String.prototype.expandtabs = function() {
   return this;
};

String.prototype.title = function() {
   return this;
};

String.prototype.encode = function() {
   return this;
};

String.prototype.decode = function() {
   return this;
};

String.prototype.translate = function() {
   return this;
};

String.prototype.mul = function(n) {
   return this.times(n);
};

String.prototype.ascii_lowercase = function() {
   return 'abcdefghijklmnopqrstuvwxyz';
};

String.prototype.ascii_uppercase = function() {
   return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
};

String.prototype.ascii_letters = function() {
   return this.ascii_lowercase() + this.ascii_uppercase();
};

String.prototype.digits = function() {
   return '0123456789';
};

String.prototype.hexdigits = function() {
   return '0123456789abcdefABCDEF';
};

String.prototype.letters = function() {
   return this;
};

String.prototype.lowercase = function() {
   return this;
};

String.prototype.uppercase = function() {
   return this;
};

String.prototype.octdigits = function() {
   return '01234567';
};

String.prototype.punctuation = function() {
   return '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
};

String.prototype.printable = function() {
   return '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ \t\n\r\x0b\x0c';
};

String.prototype.whitespace = function() {
   return '\t\n\x0b\x0c\r ';
};

String.prototype.toSqlDatetime = function() {
   var sqlDatetime = '';
   if (this.notEmpty() && this.match(REGEX_DATETIME)) {
      var datahora = this.split(' ');
      var data = datahora[0].split('/');
      var horas = datahora[1];
      var dia = data[0];
      var mes = data[1];
      var ano = data[2];
      sqlDatetime = "{0}-{1}-{2} {3}".format(ano, mes, dia, horas);
   }
   return sqlDatetime;
};

String.prototype.toSqlDate = function() {
   var sqlDate = '';
   if (this.notEmpty() && this.match(REGEX_DATE)) {
      var data = this.split('/');
      var dia = data[0];
      var mes = data[1];
      var ano = data[2];
      sqlDate = "{0}-{1}-{2}".format(ano, mes, dia);
   }
   return sqlDate;
};

String.prototype.toSqlTime = function() {
   var sqlTime = '';
   if (this.notEmpty() && this.match(REGEX_TIME)) {
      sqlTime = this;
   }
   return sqlTime;
};

String.prototype.sqlDatetime = function() {
   return this.match(REGEX_SQL_DATETIME) != null;
};

String.prototype.sqlDate = function() {
   return this.match(REGEX_SQL_DATE) != null;
};

String.prototype.sqlTime = function() {
   return this.match(REGEX_SQL_TIME) != null;
};

// Função que produz intervalos numéricos baseada na função range do Python.
function intervalo(inicio, fim, incremento) {
   var valores = [];
   if (inicio === undefined || inicio === null) {
      inicio = 0;
   }
   if (fim === undefined || fim === null) {
      fim = 0;
   }
   if (incremento === undefined) {
      incremento = 1;
   }
   if (inicio < fim && incremento > 0) {
      for (var i = inicio; i < fim; i += incremento) {
         valores.push(i);
      }
   }
   if (inicio > fim && incremento < 0) {
      for (var i = inicio; i > fim; i += incremento) {
         valores.push(i);
      }
   }
   return valores;
}

function range(start, end, increment) {
   return intervalo(start, end, increment);
}

$(document).ready(function() {
   $('.datepicker').mask('99/99/9999');
   $('.input-group.date').datepicker({
      language : 'pt-BR',
      format : 'dd/mm/yyyy',
      showOnFocus : false,
      todayHighlight : true
   });
   $('.selectpicker').selectpicker();
   // Remove os títulos das opções das caixas de seleção.
   $('.selectpicker').next().find('button').attr('title', '');
   $('.selectpicker').change(function(i, e) {
      $(this).next().find('button').attr('title', '');
   });
   $('[data-toggle="tooltip"]').tooltip({
      'placement' : 'bottom',
      'trigger' : 'hover',
      'delay' : {
         'show' : 100,
         'hide' : 1
      }
   });
   $('#goias').bind('mouseenter', function() {
      $(this).effect('bounce', {
         times : 1
      }, 500);
   });
   $('.rodape.logotipo').bind('mouseenter', function() {
      $(this).effect('bounce', {
         times : 1
      }, 500);
   });
   $('[data-toggle="tooltip"]').tooltip();
});
