  import Joi from "joi";
  export const leadSchema = Joi.object({
    client_name: Joi.string().required(),
    client_email: Joi.string().required(),
    client_phone_number: Joi.string().required(),
    context: Joi.string().required(),
    transcription: Joi.string().optional(),
    twillio_call_id: Joi.string().optional(),
    lead_type: Joi.string().valid("buyer", "seller", "investor").required(),
    property_type: Joi.string().required(),
    budgetrange_from: Joi.number().required(),
    budgetrange_to: Joi.number().required(),
    call_prefrence: Joi.string().valid("immediate", "schedule").required(),
    schedule_time: Joi.when("call_prefrence", {
      is: "schedule",
      then: Joi.date().required(),
      otherwise: Joi.forbidden(),
    }),
    min_bedroom: Joi.when("lead_type", {
      is: "buyer",
      then: Joi.number().required(),
      otherwise: Joi.forbidden(),
    }),
    min_bathroom: Joi.when("lead_type", {
      is: "buyer",
      then: Joi.number().required(),
      otherwise: Joi.forbidden(),
    }),
    type_of_sale: Joi.when("lead_type", {
      is: "seller",
      then: Joi.string().required(),
      otherwise: Joi.forbidden(),
    }),
    motivation_to_sell: Joi.when("lead_type", {
      is: "seller",
      then: Joi.string().required(),
      otherwise: Joi.forbidden(),
    }),
    selling_timeline: Joi.when("lead_type", {
      is: "seller",
      then: Joi.string().required(),
      otherwise: Joi.forbidden(),
    }),
    target_market: Joi.when("lead_type", {
      is: "investor",
      then: Joi.string().required(),
      otherwise: Joi.forbidden(),
    }),
    investor_type: Joi.when("lead_type", {
      is: "investor",
      then: Joi.string().required(),
      otherwise: Joi.forbidden(),
    }),
    status: Joi.string().optional("active"),
  });

export const updateLeadSchema = Joi.object({
  client_name: Joi.string().optional(),
  client_email: Joi.string().optional(),
  client_phone_number: Joi.string().optional(),
  context: Joi.string().optional(),
  transcription: Joi.string().optional(),
  twillio_call_id: Joi.string().optional(),
  lead_type: Joi.string().valid("buyer", "seller", "investor").optional(),
  property_type: Joi.string().optional(),
  budgetrange_from: Joi.number().optional(),
  budgetrange_to: Joi.number().optional(),
  call_prefrence: Joi.string().valid("immediate", "schedule").optional(),
  schedule_time: Joi.when("call_prefrence", {
    is: "schedule",
    then: Joi.date().required(),
    otherwise: Joi.forbidden(),
  }),
  min_bedroom: Joi.number().when("lead_type", {
    is: "buyer",
    then: Joi.optional(),
    otherwise: Joi.forbidden(),
  }),
  min_bathroom: Joi.number().when("lead_type", {
    is: "buyer",
    then: Joi.optional(),
    otherwise: Joi.forbidden(),
  }),
  type_of_sale: Joi.string().when("lead_type", {
    is: "seller",
    then: Joi.optional(),
    otherwise: Joi.forbidden(),
  }),
  motivation_to_sell: Joi.string().when("lead_type", {
    is: "seller",
    then: Joi.optional(),
    otherwise: Joi.forbidden(),
  }),
  selling_timeline: Joi.string().when("lead_type", {
    is: "seller",
    then: Joi.optional(),
    otherwise: Joi.forbidden(),
  }),
  target_market: Joi.string().when("lead_type", {
    is: "investor",
    then: Joi.optional(),
    otherwise: Joi.forbidden(),
  }),
  investor_type: Joi.string().when("lead_type", {
    is: "investor",
    then: Joi.optional(),
    otherwise: Joi.forbidden(),
  }),
  status: Joi.string().optional("active"),
});
