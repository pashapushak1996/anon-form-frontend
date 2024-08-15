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
  Box,
} from "@chakra-ui/react";
import { apiService } from "../service/apiService";
import { SubmitData } from "../types";
import useRecaptcha from "../hooks/useRecaptcha";
import ReCAPTCHA from "react-google-recaptcha";

interface Props {
  showSuccess: () => void;
}

const initialFormState: SubmitData = { text: "", secret_key: "", user_id: "" };

const Form: React.FC<Props> = (props) => {
  const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();
  const [formValues, setFormValues] = useState<SubmitData>(initialFormState);

  const [error, setError] = useState("");
  const [textAreaError, setTextAreaError] = useState("");

  const handleChange =
    (type: "secret_key" | "text" | "user_id") =>
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;

      if (formValues.text.length >= 5000) {
        setTextAreaError("Максимальна кількість символів: 5000.");
      } else {
        setTextAreaError("");
      }

      setFormValues({ ...formValues, [type]: value });
    };

  const onSubmit = async () => {
    if (capchaToken) {
      const { success, message } = await apiService.sendMessage(
        formValues,
        capchaToken,
      );

      if (success) {
        props.showSuccess();

        setFormValues(initialFormState);

        return;
      }

      setError(message);
    }
  };

  const onClick = () => {
    setError("");
  };

  const isButtonDisabled =
    !formValues.text || !formValues.secret_key || !capchaToken || textAreaError;

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
      <Box color={"red.500"}>{textAreaError}</Box>
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
        Унікальний ідентифікатор (ім'я, номер, електронна пошта)
      </FormLabel>
      <Input
        id={"id"}
        boxShadow={"4px 4px 19px -4px rgba(0,0,0,0.45)"}
        color={"gray.800"}
        value={formValues.user_id}
        onChange={handleChange("user_id") as never}
        onClick={onClick}
        mb={2}
      />
      <Box mb={2}>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_TOKEN as string}
          onChange={handleRecaptcha}
        />
      </Box>
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
