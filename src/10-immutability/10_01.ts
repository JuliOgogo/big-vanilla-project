export type UserType = {
    name: string
    hair: number
    address: { city: string, house?: number }
}

export type LaptopType = {
    title: string
}

export type UserWithLaptopType = UserType & {
    laptop: LaptopType
}

export type UserWithBooksType = UserType & {
    books: string[]
}

type CompanyType = { id: number, title: string };
export type WithCompaniesType = {
    companies: CompanyType[]
}

export function makeHairstyle(us: UserType, power: number) {
    return {
        ...us,
        hair: us.hair / power
    }
}

export function moveUser(us: UserWithLaptopType, newCity: string) {
    return {
        ...us,
        address: {
            ...us.address,
            city: newCity
        }
    }
}

export function upgradeUserLaptop(us: UserWithLaptopType, newLaptop: string) {
    return {
        ...us,
        laptop: {
            ...us.laptop,
            title: newLaptop
        }
    }
}

export function moveUserToOtherHouse(us: UserWithLaptopType & UserWithBooksType, newHouse: number) {
    return {
        ...us,
        address: {
            ...us.address,
            house: newHouse
        }
    }
}

export function addNewBooksToUser(us: UserWithLaptopType & UserWithBooksType, newBooks: string[]) {
    return {
        ...us,
        books: [...us.books, ...newBooks]
    }
}

export function updateBook(us: UserWithLaptopType & UserWithBooksType, oldBook: string, newBook: string) {
    return {
        ...us,
        books: us.books.map(b => b === oldBook ? newBook : b)
    }
}

export const removeBook = (us: UserWithLaptopType & UserWithBooksType, book: string) => ({
    ...us,
    books: us.books.filter(b => b !== book)
})

export const addCompany = (us: UserWithLaptopType & WithCompaniesType, company: string) => ({
    ...us,
    companies: [...us.companies, {id: 3, title: company}]
})

export const updateCompany = (us: WithCompaniesType, companyId: number, newCompanyTitle: string) => ({
    ...us,
    companies: us.companies.map(c => c.id === companyId ? {...c, title: newCompanyTitle} : c)
})

export const updateCompany2 = (companies: { [key: string]: CompanyType[] },
                               userName: string,
                               companyId: number,
                               newCompanyTitle: string) => ({
    ...companies,
    [userName]: companies[userName].map(c => c.id === companyId ? {...c, title: newCompanyTitle} : c)
})