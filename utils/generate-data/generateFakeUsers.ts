import { faker } from '@faker-js/faker';
import User, {IUser} from '@/models/userModel';

faker.seed(123);

export const generateFakeUser = (): IUser => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = `${firstName} ${lastName}`;
    const domains = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com'];
    const domain = faker.helpers.arrayElement(domains);
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
    const password = faker.internet.password();
    const phoneNumber = generateRandomPhoneNumber();
    const userName = generateRelatedUserName(firstName, lastName);

    return {
        name,
        email,
        password,
        phoneNumber,
        userName
    };
};

const generateRandomPhoneNumber = (): string => {
    const randomNumber = faker.datatype.number({ min: 1000000000, max: 9999999999 }).toString();
    return `${randomNumber.substring(0, 3)}-${randomNumber.substring(3, 6)}-${randomNumber.substring(6, 10)}`;
};


const generateRelatedUserName = (firstName: string, lastName: string): string => {

    const randomNumber = faker.datatype.number({ min: 1, max: 99 });
    return `${firstName.toLowerCase()}${lastName.charAt(0).toLowerCase()}${randomNumber}`;
};


export const generateFakeUsers = (count: number): IUser[] => {
    const users: IUser[] = [];
    for (let i = 0; i < count; i++) {
        users.push(generateFakeUser());
    }
    return users;
};
