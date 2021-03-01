import React from "react";

function RecieptUpload({ props: { setFormData, formData } }) {
    const [image, setImage] = useState(null);
    const [uploadUpdate, setUploadUpdate] = useState(null);

    async function upload(e) {
        e.preventDefault();
        if (!image) return;
        else if (!ImageTypes.includes(image.type)) {
            return alert("Please upload an Image");
        }
        setUploadUpdate("Attempting Upload...");
        const imageURL = await UploadImage(image, `Reciepts/${formData.name}`);
        setFormData((prev) => {
            return { ...prev, receiptUrl: imageURL };
        });
        setUploadUpdate("Uploading Complete.");
    }
    return (
        <div className="imageupload">
            <div className="upload">
                <input
                    type="file"
                    className="image"
                    onChange={({ target: { files } }) => setImage(files[0])}
                />
                <button className="uploadBtn" onClick={upload}>
                    Upload
                </button>
            </div>
            <span className="update mt-2">{uploadUpdate}</span>
        </div>
    );
}

export default RecieptUpload;
