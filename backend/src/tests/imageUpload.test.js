const imageUpload = require("../util/imageUploadUrl")

test("Boardgame image names are generated correctly", () => {
    for (let i = 1; i < 1000; i += 37) {
        const name = imageUpload.getBoardgameImageName(i)
        expect(name).toHaveLength(16)
    }
})