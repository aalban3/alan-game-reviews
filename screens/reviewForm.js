import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { globalStyles } from "../styles/global";
import { Formik } from "formik";
import * as yup from "yup";
import FlatButton from "../shared/button";

const reviewSchema = yup.object({
  title: yup.string().required().min(4),
  body: yup.string().required().min(8),
  rating: yup
    .string()
    .required()
    .test(
      "isValid",
      "Rating must be between 1 and 5",
      (val) => parseInt(val) < 6 && parseInt(val) > 0
    ),
});
export default function ReviewForm({ handleForm }) {
  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ title: "", body: "", rating: "" }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          handleForm({ ...values, id: Math.random().toString() });
        }}
      >
        {(formikProps) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="Review title"
              onChangeText={formikProps.handleChange("title")}
              value={formikProps.values.title}
              onBlur={formikProps.handleBlur("title")}
            />
            <Text style={globalStyles.errorText}>
              {formikProps.touched.title && formikProps.errors.title}
            </Text>
            <TextInput
              multiline
              minHeight={60}
              style={globalStyles.input}
              placeholder="Review body"
              onChangeText={formikProps.handleChange("body")}
              value={formikProps.values.body}
              onBlur={formikProps.handleBlur("body")}
            />
            <Text style={globalStyles.errorText}>
              {formikProps.touched.body && formikProps.errors.body}
            </Text>
            <TextInput
              multiline
              style={globalStyles.input}
              placeholder="Rating between 1 and 5"
              onChangeText={formikProps.handleChange("rating")}
              value={formikProps.values.rating}
              keyboardType="numeric"
              onBlur={formikProps.handleBlur("rating")}
            />
            <Text style={globalStyles.errorText}>
              {formikProps.touched.rating && formikProps.errors.rating}
            </Text>

            <FlatButton
              text="submit review"
              onPress={formikProps.handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({});
