var times = [
    {codigo: 'CO', nome: 'Corinthians'},
    {codigo: 'VI', nome: 'Vitória'}
  ],
  apostadores = [
    {codigo: 'abc123', nome: 'Jose da Silva'}
  ],
  jogos = [
    {codigo: '123abc', timeA: 'CO', timeB: 'VI', data: new Date('2013/03/21'), pontosTimeA: 0, pontosTimeB: 0}
  ],
  apostas = [
  ];

function getTimeByCodigo(codigo) {
  var t1 = null;
  times.forEach(function(t){
    if (t.codigo == codigo) {
      t1 = t;
      return;
    }
  });
  return t1;
}

function popularViewAdmTimes() {
  $('#view_adm_times div.grid table tbody tr td').parent().remove();
  times.forEach(function(t, i){
    var tr = '<tr>';
    tr += '<td>' + t.nome + '</td>';
    tr += '</tr>';
    $('#view_adm_times div.grid table tbody').append(tr);
  });
}

function popularViewAdmApostadores() {
  $('#view_adm_apostadores div.grid table tbody tr td').parent().remove();
  apostadores.forEach(function(a, i){
    var tr = '<tr>';
    tr += '<td>' + a.nome + '</td>';
    tr += '</tr>';
    $('#view_adm_apostadores div.grid table tbody').append(tr);
  });
}

function popularViewAdmJogos() {
  jogos.forEach(function(j, i){
    var tr = '<tr>';
    tr += '<td>' + getTimeByCodigo(j.timeA).nome + '</td>';
    tr += '<td>' + getTimeByCodigo(j.timeB).nome + '</td>';
    tr += '<td>' + formatDate(j.data) + '</td>';
    tr += '</tr>';
    $('#view_adm_jogos div.grid table tbody').append(tr);
  });
}

function showFormNovoTime() {
  $('#form_novo_time').dialog({
    draggable: false,
    modal: true,
    resizable: false,
    title: 'Novo Time',
    width: 750,
    show: {effect: 'fade', duration: 150}
  });
}

function showFormNovoApostador() {
  $('#form_novo_apostador').dialog({
    draggable: false,
    modal: true,
    resizable: false,
    title: 'Novo Apostador',
    width: 750,
    show: {effect: 'fade', duration: 150}
  });
}

function showFormNovoJogo() {
  $('#form_novo_jogo').dialog({
    draggable: false,
    modal: true,
    resizable: false,
    title: 'Novo Jogo',
    width: 750,
    show: {effect: 'fade', duration: 150}
  });
}

function showViewAdm() {
  $('#view_aposta').hide();
  $('#view_adm').show('fade', {}, 150);
}

function showViewAposta() {
  $('#view_adm').hide();
  $('#view_aposta').show('fade', {}, 150);
}

function popularViewApostaFormJogo() {
  jogos.forEach(function(j){
    var opt = '<option value="' + j.codigo + '">' + getTimeByCodigo(j.timeA).nome + ' X ' + getTimeByCodigo(j.timeB).nome + ' em ' + formatDate(j.data) + '</option>';
    $('#view_aposta_form_jogo').append(opt);
  });
  apostadores.forEach(function(a){
    var opt = '<option value="' + a.codigo + '">' + a.nome + '</option>';
    $('#view_aposta_form_apostador').append(opt);
  });
}

function popularFormNovoJogo() {
  times.forEach(function(t){
    var opt = '<option value="' + t.codigo + '">' + t.nome + '</option>';
    $('#form_novo_jogo_timea, #form_novo_jogo_timeb').append(opt);
  });
  $('#form_novo_jogo_data').datepicker();
}

function formatDate(date) {
  var month = (date.getMonth() + 1).toString();
  month = month.length == 1 ? '0'+month : month;
  var day = date.getDate().toString();
  day = day.length == 1 ? '0'+day : day;
  var hour = date.getHours().toString();
  hour = hour.length == 1 ? '0'+hour : hour;
  var minute = date.getMinutes().toString();
  minute = minute.length == 1 ? '0'+minute : minute;
  var second = date.getSeconds().toString();
  second = second.length == 1 ? '0'+second : second;
  return day + '/' + month + '/' + date.getFullYear() + ' às ' + hour + ':' + minute;
}

function salvarNovoTime() {
  var t = {};
  t.codigo = $('#form_novo_time_codigo').val();
  t.nome = $('#form_novo_time_nome').val();
  times.push(t);
  $('#form_novo_time').dialog('close');
  popularViewAdmTimes();
}

function salvarNovoApostador() {
  var a = {};
  a.nome = $('#form_novo_apostador_nome').val();
  apostadores.push(a);
  $('#form_novo_apostador').dialog('close');
  popularViewAdmApostadores();
}

function salvarNovaAposta() {

}

$(document).ready(function(){
  popularViewAdmTimes();
  popularViewAdmApostadores();
  popularViewAdmJogos();
  popularViewApostaFormJogo();
  popularFormNovoJogo();
});
