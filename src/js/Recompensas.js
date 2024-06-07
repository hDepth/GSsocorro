document.addEventListener('DOMContentLoaded', function() {

    const items = [
        {
            id: 0,
            nome: 'Caneca GreenBack R$100,00',
            img: '/src/img/canecaGB.jpg',
            quantidade: 0,
            preco: 100
        },
        {
            id: 1,
            nome: 'GreenBackToy R$125,00',
            img: '/src/img/carrin.png',
            quantidade: 0,
            preco: 125
        },
        {
            id: 2,
            nome: 'Copo GreenBack R$150,00',
            img: '/src/img/copogb.jpeg',
            quantidade: 0,
            preco: 150
        },
        {
            id: 3,
            nome: 'GreenBack R$175,00',
            img: '/src/img/logotipo.png',
            quantidade: 0,
            preco: 175
        },
        {
            id: 4,
            nome: 'GreenBack R$200,00',
            img: '/src/img/logotipo.png',
            quantidade: 0,
            preco: 200
        },
        {
            id: 5,
            nome: 'GreenBack R$225,00',
            img: '/src/img/logotipo.png',
            quantidade: 0,
            preco: 225
        },
    ];

    let saldoGreenbackCoins = 10000;

    function lojaInicio() {
        var containerRecompensas = document.getElementById('produtos');
        items.map((val) => {
            containerRecompensas.innerHTML += `
            <div class="produto-single">
            <img src="`+val.img+`" />
            <p>`+val.nome+`</p>
            <a key="`+val.id+`" href="#" class="add-to-cart">Adicionar ao Carrinho!</a>
            </div>
            `;
        });


        document.querySelector('.cashback').innerHTML += `<p>Saldo de Greenback Coins: ${saldoGreenbackCoins}</p>`;

        document.querySelector('.cashback').innerHTML += `
        <h2>Opções de Cashback:</h2>
        <div class="cashback-options-div"> 
        <ul class="cashback-options">
            <li><button class="cashback-option" data-coins="100" data-value="2.00">100 Greenback Coins - R$2,00</button></li>
            <li><button class="cashback-option" data-coins="250" data-value="5.50">250 Greenback Coins - R$5,50</button></li>
            <li><button class="cashback-option" data-coins="500" data-value="12.00">500 Greenback Coins - R$12,00</button></li>
            <li><button class="cashback-option" data-coins="1000" data-value="25.00">1000 Greenback Coins - R$25,00</button></li>
            <li><button class="cashback-option" data-coins="5000" data-value="150.00">5000 Greenback Coins - R$150,00</button></li>
        </ul>
        </div>
        `;
    }

    function atualizarCarrinho() {
        var containerCarrinho = document.getElementById('carrinho');
        containerCarrinho.innerHTML = "<h2>Carrinho:</h2>";
        items.map((val) => {
            if(val.quantidade > 0) {
                containerCarrinho.innerHTML += `
                <p>
                    `+val.nome+` | quantidade: `+val.quantidade+` 
                    <a href="#" class="remove-from-cart" key="`+val.id+`">Remover</a>
                </p>
                <hr>`;
            }
        });
        var removeLinks = document.getElementsByClassName('remove-from-cart');
        for (var i = 0; i < removeLinks.length; i++) {
            removeLinks[i].addEventListener('click', function() {
                let key = this.getAttribute('key');
                if (items[key].quantidade > 0) {
                    items[key].quantidade--;
                    atualizarCarrinho();
                    greenbackCoins(); 
                }
                return false;
            });
        }
        greenbackCoins(); 
    }

    function greenbackCoins() {
        var totalCoins = 0;
        items.map((val) => {
            totalCoins += val.quantidade * val.preco;
        });
        var containerCoins = document.getElementById('total-coins');
        if (containerCoins) {
            containerCoins.innerHTML = "Total de Coins: " + totalCoins;
        } else {
            var newContainerCoins = document.createElement('div');
            newContainerCoins.id = 'total-coins';
            newContainerCoins.innerHTML = "Total de Coins: " + totalCoins;
            document.body.appendChild(newContainerCoins);
        }
    }

    function resgatarGreenbackCoins() {
        var totalCoinsNoCarrinho = parseInt(document.getElementById('total-coins').textContent.split(":")[1].trim());
        if (saldoGreenbackCoins >= totalCoinsNoCarrinho) {
            saldoGreenbackCoins -= totalCoinsNoCarrinho;
            updateBalance();
            
            items.map((val) => {
                val.quantidade = 0;
            });
            atualizarCarrinho(); 
        } else {
            alert('Saldo insuficiente');
        }
    }

    document.querySelector('.button-resgatar .button').addEventListener('click', function() {
        resgatarGreenbackCoins();
    });

    lojaInicio();

    var addLinks = document.getElementsByClassName('add-to-cart');
    for (var i = 0; i < addLinks.length; i++) {
        addLinks[i].addEventListener('click', function() {
            let key = this.getAttribute('key');
            items[key].quantidade++;
            atualizarCarrinho();
            greenbackCoins(); 
            return false;
        });
    }

    

    document.querySelectorAll('.cashback-option').forEach(item => {
        item.addEventListener('click', event => {
            const coins = parseInt(item.getAttribute('data-coins'));
            const value = parseFloat(item.getAttribute('data-value'));
            if (saldoGreenbackCoins >= coins) {
                showConfirmationModal(coins, value);
            } else {
                alert('Você não tem saldo suficiente para essa transação.');
            }
        });
    });

    function showConfirmationModal(coins, value) {
        const modal = document.createElement('div');
        modal.classList.add('modal');

        modal.innerHTML = `
            <div class="modal-content">
                <h2>Confirmação</h2>
                <p>Você está prestes a resgatar ${coins} Greenback Coins por R$${value.toFixed(2)}. Deseja continuar?</p>
                <button class="confirm-button">Confirmar</button>
                <button class="cancel-button">Cancelar</button>
            </div>
        `;

        document.body.appendChild(modal);

        const confirmButton = modal.querySelector('.confirm-button');
        const cancelButton = modal.querySelector('.cancel-button');

        confirmButton.addEventListener('click', () => {
            saldoGreenbackCoins -= coins;
            updateBalance();
            closeModal(modal);
        });

        cancelButton.addEventListener('click', () => {
            closeModal(modal);
        });
    }

    function closeModal(modal) {
        modal.remove();
    }

    function updateBalance() {
        document.querySelector('.cashback p').textContent = `Saldo de Greenback Coins: ${saldoGreenbackCoins}`;
    }

});
