Vue.component('products',{
    props:['products'],
    template:`<div>
                        <h1 class="catalog">Каталог товара</h1>
                        <div class="products" id="products">
                            <product v-for="item of products.filtered" :key="item.id" :item="item"></product>
                        </div>
                    </div>`
});
Vue.component('product',{
    props: ['item'],
    template: `
            <div class="product-item">
                <img :src="item.img" alt="Some img">
                <div class="desc">
                    <h3>{{item.title}}</h3>
                    <p>{{item.price}}</p>
                    <button class="buy-btn" :id="item.id" @click="$parent.$emit('buy',item.id)">Купить</button>
                </div>
            </div>
        `
});