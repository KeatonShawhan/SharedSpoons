import Joi from "joi";

const commentSchema = Joi.object({
    text: Joi.string().min(1).max(500).required()
});

export { commentSchema };