const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];

// значение по умолчанию - первый объект в массиве products
// передавая в функцию объект мы упростили (и даже улучшили для дальнейших доработок) запись функции
const renderProduct = (product = products[0]) => {
    return `<div class="product-item">
                <h3>${product.title}</h3>
                <p>${product.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};

const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    // преобразование productsList в строку удалит запятые
    document.querySelector('.products').innerHTML = productsList.join("");
};

renderPage(products);