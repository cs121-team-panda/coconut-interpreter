/**
 * Converts object to FormData object
 *
 * @param  {object} payload The object we want to convert
 *
 * @return {FormData}       The FormData
 */
const toFormData = payload =>
  Object.keys(payload).reduce((formData, key) => {
    formData.append(key, payload[key]);
    return formData;
  }, new FormData());

export default toFormData;
