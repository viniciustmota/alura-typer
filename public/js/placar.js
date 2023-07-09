$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);
$("#botao-limpa-placar").click(removeTodasLinhas);
function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Douglas"
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha);
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
    event.preventDefault();
    $(this).parent().parent().remove();
}

function mostraPlacar() {
    $(".placar").stop().slideToggle(600);
}

function removeLinha() {
    event.preventDefault();
    var linha = $(this).parent().parent();
    console.log(this);
    console.log(linha);

    linha.fadeOut(1000);
    setTimeout(function() {
        linha.remove();
    }, 1000);
}

function removeTodasLinhas() {
    event.preventDefault();
    let todasLinhas = $(".botao-remover").parent().parent();
    

    todasLinhas.fadeOut(1000);
    setTimeout(function() {
        todasLinhas.remove();
    }, 1000);
}

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val();
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.prepend(linha);
    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;

    $("body").animate(
    {
        scrollTop: posicaoPlacar + "px"
    }, 1000);
}

function sincronizaPlacar(){
    let placar = [];
    let linhas = $("tbody>tr");
    linhas.each(function(){
        let usuario = $(this).find("td:nth-child(1)").text();
        let palavras = $(this).find("td:nth-child(2)").text();
        
        let score = {
            usuario: usuario,
            pontos: palavras
        }

        placar.push(score);

    });
    console.log(placar);
    let dados = {
        placar: placar
    };
    $.post("http://localhost:3000/placar", dados, function(){
        console.log("Salvou o placar no servidor");
        $(".tooltip").tooltipster("open").tooltipster("content","Sucesso ao sincronizar");
    }).fail(function(){
        $(".tooltip").tooltipster("open").tooltipster("content","Falha ao sincronizar");
    })
    .always(function(){
        setTimeout(function(){
            $(".tooltip").tooltipster("close");
        },2000);
    })
}

function atualizaPlacar(){
    $.get("http://localhost:3000/placar",function(data){
        $(data).each(function(){
        let linha = novaLinha(this.usuario, this.pontos);
        linha.find(".botao-remover").click(removeLinha);
        $("tbody").append(linha);
        })
    })
}
