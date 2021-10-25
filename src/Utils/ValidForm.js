 export const formValidation = (fieldName,fieldValue) => {
   switch(fieldName){
     case 'name':
      if (fieldValue.trim() === '') {
        return `${fieldName} is required`;
      }
      if (/[^a-zA-Z -]/.test(fieldValue)) {
        return 'Invalid characters';
      }
      if (fieldValue.trim().length < 3) {
        return `${fieldName} needs to be at least three characters`;
      }
  break;
  case 'phone':
        if(fieldValue.length != 10 ){
        return "invalid mobile number";
        }
    }
    return true;
 }
