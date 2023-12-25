import { email, required, minLength } from '@vuelidate/validators'

export const validatorEmail = {
      $validator: email.$validator,
      $message: "Введите корректный email",
}

export const validatorRequired = {
      $validator: required.$validator,
      $message: "Поле обязательно для заполнения",
}

export const validatorMinLength = (min) => {
      return {
            $validator: minLength(min).$validator,
            $message: "Введите корректный номер телефона",
      }
}