 export const formValidation = (fieldName,fieldValue) => {
   switch(fieldName){
     case 'name':
      if (fieldValue.trim() === '') {
        return `Full-Name: ${fieldName} is required`;
      }
      if (/[^a-zA-Z -]/.test(fieldValue)) {
        return 'Full-Name: Invalid characters';
      }
      if (fieldValue.trim().length < 3) {
        return `Full-Name: ${fieldName} needs to be at least three characters`;
      }
  break;
  case 'phone':
        if(fieldValue.length != 10 ){
        return "Phone: invalid mobile number";
        }
          break;
    }
    return true;
 }
