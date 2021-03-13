const createMessageCreator = (type) => {
  const messageCreator = (payload) => {
    return {
      type,
      payload,
    };
  };
  messageCreator.type = type;
  return messageCreator;
};

export const haxballMessageIntercepted = createMessageCreator(
  "HAXBALL_MESSAGE_INTERCEPTED"
);
