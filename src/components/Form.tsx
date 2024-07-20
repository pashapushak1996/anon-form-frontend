import { ChangeEvent, useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

const Form = () => {
  const [formValues, setFormValues] = useState({
    text: "",
    secret_key: "",
    id: "",
  });
  const [isError, setIsError] = useState("");

  const handleChange =
    (type: "secret_key" | "text" | "id") =>
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;

      setFormValues({ ...formValues, [type]: value });
    };

  const onSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    // TODO Add api call
  };

  return (
    <FormControl isInvalid={!!isError} onSubmit={onSubmit}>
      <FormLabel color={"gray.800"} mb={4}>
        Feedback
      </FormLabel>
      <Textarea
        height={200}
        resize={"none"}
        boxShadow={"4px 4px 19px -4px rgba(0,0,0,0.45)"}
        color={"gray.800"}
        value={formValues.text}
        onChange={handleChange("text")}
        mb={2}
      />
      <FormLabel color={"gray.800"} mb={4}>
        Secret Key
      </FormLabel>
      <Input
        boxShadow={"4px 4px 19px -4px rgba(0,0,0,0.45)"}
        color={"gray.800"}
        value={formValues.secret_key}
        onChange={handleChange("secret_key") as never}
        mb={2}
      />
      {!isError ? (
        <FormHelperText>
          Enter the email you'd like to receive the newsletter on.
        </FormHelperText>
      ) : (
        <FormErrorMessage>Information is required</FormErrorMessage>
      )}
      <Button
        _hover={{ color: "gray.800", backgroundColor: "gray.200" }}
        backgroundColor={"gray.800"}
        type={"submit"}
      >
        Save your feedback
      </Button>
    </FormControl>
  );
};

export default Form;
