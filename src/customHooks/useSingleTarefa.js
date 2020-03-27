import { useEffect } from "react";
import { useForm } from "./userForm";
import tarefaSchema from "../schemas/orcamento/tarefaSchema";

export const useSingleTarefa = tarefa => {
  const formState = {};
  const { schema } = tarefaSchema;
  const [currentFormState, handleChange, canSubmit, setFormValues] = useForm({
    formState,
    schema
  });

  useEffect(() => {
    setFormValues({
      data: tarefa,
      errors: [],
      saved: tarefa.total !== "0" ? true : false
    });
  }, [setFormValues, tarefa]);

  return { currentFormState, handleChange, canSubmit, setFormValues };
};
