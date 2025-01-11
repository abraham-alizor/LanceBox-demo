// export type StackParamsList = EaseRoutes &
//   InsuranceRoutes &
//   MutualFundsRoutes &
//   MybankRoutes &
//   PensionRoutes &
//   StocksRoutes;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamsList {}
  }
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
