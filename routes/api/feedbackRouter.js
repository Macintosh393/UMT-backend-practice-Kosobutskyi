import { feedback as c } from "../../controllers/index.js";
import { createRouter } from "../../helpers/createRouter.js";
import { validateBody } from "../../helpers/validateBody.js";
import { validateParams } from "../../helpers/validateParams.js";
import { createFeedbackSchema, updateFeedbackSchema } from "../../schemas/feedbackSchema.js";
import { idParamSchema } from "../../schemas/idParamSchema.js";

const feedbackRouterOptions = [
  {
    method: "get",
    route: "/",
    middlewares: [],
    controller: c.getFeedbackList,
  },
  {
    method: "get",
    route: "/:id",
    middlewares: [validateParams(idParamSchema)],
    controller: c.getFeedbackById,
  },
  {
    method: "post",
    route: "/",
    middlewares: [validateBody(createFeedbackSchema)],
    controller: c.createFeedback,
  },
  {
    method: "patch",
    route: "/:id",
    middlewares: [validateParams(idParamSchema), validateBody(updateFeedbackSchema)],
    controller: c.updateFeedback,
  },
  {
    method: "delete",
    route: "/:id",
    middlewares: [validateParams(idParamSchema)],
    controller: c.deleteFeedback,
  },
];

const feedbacksRouter = createRouter({ options: feedbackRouterOptions });

feedbacksRouter.setRouter();

export default feedbacksRouter.router;
