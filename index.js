/* DOCUMENTAÇÃO - HOTEL SUICIDIO PROIBIDO
O programa abaixo foi criado para a administração de um Hotel, permitindo o úsuario fazer uma reserva,
 relatar um problema, sair do hotel, cancelar uma reserva e Listar os quartos disponiveis... 
 abaixo vou passar um guia rapido de como funciona o código.

-- Funcionalidades Principais --
* 1. Menu Principal: Permite aos usuários realizar operações como reservar um quarto, cancelar uma 
reserva,listar quartos disponíveis e sair do hotel.
* 2. Menu de Administração: Fornece funcionalidades exclusivas de administração, como adicionar ou 
remover quartos e Listar todos os quartos disponíveis.
* 3. Adicionar Quarto: Permite adicionar um novo quarto ao sistema, especificando seu tipo e descrição.
* 4. Listar Quartos: Mostra a Lista de todos os quartos disponíveis no sistema.
* 5. Remover Quarto: Permite remover um quarto existente do sistema.
* 6. Nova Reserva: Permite fazer uma nova reserva de quarto, registrando-a no sistema.
* 7. Cancelar Reserva: Permite cancelar uma reserva existente.
* 8. Listar Quartos Disponíveis: Mostra a Lista de quartos disponíveis para reserva.
Os menus foram feito a partir de else, else if e braks... Botando cada número para ter uma funcionalidade 
dentro dos prompts. Quando o úsuario digitar ou fazer algum comando errado, o programa ativara as 
funções de 'alerts' para alertar o úsuario o seu erro... com os 'breaks' poderemos parar os prompts 
ou voltar alguma função.

No inicio do codigo pode-se perceber que usamos imports de outras classes, dentro desses imports 
contem um código, encontrado no classes e no objetos.js, e tudo que fizermos nos prompts ficam 
salvos em um banco de dados temporario que fica ativo naquele momento, para podermos se mover de 
um prompt para outro, e quando atualizamos o site apaga todas as informações. |

Autores: Arthur, Rafael e Cristian
* Data de Criação: 15/03/24
* ULtima Atualizacdo: 11/04/2024 */



import { database } from './objetos.js';
import { Reserva } from './classes.js';

function menuPrincipal() {
    var opcaoMenu = Number(
        prompt(
            'Bem-vindo ao Hotel Suicidio Proibido! 💀 \n\nDigite abaixo o que deseja fazer ou digite sair:\n\n1 - Reservar um quarto 🛌\n2 - Cancelar uma reserva 🚫\n3 - Listar quartos disponíveis 🏨\n4 - Relatar um problema 🚨\n5 - Sair do hotel tranquilamente 😌'
        )
    );

    if (opcaoMenu == 1) {
        novaReserva();
    } else if (opcaoMenu == 2) {
        cancelarReserva();
    } else if (opcaoMenu == 3) {
        listarQuartosDisponíveis();
    } else if (opcaoMenu === 4) {
        alert('Vou fingir que você não fez isso');
        0;
        menuPrincipal();
    } else if (opcaoMenu === 5) {
        alert('Você cometeu suicídio, que peninha, estamos horrorizados com tal acontecimento!');
    } else if (opcaoMenu === 109) {
        menuAdmin();
    } else {
        alert('Faz alguma coisa direito!');
        menuPrincipal();
    }
}

function menuAdmin() {
    alert('São uns vermes mesmo, não acha? Pois eu acho!');
    while (true) {
        var opcaoAdmin = Number(prompt('Vai querer fazer o que...?\n\nEspero que não esqueça dos comandos como da outra vez, ou terá consequências\n\n1 - Adicionar Quarto 🛏️✅\n2 - Remover Quarto 🛏️🚫\n3 - Lista de Quartos 🏨\n4 - Voltar 💻'));

        if (opcaoAdmin === 1) {
            adicionarQuarto();
            break;
        } else if (opcaoAdmin === 2) {
            removerQuarto();
            break;
        } else if (opcaoAdmin === 3) {
            lerQuartos();
            continue;
        } else if (opcaoAdmin === 4 || opcaoAdmin === 'voltar' || opcaoAdmin === 'VOLTAR') {
            //menuPrincipal();
            break;
        } else {
            continue;
        }
    }
}

function adicionarQuarto() {
    while (true) {
        var tipo = prompt('Que tipo de quarto deseja adicionar?\n\nTipos existentes:\n💎 VIP\n🛏️ Comum\n\n("pare" ou break")');
        if (tipo === 'pare' || tipo === 'PARE' || tipo === 'break' || tipo === 'BREAK') {
            menuAdmin();
            break;
        }

        var descricao = '';
        if (tipo === 'VIP' || tipo === 'vip') {
            descricao = 'Quarto VIP: Espaçoso, confortável e com vista panorâmica.';
        } else if (tipo === 'COMUM' || tipo === 'comum') {
            descricao = 'Quarto Comum: Simples e confortável.';
        } else {
            console.log('Tipo de quarto inválido!');
            continue;
        }

        var maiorId = 0;

        for (let quarto of database.quartosdb) {
            if (quarto.id > maiorId) {
                maiorId = quarto.id;
            }
        }

        const proximoId = maiorId + 1;
        const disponibilidade = 1;
        const id = proximoId;
        const quarto = { id, tipo, descricao, disponibilidade };
        database.quartosdb.push(quarto);
        console.clear();
        console.log('Quarto adicionado com sucesso! Quantidade de quartos: ', database.quartosdb.length);
    }
}

