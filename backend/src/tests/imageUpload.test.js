const imageUpload = require("../util/imageUploadUrl")

test("Image names are generated correctly", () => {
    for (let i = 1; i < 50; i++) {
        const name = imageUpload.getImageName()
        expect(name).toHaveLength(16)
    }
})