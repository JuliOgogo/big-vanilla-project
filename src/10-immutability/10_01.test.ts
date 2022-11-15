import {
    addCompany,
    addNewBooksToUser,
    makeHairstyle,
    moveUser,
    moveUserToOtherHouse, removeBook, updateBook, updateCompany, updateCompany2,
    upgradeUserLaptop,
    UserType,
    UserWithBooksType,
    UserWithLaptopType, WithCompaniesType
} from "./10_01";

test('test makeHairstyle function', () => {

    const user: UserType = {
        name: 'Julia',
        hair: 50,
        address: {city: 'Moscow'}
    }

    makeHairstyle(user, 2)
    const cutUser = makeHairstyle(user, 2)

    expect(user.hair).toBe(50)
    expect(cutUser.hair).toBe(25)
    expect(user.address).toBe(cutUser.address) // потому что поверхностное копирование
})

test('change address', () => {

    const user: UserWithLaptopType = {
        name: 'Julia',
        hair: 50,
        address: {city: 'Moscow', house: 89},
        laptop: {title: 'Huawei'}
    }

    const movedUser = moveUser(user, 'Kaliningrad')

    expect(user).not.toBe(movedUser)
    expect(user.address).not.toBe(movedUser.address)
    expect(user.laptop).toBe(movedUser.laptop)
    expect(movedUser.address.city).toBe('Kaliningrad')
})

test('upgrade laptop to HuaweiPro', () => {

    const user: UserWithLaptopType = {
        name: 'Julia',
        hair: 50,
        address: {city: 'Moscow', house: 89},
        laptop: {title: 'Huawei'}
    }

    const upgradedUserLaptop = upgradeUserLaptop(user, 'HuaweiPro')

    expect(user).not.toBe(upgradedUserLaptop)
    expect(user.laptop).not.toBe(upgradedUserLaptop.laptop)
    expect(user.address).toBe(upgradedUserLaptop.address)
    expect(upgradedUserLaptop.laptop.title).toBe('HuaweiPro')
    expect(user.laptop.title).toBe('Huawei')
})

test('change house', () => {

    const user: UserWithLaptopType & UserWithBooksType = {
        name: 'Julia',
        hair: 50,
        address: {city: 'Moscow', house: 89},
        laptop: {title: 'Huawei'},
        books: ['css', 'html', 'js', 'react']
    }

    const movedUser = moveUserToOtherHouse(user, 21)

    expect(user).not.toBe(movedUser)
    expect(user.address).not.toBe(movedUser.address)
    expect(movedUser.address.house).toBe(21)
    expect(user.laptop).toBe(movedUser.laptop)
    expect(user.books).toBe(movedUser.books)
})

test('add new books to user', () => {

    const user: UserWithLaptopType & UserWithBooksType = {
        name: 'Julia',
        hair: 50,
        address: {city: 'Moscow', house: 89},
        laptop: {title: 'Huawei'},
        books: ['css', 'html', 'js', 'react']
    }

    const userWithNewBooks = addNewBooksToUser(user, ['ts', 'rest api'])

    expect(user).not.toBe(userWithNewBooks)
    expect(user.address).toBe(userWithNewBooks.address)
    expect(user.laptop).toBe(userWithNewBooks.laptop)
    expect(user.books).not.toBe(userWithNewBooks.books)
    expect(userWithNewBooks.books[4]).toBe('ts')
    expect(userWithNewBooks.books[5]).toBe('rest api')
})

test('update js book to ts', () => {

    const user: UserWithLaptopType & UserWithBooksType = {
        name: 'Julia',
        hair: 50,
        address: {city: 'Moscow', house: 89},
        laptop: {title: 'Huawei'},
        books: ['css', 'html', 'js', 'react']
    }

    const userCopy = updateBook(user, 'js', 'ts')

    expect(user).not.toBe(userCopy)
    expect(user.address).toBe(userCopy.address)
    expect(user.laptop).toBe(userCopy.laptop)
    expect(user.books).not.toBe(userCopy.books)
    expect(userCopy.books[2]).toBe('ts')
    expect(user.books[2]).toBe('js')
})

test('remove js book', () => {

    const user: UserWithLaptopType & UserWithBooksType = {
        name: 'Julia',
        hair: 50,
        address: {city: 'Moscow', house: 89},
        laptop: {title: 'Huawei'},
        books: ['css', 'html', 'js', 'react']
    }

    const userCopy = removeBook(user, 'js')

    expect(user).not.toBe(userCopy)
    expect(user.address).toBe(userCopy.address)
    expect(user.laptop).toBe(userCopy.laptop)
    expect(user.books).not.toBe(userCopy.books)
    expect(userCopy.books[2]).toBe('react')
    expect(user.books[2]).toBe('js')
})

test('add company', () => {

    const user: UserWithLaptopType & WithCompaniesType = {
        name: 'Julia',
        hair: 50,
        address: {city: 'Moscow', house: 89},
        laptop: {title: 'Huawei'},
        companies: [{id: 1, title: 'VIAM'}, {id: 2, title: 'Zumba'}]
    }

    const userCopy = addCompany(user, 'Yandex')

    expect(user).not.toBe(userCopy)
    expect(user.address).toBe(userCopy.address)
    expect(user.laptop).toBe(userCopy.laptop)
    expect(user.companies).not.toBe(userCopy.companies)
    expect(userCopy.companies[2].title).toBe('Yandex')
    expect(userCopy.companies.length).toBe(3)
})

test('update company', () => {

    const user: UserWithLaptopType & WithCompaniesType = {
        name: 'Julia',
        hair: 50,
        address: {city: 'Moscow', house: 89},
        laptop: {title: 'Huawei'},
        companies: [{id: 1, title: 'VIAM'}, {id: 2, title: 'Zumba'}]
    }

    const userCopy = updateCompany(user, 1, 'FGUP VIAM') as UserWithLaptopType & WithCompaniesType

    expect(user).not.toBe(userCopy)
    expect(user.address).toBe(userCopy.address)
    expect(user.laptop).toBe(userCopy.laptop)
    expect(user.companies).not.toBe(userCopy.companies)
    expect(userCopy.companies[0].title).toBe('FGUP VIAM')
})

test('update company 2', () => {

    let companies = {
        'Julia': [{ id: 1, title: 'VIAM' }, { id: 2, title: 'Zumba' }],
        'Alex': [{ id: 1, title: 'OVEN' }]
    }

    const updatedCompany = updateCompany2(companies, 'Julia', 1, 'FGUP VIAM')

    expect(companies['Julia']).not.toBe(updatedCompany['Julia'])
    expect(companies['Alex']).toBe(updatedCompany['Alex'])
    expect(companies['Julia'][0].title).toBe('VIAM')
    expect(updatedCompany['Julia'][0].title).toBe('FGUP VIAM')
})