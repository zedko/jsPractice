Vue.component('cart',{
    props:['cart'],
    template:`<div class="cart-block">
                        <div class="cart-summary">Итог {{cart.amount}} ₽</div>
                        <button class="btn-cart" type="button" @click="$emit('show')"> <img src="online.png" alt=""></button>
                        <div v-if="cart.shown" class="cart-list">
                            <p v-show="cart.goods.length == 0">Корзина пуста</p>
                            <div class="cart-item" v-for="product of cart.goods" :key="product.id">
                                <img :src="product.smallImg"/><p><b>{{product.title}}</b> --- {{product.price}}₽ x {{product.cartQuantity}} шт.</p>
                                <button class="minus-btn" @click="cart.removeItem(product.id)"> - </button>
                            </div>
                        </div>
                    </div>`
});