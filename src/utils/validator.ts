import { celebrate, Joi } from "celebrate";

// Auth
export const validatorRegister = celebrate({
  body: Joi.object().keys({
    firstName: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export const validatorLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// User
export const validatorGetUserById = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

export const validatorUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    firstName: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

export const validatorUpdateUserStatus = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    status: Joi.boolean().required(),
  }),
});

// Product
export const validatorGetProductById = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

export const validatorCreateProduct = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().min(2),
    about: Joi.string().required().min(2),
  }),
});

export const validatorUpdateProductVisibleById = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
  body: Joi.object().keys({
    isVisible: Joi.boolean().required(),
  }),
});

export const validatorUpdateProductContentById = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
  body: Joi.object().keys({
    title: Joi.string().required().min(2),
    about: Joi.string().required().min(2),
    isVisible: Joi.boolean().required(),
  }),
});

export const validatorDeleteProductById = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

// Order
export const validatorGetOrderById = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

export const validatorCreateOrder = celebrate({
  body: Joi.object().keys({
    deliverPlace: Joi.string().required().min(2),
    productIds: Joi.any(),
  }),
});

export const validatorPutOrderById = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
  body: Joi.object().keys({
    isClosed: Joi.boolean().required(),
  }),
});

export const validatorDeleteOrderById = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});
