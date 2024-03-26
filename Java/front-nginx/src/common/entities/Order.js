class Voucher {
  constructor(data = {}) {
    this.id = data.id;
    this.name = data.name;
    this.employeesTotal = data.employeesTotal;
    this.amount = data.amount;
    this.cnpj = data.cnpj;
  }
}

export default class Order {
  constructor(data = {}) {
    this.id = data.id;
    this.branchId = data.branchId;
    this.date = data.date;
    this.amount = data.amount;
    this.status = data.status;
    this.cnpj = data.cnpj;
    this.requirer = "Pendente";
    this.branchesOrders =
      data.branchesOrders && Array.isArray(data.branchesOrders)
        ? data.branchesOrders.map(voucher => new Voucher(voucher))
        : [];
  }
}
