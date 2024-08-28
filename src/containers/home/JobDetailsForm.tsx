import React from "react";
import { Button, Flex, Box } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/formComponents/FormInput";
import { IJobDetails } from "../../interface/forms";
import { useData } from "./DataProvider"; // Import the useData hook

interface JobDetailsFormProps {
  onNext: () => void;
  onPrevious: () => void;
}

const JobDetailsForm: React.FC<JobDetailsFormProps> = ({
  onNext,
  onPrevious,
}) => {
  const { state, setState } = useData()!; // Add '!' to assert that the value is not null or undefined

  const formik = useFormik<IJobDetails>({
    initialValues: state.jobDetails,
    validationSchema: Yup.object().shape({
      jobTitle: Yup.string().required("Job Title is required"),
      jobDetails: Yup.string().required("Job Details is required"),
      jobLocation: Yup.string().required("Job Location is required"),
    }),
    onSubmit: (values) => {
      setState((prevState) => ({
        ...prevState,
        jobDetails: values,
      }));
      onNext();
    },
  });

  return (
    <Box width="100%" as="form" onSubmit={formik.handleSubmit as any}>
      <Box width="100%">
        {/* Form Fields */}
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.jobTitle}
          error={formik.errors?.jobTitle}
          touched={formik.touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.jobDetails}
          error={formik.errors?.jobDetails}
          touched={formik.touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.jobLocation}
          touched={formik.touched.jobLocation}
          value={formik.values.jobLocation}
        />
        <Flex w="100%" justify="space-between" mt="4rem">
          <Button colorScheme="gray" type="button" onClick={onPrevious}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
