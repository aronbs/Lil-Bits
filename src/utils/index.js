export const getEmailParam = () =>  new URL(location.href).searchParams.get('email');


export const getOrders = () => {
  return JSON.parse(localStorage.getItem('orders')) || [];
}

export const findOrder = (email) => {
  const orders = getOrders();
  return orders.find((item) => item.email === email);
}

export const updateOrder = (email, order) => {
  const orders = getOrders();
  const index = orders.findIndex((item) => item.email === email);
  orders[index] = order;
  localStorage.setItem('orders', JSON.stringify(orders));
}

export const addOrder = (email, personCount, selectedDate) => {
  let orders = getOrders() || [];
  const order = JSON.parse(localStorage.getItem('newOrder'));
  order.email = email;
  order.personCount = personCount;
  order.selectedDate = selectedDate;
  if(findOrder(email)) {
    orders = orders.filter((item) => item.email !== email);
  }
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
  localStorage.removeItem('newOrder');
}

export const missingOrder = () => {
  return getEmailParam() && !findOrder(getEmailParam());
}
export const hasOrder = () => {
  return getEmailParam() && findOrder(getEmailParam());
}