import Logging from "../library/Loggin";
import { ZodType, ZodTypeDef } from "zod";

export const validate = (inputs: unknown, form: ZodType<any, ZodTypeDef>) => {
     Logging.info(inputs);
     return form.parse(inputs);
};