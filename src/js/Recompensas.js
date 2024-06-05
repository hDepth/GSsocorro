document.addEventListener('DOMContentLoaded', function() {

    const items = [
        {
            id: 0,
            nome: 'Caneca GreenBack',
            img: '/src/img/canecaGB.jpg',
            quantidade: 0,
            preco: 100
        },
        {
            id: 1,
            nome: 'GreenBackToy',
            img: '/src/img/carrin.png',
            quantidade: 0,
            preco: 125
        },
        {
            id: 2,
            nome: 'Copo GreenBack',
            img: '/src/img/copogb.jpeg',
            quantidade: 0,
            preco: 150
        },
        {
            id: 3,
            nome: 'GreenBack',
            img: '/src/img/logotipo.png',
            quantidade: 0,
            preco: 175
        },
        {
            id: 4,
            nome: 'GreenBack',
            img: '/src/img/logotipo.png',
            quantidade: 0,
            preco: 200
        },
        {
            id: 5,
            nome: 'GreenBack',
            img: '/src/img/logotipo.png',
            quantidade: 0,
            preco: 225
        },
    ];

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

});
