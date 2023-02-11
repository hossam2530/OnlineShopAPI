import { UserModel, User } from '../../store_models/user';
const pass = "!@#";
let testUser: User = {
    firstName: "usr",
    lastName: "model",
    userName: "um01",
    password: pass
   };
   const userModel = new UserModel();


describe('Test users model', () => {
    
    it('test create user => id should be returned', async () => {
        testUser = await userModel.create(testUser);
        expect(testUser.id).toBeGreaterThanOrEqual(1);
    });

    it('test index => be sure testUser founded in the list', async () => {
        const users: User[] = await userModel.index();
        expect(users.length).toBeGreaterThanOrEqual(1);
        // we use let because value will be changed every loop
        let newUser: User ;
        let founded = false;
        for(let i = 0;  i < users.length; i++){
             newUser = users[i];
             if(newUser.id == testUser.id){
                founded = true;
                break;
             }
        }

        expect(founded).toBeTrue;              
    });
    
    it('test show user => should match test user values', async () => {
        const user =await userModel.show(testUser.id as number);
        expect(user.userName).toEqual(testUser.userName);
        expect(user.userName).toEqual(testUser.userName);
        expect(user.lastName).toEqual(testUser.lastName);        
    });


    it('test auth user => should rturn valid user', async () => {
        const usr = await userModel.authenticate(testUser.userName, pass);
        expect(usr).not.toBeNull();
        if(usr){
            expect(usr.id).toEqual(testUser.id);
        }
    });
   
    it('test delete user => should be deleted', async () => {
        const usr = await userModel.delete(testUser.userName);
        expect(usr).not.toBeNull();
        if(usr){
            expect(usr.id).toEqual(testUser.id);
        }
    });
});
