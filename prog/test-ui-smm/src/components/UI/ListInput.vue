<script>
import { SmmText } from '@goods/smm-ui'
import { useVuelidate } from '@vuelidate/core'

import WrapperInput from './WrapperInput.vue'
import iconPlus from '../../icon/IconPlus.vue'
import iconTrash from '../../icon/IconTrash.vue'

export default {
    components: {
        WrapperInput,
        iconPlus,
        iconTrash,
        SmmText,
    },
    setup() {
        return {
            v$: useVuelidate(),
        }
    },
    validations() {
        return {
            data: this.validations,
        }
    },
    props: {
        additionalInput: Array,
        input: String,
        mask: String,
        label: String,
        type: String,
        validations: Object,
        placeholder: String,
    },
    emits: ['onClickRemove', 'onClickAdd', 'updateValueAdditionals', 'updateBaseValue'],
    methods: {
        updateValueAdditionals(index, value) {
            this.$emit('updateValueAdditionals', index, value)
        },
        updateBaseValue(value) {
            this.$emit('updateBaseValue', value)
        },
        erroOnInput() {
            console.log("error")
        }
    },
}
</script>

<template>
    <wrapper-input 
        :value="input" 
        :validations="validations"
        :label="label"
        :required="true"
        :mask="mask"
        :placeholder="placeholder"
        @errorOnInput="erroOnInput"
        @updateInput="updateBaseValue($event)"
    />
    <div v-for="(value, index) in additionalInput" :key="index" class="list-additional">
        <wrapper-input 
            :value="value" 
            :validations="validations"
            :label="label"
            :required="false"
            :mask="mask"
            :placeholder="placeholder"
            class="list-additional__input"
            @errorOnInput="erroOnInput"
            @updateInput="updateValueAdditionals(index, $event)" 
        />
        <iconTrash class="list-additional__icon-trash" @click="$emit('onClickRemove', index)" />
    </div>

    <div v-if="additionalInput.length < 2" class="add-additional" @click="$emit('onClickAdd')">
        <iconPlus/>
        <SmmText size="md" weight="semibold" color="#9B38DC" mod="transparent">Email</SmmText>
    </div>
</template>

<style scoped>
.list-additional {
    padding-top: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.list-additional__icon-trash {
    width: 20px;
    height: 20px;
    color: #31373B;
    cursor: pointer;
}

.list-additional__input {
    min-width: 325px;
}

.add-additional {
    margin-top: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: flex-start;
    cursor: pointer;
}
</style>