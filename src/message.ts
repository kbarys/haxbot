// executed both in node and in the browser
export const setupModule = ({ inBrowser }: { inBrowser: boolean }) => {
  const createMessageCreator = <T>(type: T) => {
    return {
      withPayload: <P>() => {
        const messageCreator = (payload: P) => {
          return {
            type,
            payload,
          };
        };
        messageCreator.type = type;
        messageCreator.match = (
          action: any
        ): action is { type: T; payload: P } => action.type === type;
        return messageCreator;
      },
      withoutPayload: () => {
        const messageCreator = () => {
          return {
            type,
          };
        };
        messageCreator.type = type;
        messageCreator.match = (action: any): action is { type: T } =>
          action.type === type;
        return messageCreator;
      },
    };
  };

  const haxballUserMessageIntercepted = createMessageCreator(
    "HAXBALL_USER_MESSAGE_INTERCEPTED" as const
  ).withPayload<{
    username: string | undefined;
    messageText: string;
  }>();

  if (inBrowser) {
    (window as any).Message = {
      haxballUserMessageIntercepted,
    };
  }

  return { haxballUserMessageIntercepted };
};

export const { haxballUserMessageIntercepted } = setupModule({
  inBrowser: false,
});
