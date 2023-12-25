<template>
    <div>
        <div v-for="(input, index) in inputs" :key="index">
            <input :type="input.type" :placeholder="input.placeholder" v-model="input.value" />
            <button @click="removeInput(index)">Удалить</button>
        </div>
        <button @click="addInput">Добавить</button>
    </div>
</template>
  
<script>
export default {
    props: ['inputs'],
    methods: {
        addInput() {
            this.$emit('addInput');
        },
        removeInput(index) {
            this.$emit('removeInput', index);
        }
    }
};
</script>