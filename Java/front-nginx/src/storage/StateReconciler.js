const stateReconciler = (inboundState, originalState) => ({
  ...originalState,
  ...inboundState,
});

export default stateReconciler;
