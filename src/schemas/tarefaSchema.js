import Joi from "joi-browser";

const tarefaSchema = {
  tarefa: Joi.string()
    .required()
    .label("Tarefa"),
  descricao: Joi.string()
    .required()
    .label("Descritivo"),
  quantidade: Joi.number()
    .min(0.1)
    .label("Quantidade"),
  custoUnitario: Joi.string().label("custo unitário"),
  total: Joi.number()
};

export default {
  schema: tarefaSchema
};
