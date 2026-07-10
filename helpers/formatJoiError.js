function cleanJoiMessage(message) {
  return message.replace(/"([^"]+)"/g, "«$1»");
}

export function formatJoiError(error) {
  return error.details.map((detail) => cleanJoiMessage(detail.message)).join(". ");
}
