import {z} from 'zod';

const FormTacheCreate=z.object({
    title:z.string().min(4).max(15),
    description:z.string().min(10).max(200),
    date:z.string(),
    user:z.string(),
})