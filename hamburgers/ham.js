class Burger {
    constructor(type, stuffing = cheese , image) {
        this.type = type;
        this.image = image;
        this.stuffing = stuffing;
        this.baseCost = this.getBaseCost();
        this.baseCalories = this.getBaseCalories();
        this.toppings = [];
        this.renderItemBlock()
    }
    getBaseCost() {
        let cost = 0;
        if (this.type === "small"){cost+=50}
        else if (this.type === "big"){cost+=100}
        return cost;
    } // считаем стоимость базы
    getBaseCalories() {
        let cal = 0;
        if (this.type === "small"){cal+=20}
        else if (this.type === "big"){cal+=40}
        return cal;
    } // считаем калории базы
    calcCost() {
        let cost = 0;
        cost += this.baseCost;
        cost += this.stuffing.cost;
        this.toppings.forEach(function(item) {
            cost+=item.cost;
        });
        return cost;
    } // считаем стоимость со всем содержимым
    calcCalories() {
        let cal = 0;
        cal += this.baseCalories;
        cal += this.stuffing.calories;
        this.toppings.forEach(function(item) {
            cal+=item.calories;
        });
        return cal;
    } // считаем калории со всем содержимым
    addTopping(topping) {
        this.toppings.push(topping);
    } // добавляем топпинг
   /* removeTopping(topping) {
        if (this.toppings.includes(topping)) {
            this.toppings.splice(this.toppings.indexOf(topping),1); // удаляем найденный элемент
        }
    } // удаляем топпинг*/
    clearToppings(){
        this.toppings = []
    }
    renderSummary() {
        let htmlBurgerType = `<h2>ВАШ БУРГЕР:</h2>
            <p>База: ${this.type} / калорий ${this.baseCalories} / стоимость ${this.baseCost}</p>
            <p>Начинка: ${this.stuffing.name} / калорий ${this.stuffing.calories} / стоимость ${this.stuffing.cost}</p>
            ${this.getToppingSummary()}
            `;
        // document.querySelector('.burger-type').insertAdjacentHTML("beforeend", htmlBurgerType);
        document.querySelector('.burger-type').innerHTML= htmlBurgerType;
        document.querySelector('.calories').innerText= `${this.calcCalories()}`;
        document.querySelector('.cost').innerText= `${this.calcCost()}`;
    } // отрисовка блока summary с ипользованием getToppingSummary()
    getToppingSummary() {
        let html = '';
        this.toppings.forEach(function (item) {
            html += `<p>Топпинг: ${item.name} / калорий ${item.calories} / стоимость ${item.cost} `
        });
        return html;
    } // отрисовка состава массива toppings[] для renderSummary()
    renderItemBlock() {
        let html = ``;
        html += `<div class="item a_burger" id="${this.type}">`;
        html += `<img alt="" src="${this.image}">`;
        html += `<h3>${this.type} бургер </h3>`;
        html += `<p>Калории: ${this.baseCalories}</p>`;
        html += `<p>Цена: ${this.baseCost}</p>`;
        html += `<p class="tick" >✓</p>`;
        html += `</div>`;
        document.querySelector('.burgers').insertAdjacentHTML('beforeend', html);
    }
}

class Stuffing{
    constructor(name, cost=0,calories=0, image) {
        this.name = name;
        this.cost = cost;
        this.calories = calories;
        this.image= image;
        this.renderItemBlock()
    }
    renderItemBlock(){
        let html = ``;
        html += `<div class="item a_stuffing" id="${this.name}">`;
        html += `<img alt="" src="${this.image}">`;
        html += `<h3>${this.name}</h3>`;
        html += `<p>Калории: ${this.calories}</p>`;
        html += `<p>Цена: ${this.cost}</p>`;
        html += `<p class="tick" >✓</p>`;
        html += `</div>`;
        document.querySelector('.stuffing').insertAdjacentHTML('beforeend', html);
    }
}

