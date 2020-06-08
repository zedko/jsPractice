Vue.component('search',{
    props: {
        value:{
            type: [String, Number],
            default: ''
        },
    },


    template: `<form class="search" action="" v-on:submit.prevent="$emit('filter',value)">
                        <input
                        :value="value"
                        @input="$emit('input', $event.target.value)"
                        @keyup="$emit('filter',value)"
                        placeholder="Искать ..." type="search"
                        >

                        <button  type="submit"></button>
                   </form>`
});