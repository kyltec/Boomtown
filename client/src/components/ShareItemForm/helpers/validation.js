export function validate(values, selectedTags, fileSelected) {
  const errors = {};

  if (values.title === '') {
    errors.title = 'Title is missing';
  }
  if (values.description === '') {
    errors.description = 'Description is missing';
  }
  if (!fileSelected) {
    errors.fileSelected = 'Image is missing';
  }
  if (!selectedTags) {
    errors.tag = 'At least one tag must be selected';
  }
  return errors;
}
