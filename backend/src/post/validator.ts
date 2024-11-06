import joi from 'joi';

const postDataSchema = joi.object({
    image: joi.string().optional(),
    rating: joi.number().min(1).max(5).required(),
    adds: joi.number().optional(),
    restaurant: joi.string().max(255).required(),
    dish: joi.string().max(255).required(),
    time: joi.string().optional(),
    caption: joi.string().max(750).optional()
});

const editPostDataSchema = joi.object({
    rating: joi.number().min(1).max(5).optional(),
    caption: joi.string().max(750).optional()
});

export { editPostDataSchema, postDataSchema };