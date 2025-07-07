import { sequelize } from "../models/index.js";

export const updateUserPreferenceCompletion = async (user_id, type) => {
  if (!["buying", "selling"].includes(type)) {
    throw new Error("Invalid preference type. Must be 'buying' or 'selling'.");
  }

  const updateField =
    type === "buying" ? "buying_prefrence_completed" : "selling_prefrence_completed";

  await sequelize.models.user.update(
    { [updateField]: true },
    { where: { id: user_id } }
  );
};
export const updateAISettingsCompletion = async (user_id) => {
    await sequelize.models.user.update(
      { ai_settings_completed: true },
      { where: { id: user_id } }
    );
  };