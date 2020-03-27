import Joi from "joi-browser";

const tarefaSchema = {
  tarefaId: Joi.any(),
  tipoDeTarefa: Joi.string()
    .required()
    .label("Tipo de tarefa"),
  descricao: Joi.string()
    .required()
    .label("Descritivo"),
  quantidade: Joi.number()
    .min(0.1)
    .label("Quantidade"),
  custoUnitario: Joi.number().label("custo unitário"),
  total: Joi.number()
};

export default {
  schema: tarefaSchema
};