class Topping extends Stuffing{
    renderItemBlock(){
        let html = ``;
        html += `<div class="item a_topping" id="${this.name}">`;
        html += `<img alt="" src="${this.image}">`;
        html += `<h3>${this.name}</h3>`;
        html += `<p>Калории: ${this.calories}</p>`;
        html += `<p>Цена: ${this.cost}</p>`;
        html += `<p class="tick" >✓</p>`;
        html += `</div>`;
        document.querySelector('.toppings').insertAdjacentHTML('beforeend', html);
    }
}

// обработка кликов, работа с selected
function click() {
    let classes = this.getAttribute('class');
    // если меняем выбранный бургер, сбрасываем все выбранное ранее (начинка - "сыр")
    if(classes.includes('a_burger') && !classes.includes('selected')){
        document.querySelectorAll('.selected').forEach((item) =>{
            item.setAttribute("class",item.getAttribute("class").replace(" selected",""));
        });
        this.setAttribute("class",classes +=" selected");
    }
    // меняем выбранную начинку
    if(classes.includes('a_stuffing') && !classes.includes('selected')){
        document.querySelectorAll('.a_stuffing.selected').forEach((item) =>{
            item.setAttribute("class",item.getAttribute("class").replace(" selected",""));
        });
        this.setAttribute("class",classes +=" selected");
    }
    // работа с допами (выбрать/убрать)
    if(classes.includes('a_topping')){
        if (!classes.includes('selected')){
            this.setAttribute("class",classes +=" selected");
        }
        else if (classes.includes('selected')) {
            this.setAttribute("class",this.getAttribute("class").replace(" selected",""));
        }
    }

    tickSwitcher();
    updateInfo()
    // console.log(this.getAttribute('class'));
    // console.log(this)
}

function updateInfo() {
    let currentBurger;
    // собираем массив из всех выделенных элементов
    let selected = document.querySelectorAll('.selected');
    // с каждым выделенным элементом делаем следующее:
    selected.forEach((item) => {
        let id = item.getAttribute("id");
        // определяем какой бургер сейчас выбран и запоминаем
        burgersList.forEach((item) => {
            if (item.type === id) {currentBurger = item}

        });
        // определяем какая начинка выбрана для этого бургера
        stuffingList.forEach((item) => {
            if (item.name === id) {currentBurger.stuffing=item}
        });

    });
    // очищаем все топпинги и заполняем заново
    currentBurger.clearToppings();
    selected.forEach((item) => {
        let id = item.getAttribute("id");
        toppingsList.forEach((item) => {
            if (item.name === id) {currentBurger.addTopping(item)}
        });

    });
    currentBurger.renderSummary();
}

// проставляем галочки на всех selected эелементах
function tickSwitcher(){
    document.querySelectorAll('.tick').forEach((item) => item.style.display = "none");
    document.querySelectorAll('.selected .tick').forEach((item) => item.style.display = "block");
}


// массивы с экземплярами классов
let burgersList = [];
let toppingsList = [];
let stuffingList = [];
// создание экземпляров классов
let cheese = new Stuffing("cheese", 10, 20, 'img/cheese.jpg'); //stuffing
let salad = new Stuffing("salad", 20, 5, 'img/salad.jpg'); //stuffing
let fries = new Stuffing("fries",15,10, 'img/fries.png'); //stuffing
let spice = new Topping("spice", 15,0, 'img/spice.jpg'); // topping
let mayonnaise = new Topping("mayonnaise", 20, 5, 'img/majonez.jpg'); // topping
let small = new Burger("small", cheese, 'img/small_burg.jpg');
let big = new Burger("big", cheese, 'img/big_burg.jpg');
burgersList.push(small,big);
toppingsList.push(spice,mayonnaise);
stuffingList.push(cheese,salad,fries);

// отладка
//small.addTopping(spice);
//small.addTopping(mayonnaise);
//small.removeTopping(mayonnaise);
// console.log(small.calcCost());
// console.log(small.calcCalories());
// small.renderSummary();

// навесили слушатель события клик на все .item
document.querySelectorAll('.item').forEach(function (item) {
    item.addEventListener('click', click);
});
