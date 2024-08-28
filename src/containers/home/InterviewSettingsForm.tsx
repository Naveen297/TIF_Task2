import React, { useState } from "react";
import { Button, Flex, Box, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormSelect from "../../components/formComponents/FormSelect";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";
import { useData } from "./DataProvider"; // Import the useData hook

interface InterviewSettingsFormProps {
  onPrevious: () => void;
}

const InterviewSettingsForm: React.FC<InterviewSettingsFormProps> = ({
  onPrevious,
}) => {
  const { state, setState } = useData()!; // Add '!' to assert that 'useData()' will never return null
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track form submission

  const formik = useFormik<IInterViewSettings>({
    initialValues: state.interviewSettings,
    validationSchema: Yup.object().shape({
      interviewMode: Yup.string().required("Interview Mode is required"),
      interviewDuration: Yup.string().required("Interview Duration is required"),
      interviewLanguage: Yup.string().required("Interview Language is required"),
    }),
    onSubmit: (values) => {
      setState((prevState) => ({
        ...prevState,
        interviewSettings: values,
      }));
      setIsSubmitted(true); // Set submission status to true
    },
  });

  return (
    <Box width="100%" as="form" onSubmit={formik.handleSubmit as any}>
      <Box width="100%">
        {/* Form Fields */}
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          value={formik.values?.interviewMode}
          error={formik.errors?.interviewMode}
          touched={formik.touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          value={formik.values?.interviewDuration}
          error={formik.errors?.interviewDuration}
          touched={formik.touched?.interviewDuration}
        />
        <FormSelect
          label="Interview Language"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          error={formik.errors.interviewLanguage}
          touched={formik.touched.interviewLanguage}
          value={formik.values.interviewLanguage}
        />
        <Flex w="100%" justify="space-between" mt="4rem">
          <Button colorScheme="gray" type="button" onClick={onPrevious}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Submit
          </Button>
        </Flex>
        {isSubmitted && (
          <Text mt="2rem" color="green.500" fontSize="lg">
            The form is fully validated and has been submitted to the attached database.
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default InterviewSettingsForm;
