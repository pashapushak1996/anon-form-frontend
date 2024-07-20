import { ChangeEvent, useState } from "react";
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

const Form = () => {
  const [formValues, setFormValues] = useState({
    text: "",
    secret_key: "",
    id: "",
  });

  const [error, setError] = useState("");

  const handleChange =
    (type: "secret_key" | "text" | "id") =>
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;

      setFormValues({ ...formValues, [type]: value });
    };

  const onSubmit = async () => {};

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
      <FormLabel optionalIndicator color={"gray.800"} mb={4}>
        Ідентифікатор
      </FormLabel>
      <Input
        boxShadow={"4px 4px 19px -4px rgba(0,0,0,0.45)"}
        color={"gray.800"}
        value={formValues.id}
        onChange={handleChange("id") as never}
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
