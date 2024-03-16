export class Validators {
  static isValidEmail = (email: string): boolean => {
    const regex: RegExp = /^[\w-\.]{1,}@([\w-]+\.)+[\w-]{2,7}$/;

    return regex.test(email);
  };

  static isValidPhoneNumber = (phoneNumber: string): boolean => {
    const regex: RegExp = /^\d{8}$/;

    return regex.test(phoneNumber);
  };
}
