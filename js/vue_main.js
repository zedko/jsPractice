const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров
        this.allProducts = [];//массив объектов
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this.render()
            });
    }

    _getProducts(){
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn" data-buyid="${this.id}" onclick="ProductItem.addToBasket(this.dataset.buyid)">Купить</button>
                </div>
            </div>`
    }

    // ДОБАВЛЕНИЕ В КОРЗИНУ ПО КЛИКУ "КУПИТЬ"
    static addToBasket(id) {
        console.log(`Отправляем на нужный для добавления в корзину URL этот ID товара --- ${id}`);
        fetch(`${API}/addToBasket.json`) // получаем ответ сервера и далее обрабатываем его
            .then(responce => responce.json())
            .then(data => data.result=="1"?alert("Добавили(фиктивно)"):alert("Ошибка"))

    };
}

class CartList{
    constructor(container = ".cart-list") {
        this.container = container;
        this.productList = [];
        this.productObjList = [];
        this.total = 0; // общая стоимость корзины
        this.getBasket(); // запрашиваем состояние корзины на сервере
    }

    getBasket() {
        fetch(`${API}/getBasket.json`)
            .then(answer => answer.json())
            .then(data =>{
                this.productList=[...data.contents];  // все товары в корзине
                this.total=data.amount; // общая стоиомость корзины
                this.render()
            })
    }

    render(){
        const block = document.querySelector(this.container);
        block.innerHTML = `Итого: ${this.total}`;

        for (let product of this.productList){
            const cartObj = new CartItem(product);
            this.productObjList.push(cartObj);
            block.insertAdjacentHTML('beforeend', cartObj.render());
        }
    }
}

class CartItem extends ProductItem {
    constructor(product, img = 'https://placehold.it/50x36') {
        super(product, img);
        this.quantity = product.quantity;
    }

    render() {
        return `
        <div class="cart-item">
            <img src=${this.img}/><p><b>${this.title}</b> --- ${this.price}₽ x ${this.quantity} шт.</p>
            <button class="minus-btn" data-idCartItem="${this.id}" onclick="CartItem.removeFromBasket(this.dataset.idcartitem)"> - </button>           
        </div>        
        `
    }

    static removeFromBasket(id) {
        console.log(`Отправляем на нужный для удаления из корзины URL этот ID товара --- ${id}`);
        fetch(`${API}/deleteFromBasket.json`) // получаем ответ сервера и далее обрабатываем его
            .then(responce => responce.json())
            .then(data => data.result=="1"?alert("Удалили(фиктивно)"):alert("Ошибка"))

    };

}



let list = new ProductsList();
let basket = new CartList();