function lerQuartos() {
    console.clear();
    console.log('Aqui está a lista de quartos existentes:\n\n');
    database.quartosdb.forEach((quarto) => {
        var descShow = '';
        if (quarto.disponibilidade === 1) {
            descShow = 'Disponível';
        } else {
            descShow = 'Indisponível';
        }
        console.log(`ID: ${quarto.id}, Tipo: ${quarto.tipo}, Descrição: ${quarto.descricao} **${descShow}**`);
    });
}

function removerQuarto() {
    lerQuartos();

    while (true) {
        lerQuartos();
        const idRemover = Number(prompt('Qual quarto você deseja remover? (verificar lista de quartos em console.log)\n\nLembre-se, depois de removido, não tem volta, e o índice começa por 0.\n\n* 109109 para sair.'));
        if (idRemover === 109109) {
            menuAdmin();
            break;
        }
        const id = idRemover;
        if (!isNaN(id)) {
            const indexQuarto = database.quartosdb.findIndex((quarto) => quarto.id === id);
            if (indexQuarto >= 0) {
                database.quartosdb.splice(indexQuarto, 1);
                alert(`Quarto ${idRemover} removido!`);
                lerQuartos();
            } else {
                alert('Não foi encontrado um quarto com esse ID! ' + id);
            }
        } else {
            alert('Digita algo direito!');
            continue;
        }
    }
}

function novaReserva() {
    const nomeReservante = prompt('Digite o seu nome ou "voltar" para retornar ao menu.');
    if (nomeReservante === 'voltar') {
        menuPrincipal();
        return;
    }

    const tipoQuarto = prompt("Digite o tipo de quarto desejado:\nVIP 💎\nComum 🛏️\nDigite 'voltar' para retornar ao menu.");
    if (tipoQuarto === 'voltar') {
        menuPrincipal();
        return;
    }

    const tipoQuartoFormatado = tipoQuarto.toUpperCase();
    if (!['VIP', 'COMUM'].includes(tipoQuartoFormatado)) {
        alert('Tipo de quarto inválido.');
        novaReserva();
        return;
    }

    console.clear();
    const quartosDisponiveis = database.quartosdb.filter((quarto) => quarto.tipo.toUpperCase() === tipoQuartoFormatado && quarto.disponibilidade === 1);
    console.log(`Quartos ${tipoQuartoFormatado} disponíveis:`);
    if (quartosDisponiveis.length === 0) {
        console.log('Nenhum quarto disponível.');
    } else {
        quartosDisponiveis.forEach((quarto) => {
            console.log(`ID: ${quarto.id}, Descrição: ${quarto.descricao}`);
        });
    }

    const idQuarto = Number(prompt('Digite o ID do quarto desejado'));

    const quartoSelecionado = quartosDisponiveis.find((quarto) => quarto.id === idQuarto);

    if (!quartoSelecionado) {
        alert(`Quarto selecionado não faz parte da categoria *${tipoQuartoFormatado}* ou está indisponível. Voltando à página inicial.`);
        //novaReserva();
        menuPrincipal();
    }

    quartoSelecionado.disponibilidade = 0;
    const dataReserva = new Date();
    const reserva = new Reserva(idQuarto, nomeReservante, tipoQuartoFormatado, dataReserva);
    database.reservasdb.push(reserva);
    alert(`Quarto ${idQuarto} reservado com sucesso para ${nomeReservante}.`);

    menuPrincipal();
}

function cancelarReserva() {
    const idQuarto = Number(prompt('Digite o ID do quarto que deseja cancelar a reserva ou digite "voltar" para retornar ao menu.'));

    if (isNaN(idQuarto) || idQuarto <= 0) {
        alert('ID do quarto inválido.');
        menuPrincipal();
        return;
    }

    const quartoSelecionado = database.quartosdb.find((quarto) => quarto.id === idQuarto && quarto.disponibilidade === 0);

    if (!quartoSelecionado) {
        alert('Quarto selecionado não está reservado ou não existe.');
        menuPrincipal();
        return;
    }

    quartoSelecionado.disponibilidade = 1;
    alert(`Reserva do quarto ${idQuarto} cancelada.`);
    menuPrincipal();
}

function listarQuartosDisponíveis() {
    console.clear();
    console.log('Todos os quartos disponíveis:');
    database.quartosdb.forEach((quarto) => {
        if (quarto.disponibilidade === 1) {
            console.log(`ID: ${quarto.id}, Tipo: ${quarto.tipo}, Descrição: ${quarto.descricao}`);
        }
    });
    menuPrincipal();
}


addEventListener("DOMContentLoaded", function() {
    document.getElementById("painel-admin").addEventListener("click",menuAdmin);
    document.getElementById("menu-usuario").addEventListener("click",menuPrincipal);

});