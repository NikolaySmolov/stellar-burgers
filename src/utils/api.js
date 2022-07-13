import { API } from './constants';

export const getIngredients = async () => {
  const res = await fetch(`${API}/ingredients`);

  return res.ok ? await res.json() : Promise.reject(`res.ok: ${res.ok}, res.status: ${res.status}`);
};

export const sendOrder = async order => {
  const res = await fetch(`${API}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });

  return res.ok ? await res.json() : Promise.reject(`res.ok: ${res.ok}, res.status: ${res.status}`);
};
