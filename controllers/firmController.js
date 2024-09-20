
const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

 const upload = multer({ storage: storage });
 exports.uploadImage = upload.single('image');





 exports.addFirm = async (req, res) => {
    try {
        const { firmname, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        const firms = vendor.firm || [];
        if (firms.length > 0) {
            return res.status(400).json({ message: "Vendor can have only one firm" });
        }

        const firm = new Firm({
            firmname,
            area,
            category,
            region,
            offer,
            image,
            vendor: vendor._id
        });

        const savedFirm = await firm.save();

        vendor.firm.push(savedFirm._id);
        await vendor.save();

        return res.status(200).json({ message: 'Firm added successfully', firmId: savedFirm._id, vendorFirmName: savedFirm.firmname });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


