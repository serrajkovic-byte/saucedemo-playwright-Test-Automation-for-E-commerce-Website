export const users = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  unknown: { username: 'not_a_real_user', password: 'secret_sauce' },
  wrongPassword: { username: 'standard_user', password: 'wrong_password' }
};

export const errorMessages = {
  usernameRequired: 'Epic sadface: Username is required',
  passwordRequired: 'Epic sadface: Password is required',
  invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
  lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
  firstNameRequired: 'First Name is required',
  lastNameRequired: 'Last Name is required',
  postalCodeRequired: 'Postal Code is required'
};

export const checkoutInfo = {
  firstName: 'Alex',
  lastName: 'Morgan',
  postalCode: '11000'
};

export const products = {
  backpack: { id: 'sauce-labs-backpack', name: 'Sauce Labs Backpack' },
  bikeLight: { id: 'sauce-labs-bike-light', name: 'Sauce Labs Bike Light' },
  boltTShirt: { id: 'sauce-labs-bolt-t-shirt', name: 'Sauce Labs Bolt T-Shirt' }
};

export default { users, errorMessages, checkoutInfo, products };
