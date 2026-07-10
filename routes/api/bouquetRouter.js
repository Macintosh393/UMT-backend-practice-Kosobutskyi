import { bouquet as c } from "../../controllers/index.js";
import { createBouquetSchema, getBouquetQuerySchema, idParamSchema, updateBouquetSchema } from "../../schemas/index.js";
import { createRouter } from "../../helpers/createRouter.js";
import { validateQuery } from "../../helpers/validateQuery.js";
import { validateParams } from "../../helpers/validateParams.js";
import { validateBody } from "../../helpers/validateBody.js";
import { upload } from "../../middlewares/multerUpload.js";

const bouquetRouterOptions = [
  {
    method: "get",
    route: "/",
    middlewares: [validateQuery(getBouquetQuerySchema)],
    controller: c.getBouquetList,
  },
  {
    method: "get",
    route: "/:id",
    middlewares: [validateParams(idParamSchema)],
    controller: c.getBouquetById,
  },
  {
    method: "post",
    route: "/",
    middlewares: [upload.single("picture"), validateBody(createBouquetSchema)],
    controller: c.createBouquet,
  },
  {
    method: "patch",
    route: "/:id",
    middlewares: [upload.single("picture"), validateParams(idParamSchema), validateBody(updateBouquetSchema)],
    controller: c.updateBouquet,
  },
  {
    method: "delete",
    route: "/:id",
    middlewares: [validateParams(idParamSchema)],
    controller: c.deleteBouquet,
  },
];

const bouquetRouter = createRouter({ options: bouquetRouterOptions });
bouquetRouter.setRouter();

export default bouquetRouter.router;
