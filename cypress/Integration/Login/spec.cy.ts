/// <reference types="cypress"/>
import { testData } from '../../Fixtures/testData';
import Login from '../../PageObject/login.cy';

describe('template spec', () => {
  const login = new Login();
  beforeEach(() => {
    login.navigate();
  });
  it('password has a class called red', () => {
    login.signin_email(testData.email);
    login.signin_password(testData.password);
    login.click_signin();
  });
});
