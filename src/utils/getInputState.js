export function getInputState(formState, fieldName) {
  return {
    error: formState.errors[fieldName],
    helperText: formState.errors[fieldName]?.message
  };
}
