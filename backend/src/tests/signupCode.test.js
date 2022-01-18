const service = require("../util/signupCodeService")
const { Code } = require("../models")

beforeEach(() => {
    service.codes = []
})

test("Generates correct codes", async () => {
    for (let i = 0; i < 50; i++) {
        let codeObject = await service.createNew()
        let code = String(codeObject.code)
        expect(code).toHaveLength(4)
        expect(await service.useCode(code)).toBeTruthy()
        expect(await service.useCode(code)).toBeFalsy()
    }
})

test("Expired codes cannot be used", async () => {
    await Code.create({
        code: "1234",
        date: Date.now() - 1000 * service.EXPIRATION_SECONDS
    })
    const result = await service.useCode("1234")
    expect(result).toBeFalsy()
})

test("Multiple codes can be used", async () => {
    const code1 = await service.createNew()
    const code2 = await service.createNew()
    const code3 = await service.createNew()
    expect(await service.useCode(code2.code)).toBeTruthy()
    expect(await service.useCode(code1.code)).toBeTruthy()
    expect(await service.useCode(code3.code)).toBeTruthy()
})