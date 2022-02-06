const imageUpload = require("../util/imageUploadUrl")

test("Image names are generated correctly", () => {
    
    let name = imageUpload.getNewImageName("jpg")
    expect(name).toHaveLength(16)

    name = imageUpload.getNewImageName("png")
    expect(name).toHaveLength(16)

    name = imageUpload.getNewImageName("a")
    expect(name).toHaveLength(16)

    name = imageUpload.getNewImageName("asdasd")
    expect(name).toHaveLength(16)
})