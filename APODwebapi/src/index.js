const express = require('express');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
db.dbConnection();

const userAccountRoutes = require('./routes/userAccount');
app.use("/api/v1/useraccounts/", userAccountRoutes);

const designSubmissionRoutes = require('./routes/designSubmission');
app.use("/api/v1/designsubmissions/", designSubmissionRoutes);

const templateRoutes = require('./routes/template');
app.use("/api/v1/templates/", templateRoutes);

const productRoutes = require('./routes/product');
app.use("/api/v1/products/", productRoutes);

const productListingSettingRoutes = require('./routes/productListingSetting');
app.use("/api/v1/productlistingsettings/", productListingSettingRoutes);

const materialConsumptionRoutes = require('./routes/materialConsumption');
app.use("/api/v1/materialconsumptions/", materialConsumptionRoutes);

const materialInventoryRoutes = require('./routes/materialInventory');
app.use("/api/v1/materialinventories/", materialInventoryRoutes);

const jobRoutes = require('./routes/job');
app.use("/api/v1/jobs/",jobRoutes);

const workStationRoutes = require('./routes/workStation');
app.use("/api/v1/workstations/",workStationRoutes);

const mockupRoutes = require('./routes/mockup');
app.use("/api/v1/mockups/",mockupRoutes);

const printFileRoutes = require('./routes/printFile');
app.use("/api/v1/printfiles/",printFileRoutes);

const listCarriers = require('./routes/shipstation/listCarriers');
app.use("/api/v1/listcarriers/",listCarriers);

const listPackages = require('./routes/shipstation/listPackages');
app.use("/api/v1/carriers/listpackages/",listPackages);

const PORT = process.env.PORT || 8082;
app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`);
})