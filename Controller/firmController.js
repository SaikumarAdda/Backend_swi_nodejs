const Firm = require('../models/Firm');
const Vendor = require('../models/vender'); // ✅ Rename file/model if needed
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
    try {
        const { firmName, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : undefined;

        // ✅ Optional: You could skip this check if the middleware already verified vendor existence
        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        const newFirm = new Firm({
            firmName,
            area,
            category,
            region,
            offer,
            image,
            vendor: req.vendorId // also could use vendor._id
        });

        const savedfirm=await newFirm.save();
        vendor.firm.push(savedfirm._id)
        await vendor.save()

        return res.status(201).json({ message: "Firm added successfully", firm: newFirm });
    } catch (error) {
        console.error("Add Firm Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteFirmById = async(req, res) => {
    try {
        const firmId = req.params.firmId;

        const deletedProduct = await Firm.findByIdAndDelete(firmId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "No product found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = { addFirm: [upload.single('image'), addFirm], deleteFirmById }
