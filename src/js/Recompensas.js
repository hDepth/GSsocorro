document.addEventListener('DOMContentLoaded', function() {

    const items = [
        {
            id: 0,
            nome: 'Caneca GreenBack',
            img: '/src/img/logotipo.png',
            quantidade: 0
        },
        {
            id: 1,
            nome: 'GreenBackToy',
            img: '/src/img/logotipo.png',
            quantidade: 0
        },
        {
            id: 2,
            nome: 'Copo GreenBack',
            img: '/src/img/logotipo.png',
            quantidade: 0
        },
    ]

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
                }
                return false;
            });
        }
    }

    lojaInicio();

    var addLinks = document.getElementsByClassName('add-to-cart');
    for (var i = 0; i < addLinks.length; i++) {
        addLinks[i].addEventListener('click', function() {
            let key = this.getAttribute('key');
            items[key].quantidade++;
            atualizarCarrinho();
            return false;
        });
    }

});
