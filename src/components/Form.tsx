import React, { ChangeEvent, useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  FormHelperText,
  FormErrorIcon,
} from "@chakra-ui/react";
import { apiService } from "../service/apiService";
import { SubmitData } from "../types";

interface Props {
  showSuccess: () => void;
}

const initialFormState: SubmitData = { text: "", secret_key: "", user_id: "" };

const Form: React.FC<Props> = (props) => {
  const [formValues, setFormValues] = useState<SubmitData>(initialFormState);

  const [error, setError] = useState("");

  const handleChange =
    (type: "secret_key" | "text" | "user_id") =>
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;

      setFormValues({ ...formValues, [type]: value });
    };

  const onSubmit = async () => {
    const { success, message } = await apiService.sendMessage(formValues);

    if (success) {
      props.showSuccess();

      setFormValues(initialFormState);

      return;
    }

    setError(message);
  };

  const onClick = () => {
    setError("");
  };

  const isButtonDisabled = !formValues.text || !formValues.secret_key;

  return (
    <FormControl isRequired>
      <FormErrorMessage>
        {" "}
        <FormErrorIcon />
        {error}
      </FormErrorMessage>
      <FormLabel htmlFor={"text"} color={"gray.800"} mb={4}>
        Відгук
      </FormLabel>
      <Textarea
        id={"text"}
        height={200}
        resize={"none"}
        boxShadow={"4px 4px 19px -4px rgba(0,0,0,0.45)"}
        color={"gray.800"}
        value={formValues.text}
        onChange={handleChange("text")}
        onClick={onClick}
        mb={1}
      />
      <FormHelperText color={"gray.800"} mb={4}>
        Ми цінуємо вашу думку
      </FormHelperText>
      <FormLabel color={"gray.800"} mb={4}>
        Код верифікації
      </FormLabel>
      <Input
        boxShadow={"4px 4px 19px -4px rgba(0,0,0,0.45)"}
        color={"gray.800"}
        value={formValues.secret_key}
        onChange={handleChange("secret_key") as never}
        onClick={onClick}
        mb={4}
      />
      <FormLabel
        htmlFor={"id"}
        requiredIndicator={""}
        color={"gray.800"}
        mb={4}
      >
        Ідентифікатор
      </FormLabel>
      <Input
        id={"id"}
        boxShadow={"4px 4px 19px -4px rgba(0,0,0,0.45)"}
        color={"gray.800"}
        value={formValues.user_id}
        onChange={handleChange("user_id") as never}
        onClick={onClick}
        mb={1}
      />
      <FormHelperText color={"gray.800"} mb={4}>
        Це може бути будь що ( Імʼя, номер, емейл )
      </FormHelperText>
      <Button
        isDisabled={isButtonDisabled}
        onClick={onSubmit}
        colorScheme="teal"
      >
        Зберегти думку або відгук
      </Button>
    </FormControl>
  );
};

export default Form;
