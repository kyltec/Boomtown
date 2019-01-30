export function validate(values, selectedTags, fileSelected) {
  const errors = {};

  /**
   * @TODO: Write the validation rules for the share form.
   *
   * An item title, description, and at least one tag is required for all items.
   */

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
