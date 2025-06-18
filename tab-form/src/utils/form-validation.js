export function formValidation(form) {
  if (form.name.length < 3) {
    return "Name Too Short";
  }
  if (form.age * 0 !== 0) {
    return "Not a Number";
  }
  if (!form.email.includes("@")) {
    return "Email Format Incorrect";
  }
  if (form.interest.length < 3) {
    return "Interest Too Short";
  }
  return "";
}
