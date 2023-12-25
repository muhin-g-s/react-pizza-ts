<script>
import { SmmInput } from '@goods/smm-ui'
import { useVuelidate } from '@vuelidate/core'

export default {
    setup() {
        return {
            v$: useVuelidate(),
        }
    },
    validations() {
        return {
            value : this.validations
        }
    },
    components: {
        SmmInput
    },
    props: {
        value: String,
        label: String,
        required: Boolean,
        mask: String,
        validations : Object,
        placeholder : String
    },
    data() {
        return {
            currentValue: this.value || '',
        }
    },
    emits: ['updateInput', 'errorOnInput'],
    methods: {
        updateInput() {
            this.$emit('updateInput', this.currentValue)
        },
    },
    computed : {
        printError() {
            if(this.v$.value.$error && this.v$.value.$dirty){
                this.$emit('errorOnInput')
                return `${this.v$.value.$errors[0].$message}`
            }
            return false
        }
    }
}
</script>

<template>
    <SmmInput
        v-model="currentValue"  
        name="input" 
        :error="printError" 
        :placeholder="placeholder"
        :required="required"
        :mask="mask"
        :label="label"
        @update:modelValue="updateInput"
        @change="v$.value.$touch"
    />
</template>