import { z } from "zod";
export const FormUser=z.object({
    name:z.string({
        required_error:" name is required",
        invalid_type_error:"name must be a string"
    }).min(1).max(50),
    dob:z.string(),
    sexe:z.enum(["MALE", "FEMELLE"]),
    password:z.string().min(1).max(40),
    password_confirmed:z.string(),
    email:z.string().email()
})
;
export const FormCreateUser=FormUser
.refine((data)=> data.password===data.password_confirmed,{
    message:"Oops! password doesn't match"
})
export type FormCreateUserType=z.infer<typeof FormCreateUser>;

export const FormUpdateUser = FormUser.partial()
.refine((data)=> Object.keys(data).length,{
    message:"Oops! body is empty"
})

