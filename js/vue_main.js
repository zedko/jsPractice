const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
/*
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
let basket = new CartList();*/

//все товары, которые есть в магазине. наполняется из файла catalogData.json
class ProductList{
    // url - catalogData.json
    constructor(url) {
        this.goods = [];//массив товаров
        this.filtered = this.goods;
        this._getProducts(url);
    }

    _getProducts(url){
            fetch(`${API}/${url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
            .then(data => {
                    [...data].forEach(item => this.goods.push(new Product(item)));
                });
    }

    filter(str) {
        let pattern = new RegExp(str,"i");
        this.filtered = this.goods.filter(item => {
            if (item.title.match(pattern)!=null)
                return item;
        })
    }
}

class Product {
    constructor(product, img = 'https://placehold.it/200x150', quantity = 0){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
        this.smallImg = 'https://placehold.it/50x30';
        this.cartQuantity = quantity;
    }
}

class Cart extends ProductList{
    constructor(url) {
        super(url);
        this.amount = 0;
        this.countGoods = 0;
        this.shown = false
    }
    _getProducts(url){
        fetch(`${API}/${url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
            .then(data => {
                // ищем среди ответа сервера товары, которые есть в нашем магазине (в ProductList.goods) и добавляем их в корзину с нужными параметрами.
                [...data.contents].forEach(product => {
                    let productCheck = vm.products.goods.find(item => item.id === product.id_product);
                    if (productCheck === undefined){
                        console.log("Этого продукта нет в магазине")
                    }
                    else {this.goods.push(productCheck);
                    productCheck.cartQuantity = product.quantity}
                });
                this.amount = data.amount;
                this.countGoods = data.countGoods;
            });
    }
// Добавляем элемент в корзину, если его там нет или прибавляем количество
    addItem(id) {
        let product = this.goods.find(item => item.id == id);
        if (product === undefined){
            product = vm.products.goods.find(item => item.id == id);
            this.goods.push(product);

        }
            product.cartQuantity++;
            this.amount += product.price;
    }
    // Уменьшаем количество или удаляем элемент из корзины если количество = 0
    removeItem (id) {
        let product = this.goods.find(item => item.id == id);
        product.cartQuantity--;
        this.amount -= product.price;
        if (product.cartQuantity === 0){
            this.goods.splice(this.goods.findIndex(item => item == product),1);
            console.log("Ушли в нули");
        }
        // else {
        //     product.cartQuantity--;
        //     console.log(false);
        // }
        // console.log(product);
        // this.goods.push(product);
    }
}


let vm = new Vue({
    el:'#vueapp',
    data:{
        products: new ProductList("catalogData.json"),
        cart: new Cart("getBasket.json"),
        search: ""


    },
    methods:{
        toCart: function(id){
            console.log(`Покупаем товар с ID ${id}`);
            this.cart.addItem(id);
        },
        toggleCart: function() {
            this.cart.shown =  !this.cart.shown
        },
        filter: function(str) {
            this.products.filter(str)
        },





    }
});

