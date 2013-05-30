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
    {jogo: '123abc', apostador: 'abc123', valor: 5, pago: true}
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
    tr += '<td>' + t.codigo + '</td>';
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
  $('#view_adm_jogos div.grid table tbody tr td').parent().remove();
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
    width: 500,
    show: {effect: 'fade', duration: 150}
  });
}

function showFormNovoApostador() {
  $('#form_novo_apostador').dialog({
    draggable: false,
    modal: true,
    resizable: false,
    title: 'Novo Apostador',
    width: 500,
    show: {effect: 'fade', duration: 150}
  });
}

function showFormNovoJogo() {
  $('#form_novo_jogo').dialog({
    draggable: false,
    modal: true,
    resizable: false,
    title: 'Novo Jogo',
    width: 500,
    show: {effect: 'fade', duration: 150}
  });
}

function showViewAdm() {
  $('#view_apostas').hide();
  $('#view_adm').show('fade', {}, 150);
}

function showViewApostas() {
  $('#view_adm').hide();
  $('#view_apostas').show('fade', {}, 150);
}

function popularViewAposta() {
  jogos.forEach(function(j){
    var opt = '<option value="' + j.codigo + '">' + getTimeByCodigo(j.timeA).nome + ' X ' + getTimeByCodigo(j.timeB).nome + ' em ' + formatDate(j.data) + '</option>';
    $('#view_apostas_form_jogo').append(opt);
    $('#view_apostas_jogos_jogo').append(opt);
  });
  apostadores.forEach(function(a){
    var opt = '<option value="' + a.codigo + '">' + a.nome + '</option>';
    $('#view_apostas_form_apostador').append(opt);
  });
}

function popularFormNovoJogo() {
  times.forEach(function(t){
    var opt = '<option value="' + t.codigo + '">' + t.nome + '</option>';
    $('#form_novo_jogo_timea, #form_novo_jogo_timeb').append(opt);
  });
  for (var i = 0; i < 24; i++) {
    var ii = i.toString().length == 1 ? '0'+i.toString() : i.toString();
    var opt = '<option value="' + i + '">' + ii +'</option>';
    $('#form_novo_jogo_horas').append(opt);
  }
  for (var i = 0; i < 60; i++) {
    var ii = i.toString().length == 1 ? '0'+i.toString() : i.toString();
    var opt = '<option value="' + i + '">' + ii +'</option>';
    $('#form_novo_jogo_minutos').append(opt);
  }
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
  popularViewAdmApostadores();
  $('#form_novo_apostador').dialog('close');
}

function salvarNovoJogo() {
  var a = {}, data;
  a.timeA = $('#form_novo_jogo_timea').val();
  a.timeB = $('#form_novo_jogo_timeb').val();
  data = new Date($('#form_novo_jogo_data').val());
  data.setHours($('#form_novo_jogo_horas').val());
  data.setMinutes($('#form_novo_jogo_minutos').val());
  a.data = data;
  jogos.push(a);
  popularViewAdmJogos();
  $('#form_novo_jogo').dialog('close');
}

function salvarNovaAposta() {
}

function onChangeViewApostasJogosJogo() {
}

$(document).ready(function(){
  popularViewAdmTimes();
  popularViewAdmApostadores();
  popularViewAdmJogos();
  popularViewAposta();
  popularFormNovoJogo();
});
