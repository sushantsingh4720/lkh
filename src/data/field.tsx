import { useFormInput } from "./utils";

interface InputProps {
    type: string;
    placeholder: string;
}

interface InputField {
    id: string;
    label: string;
    required: boolean;
    input: {
        props: InputProps;
        state: ReturnType<typeof useFormInput>;
    };
}

export const useSignupFields = (): InputField[] => {
    return [
        {
            id: "name",
            label: "Name",
            required: true,
            input: {
                props: {
                    type: "text",
                    placeholder: "Joe Bloggs"
                },
                state: useFormInput("")
            }
        },
        {
            id: "email",
            label: "Email",
            required: true,
            input: {
                props: {
                    type: "email",
                    placeholder: "joe@bloggs.com"
                },
                state: useFormInput("")
            }
        },
        {
            id: "password",
            label: "Password",
            required: true,
            input: {
                props: {
                    type: "password",
                    placeholder: "*********"
                },
                state: useFormInput("")
            }
        }
    ];
}

export const useLoginFields = (): InputField[] => {
    return [
        {
            id: "email",
            label: "Email",
            required: true,
            input: {
                props: {
                    type: "email",
                    placeholder: "joe@bloggs.com"
                },
                state: useFormInput("")
            }
        },
        {
            id: "password",
            label: "Password",
            required: true,
            input: {
                props: {
                    type: "password",
                    placeholder: "*******"
                },
                state: useFormInput("")
            }
        }
    ];
}