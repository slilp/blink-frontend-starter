import React, { useCallback, useEffect } from "react";
import { TextField, Container, Grid, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { useForm, Resolver, Controller, useFieldArray } from "react-hook-form";
import * as yup from "yup";

const useYupValidationResolver = (validationSchema: any) =>
  useCallback(
    async (data: any) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors: any) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors: any, currentError: any) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

type FormValues = {
  name: string;
  type: string;
  choice: string;
  collection: {
    name: string;
  }[];
};

const formSchema = {
  name: yup.string().required("Collection name required"),
};

const validationSchema = yup.object({
  name: yup.string().required("Name Required"),
  type: yup.string().required("Type Required"),
  choice: yup.string().required("Choice Required"),
  collection: yup
    .array()
    .of(yup.object().shape(formSchema))
    .required("Must have fields")
    .min(1, "Minimum of 1 field"),
});

function MultiForm() {
  const resolver: Resolver<FormValues> =
    useYupValidationResolver(validationSchema);
  const {
    handleSubmit,
    register,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit((data: FormValues) => console.log(data));

  const { fields, append, remove } = useFieldArray({
    name: "collection",
    control,
  });

  useEffect(() => {
    reset({
      name: "Test",
      type: "10",
      choice: "male",
      collection: [
        { name: "col1" },
        { name: "col2" },
        { name: "col3" },
        { name: "col4" },
      ],
    });
  }, []);

  return (
    <Container sx={{ padding: "1rem" }}>
      <form onSubmit={onSubmit}>
        {JSON.stringify(watch())}
        {JSON.stringify(errors)}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField {...register("name")} />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Controller
                control={control}
                defaultValue=""
                name="type"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Age"
                    onChange={onChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <Controller
                control={control}
                defaultValue=""
                name="choice"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <RadioGroup
                    row
                    value={value}
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={onChange}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                    <FormControlLabel
                      value="disabled"
                      disabled
                      control={<Radio />}
                      label="other"
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section className={"section"} key={field.id}>
                <TextField {...register(`collection.${index}.name` as const)} />
                <button type="button" onClick={() => remove(index)}>
                  DELETE
                </button>
              </section>
            </div>
          );
        })}
        <Button
          type="button"
          onClick={() =>
            append({
              name: "",
            })
          }
        >
          APPEND
        </Button>
        <Button type="submit">Submit</Button>
      </form>
    </Container>
  );
}

export default MultiForm;
