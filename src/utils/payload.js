/**
 * Converts object to FormData object
 *
 * @param  {object} payload The object we want to convert
 *
 * @return {FormData}       The FormData
 */
const toFormData = payload =>
  Object.keys(payload).reduce((formData, key) => {
    let value = payload[key];
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    formData.append(key, value);
    return formData;
  }, new FormData());

export default toFormData;
