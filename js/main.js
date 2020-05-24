class ProductsList{
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchProduct();
        this.render();
    }
    _fetchProduct(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }

    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend',productObj.render());
            //block.innerHTML += productObj.render();
        }
    }

    // решение задания 2 / создание метода
    summary() {
        let result = 0;
        this.goods.forEach((item) => result+=item.price)
        return result;
    }
}

class ProductItem{
    constructor(product, img="https://placehold.it/200x150"){
        this.title = product.title;
        this.id = product.id;
        this.img = img;
        this.price = product.price;
    }

    render(){
        return `<div class="product-item">
                <img alt="some img" src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }

}

//решение задания 1 / создание класса корзины товаров
class cartList{
// понадобится метод подсчета суммы корзины
//     метод добавления предмета в корзину
//     метод удаления предмета из корзины
    
}
//решение задания 1 / создание класса эелемента корзины товаров
class cartItem{
// Я бы делал этот класс на основе ProductItem (class cartItem extends ProductItem)
//     переопределил бы метод render и, возможно не использовал бы this.img
}
let list = new ProductsList();
// решение задания 2 / вывод
console.log(list.summary())