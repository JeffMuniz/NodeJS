import { WebPaths, Routes } from "src/routes/consts";

const ProgressSteps = [
  {
    route: WebPaths[""],
    name: "Seus dados cadastrais",
    position: 1,
  },
  {
    route: WebPaths[Routes.USERS_REGISTRY],
    name: "Adicionar usuários",
    position: 2,
  },
  {
    route: WebPaths[""],
    name: "Seu pedido",
    position: 3,
  },
  {
    route: WebPaths[""],
    name: "Pagamento",
    position: 4,
  },
  {
    route: WebPaths[""],
    name: "Sua entrega",
    position: 5,
  },
];

export default ProgressSteps;
