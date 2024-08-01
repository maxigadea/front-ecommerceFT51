import { ILoginError, ILoginProps, IRegisterError, IRegisterProps } from "@/interfaces/Types";

export function validateLoginForm(values: ILoginProps) {
    const errors: ILoginError = {}

    if(!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email is not valid"
    }

    return errors;
}


export function validateRegisterForm(values: IRegisterProps) {
    const errors: IRegisterError = {}

    if(!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email is not valid"
    }

    return errors;
}