export const addData = (state, payload) => {
  const data = { ...payload }
  const temp = [...state.listData];
  temp.push({
    name: data.name,
    phone: data.phone,
    address: data.address,
  });
  state.listData = temp;
};

export const clear = (state) => {
  state.listData = [];
};
