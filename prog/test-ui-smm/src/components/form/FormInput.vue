<script>
import { SmmCol, SmmInput, SmmRow, SmmText, SmmTitle } from '@goods/smm-ui'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import { validatorEmail, validatorRequired, validatorMinLength } from '../../util/castomValidator'

import ListInput from '../UI/ListInput.vue';

export default {
    setup() {
        return {
            v$: useVuelidate()
        }
    },
    validations() {
        return {
            name: { required },
            address: { required },
        }
    },
    components: {
        SmmCol,
        SmmInput,
        SmmRow,
        SmmText,
        SmmTitle,
        ListInput,
    },
    data() {
        return {
            name: '',
            address: '',
            baseEmail: '',
            basePhoneNumber: '',
            additionalEmails: [],
            additionalPhoneNumbers: [],
            validationEmail: [validatorEmail, validatorRequired],
            validationPhoneNumber: { v: validatorMinLength(16), validatorRequired },
        }
    },
    methods: {
        onClickAddEmail() {
            this.additionalEmails.push('')
        },
        onClickAddPhoneNumber() {
            this.additionalPhoneNumbers.push('')
        },
        updateAdditionalEmail(index, value) {
            this.additionalEmails[index] = value
        },
        onClickRemoveEmail(index) {
            this.additionalEmails.splice(index, 1)
        },
        onClickRemovePhoneNumber(index) {
            this.additionalPhoneNumbers.splice(index, 1)
        },
        updatePhoneNumber(index, value) {
            this.additionalPhoneNumbers[index] = value
        },
        updateBaseEmail(value) {
            this.baseEmail = value
        },
        updateBasePhoneNumber(value) {
            this.basePhoneNumber = value
        }
    },
}
</script>

<template>
    <div class="form">

        <div class="form__title">
            <SmmTitle>Склад</SmmTitle>
            <div class="status">
                <SmmText size="sm" weight="semibold" color="#494F54">Неактивен</SmmText>
            </div>
        </div>

        <SmmInput name="Name" label="Название" placeholder="Введите" :required="true" v-model="v$.name.$model"
            :error="v$.name.$error && v$.name.$dirty ? 'Обязательное поле' : ''" />

        <SmmInput name="Address" label="Адрес" placeholder="Населенный пункт,улица,дом,строение" :required="true"
            v-model="v$.address.$model" :error="v$.address.$error && v$.address.$dirty ? 'Обязательное поле' : ''" />

        <SmmRow>
            <SmmCol :size="6">
                <list-input :input="baseEmail" label="Email" type="email" :additionalInput="additionalEmails"
                    @onClickRemove="onClickRemoveEmail" @onClickAdd="onClickAddEmail"
                    @updateValueAdditionals="updateAdditionalEmail" @updateBaseValue="updateBaseEmail"
                    :validations="validationEmail" placeholder="Введите" />

            </SmmCol>
            <SmmCol :size="6">
                <list-input :input="basePhoneNumber" label="Номер телефона" type="email"
                    :additionalInput="additionalPhoneNumbers" @onClickRemove="onClickRemovePhoneNumber"
                    @onClickAdd="onClickAddPhoneNumber" @updateValueAdditionals="updatePhoneNumber"
                    @updateBaseValue="updateBasePhoneNumber" :validations="validationPhoneNumber" mask="+{7}(000)000-00-00"
                    placeholder="Введите" />
            </SmmCol>
        </SmmRow>
    </div>
</template>

<style scoped>
.form {
    width: 720px;
    display: flex;
    flex-direction: column;
    gap: 36px
}

.form__title {
    display: flex;
    gap: 13.5px;
    padding-bottom: 8px;
}

.status {
    height: 24px;
    width: 83px;
    display: inline-flex;
    padding: 4px 8px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    line-height: 16px;
    letter-spacing: -0.24px;
    font-style: normal;
    border-radius: 8px;
    background-color: #EEF1F2;
}
</style>