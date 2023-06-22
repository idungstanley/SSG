/// <reference types="cypress"/>
import { testData } from '../../Fixtures/testData';
import Login from '../../PageObject/Login/login.cy';
import Tasks from '../../PageObject/Tasks/task.cy';

describe('template spec', () => {
  const login = new Login();
  const task = new Tasks();
  beforeEach(() => {
    login.navigate();
  });
  it('Select Hub', () => {
   login.login(testData.email,testData.password)
   task.click_tasks_app()
   task.click_on_hub()
  });
});
