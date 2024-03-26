import { registerApplication, start } from 'single-spa';

registerApplication(
  'core',
  () => import('@/core.app'),
  () => true
);

registerApplication(
  'aprovacao',
  () => (window as any).System.import('@backoffice/aprovacao'),
  () => location.pathname === '/' || location.pathname.startsWith('/aprovacoes')
);

registerApplication(
  'ec',
  () => (window as any).System.import('@backoffice/ec'),
  () => location.pathname.startsWith('/ec')
);

registerApplication(
  'financeiro',
  () => (window as any).System.import('@backoffice/financeiro'),
  () => location.pathname.startsWith('/financeiro')
);

registerApplication(
  'pagamento',
  () => (window as any).System.import('@backoffice/pagamento'),
  () => location.pathname.startsWith('/pagamento')
);

registerApplication(
  'pedido',
  () => (window as any).System.import('@backoffice/pedido'),
  () => location.pathname.startsWith('/pedidos')
);

registerApplication(
  'transacao',
  () => (window as any).System.import('@backoffice/transacao'),
  () => location.pathname.startsWith('/transacao')
);

registerApplication(
  'conciliacao',
  () => (window as any).System.import('@backoffice/conciliacao'),
  () => location.pathname.startsWith('/conciliacao')
);

registerApplication(
  'extrato',
  () => (window as any).System.import('@backoffice/extrato'),
  () => location.pathname.startsWith('/extrato')
);

start();
