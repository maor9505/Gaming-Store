import { isEmpty } from 'lodash';

export const getUser = (snapshot,user) => {
    return {
            uid: user.uid,
            email: snapshot.data().Email,
            type: snapshot.data().Type,
            name: snapshot.data().DisplayName,
            phone:snapshot.data().PhoneNumber,
            providerId: user.providerData[0].providerId,
            photoURL: (!isEmpty(user.photoURL)) ? user.photoURL : 'null'
         }
}