const service = require("../util/signupCodeService")

beforeEach(() => {
    service.codes = []
})

test("Generates correct codes", () => {
    for (let i = 0; i < 500; i++) {
        let code = service.createNew().code
        expect(code).toHaveLength(4)
        expect(service.useCode(code)).toBeTruthy()
        expect(service.useCode(code)).toBeFalsy()
    }
})

test("Expired codes cannot be used", () => {
    service.codes.push({
        code: "1234",
        date: Date.now() - 1000 * 120
    })
    expect(service.useCode(1234)).toBeFalsy()
})

test("Multiple codes can be used", () => {
    const code1 = service.createNew().code
    const code2 = service.createNew().code
    const code3 = service.createNew().code
    expect(service.useCode(code2)).toBeTruthy()
    expect(service.useCode(code1)).toBeTruthy()
    expect(service.useCode(code3)).toBeTruthy()
})