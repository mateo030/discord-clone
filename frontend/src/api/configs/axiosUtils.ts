interface CancellationHandler {
  handleRequestCancellation: () => AbortController;
}

export function defineCancelApiObject(apiObject: Record<string, any>) {
  const cancelApiObject: Record<string, CancellationHandler> = {};

  Object.getOwnPropertyNames(apiObject).forEach((apiPropertyName) => {
    const cancellationControllerObject: {
      controller: AbortController | undefined;
    } = {
      controller: undefined,
    };

    cancelApiObject[apiPropertyName] = {
      handleRequestCancellation: () => {
        if (cancellationControllerObject.controller) {
          cancellationControllerObject.controller.abort();
        }

        cancellationControllerObject.controller = new AbortController();

        return cancellationControllerObject.controller;
      },
    };
  });

  return cancelApiObject;
}
