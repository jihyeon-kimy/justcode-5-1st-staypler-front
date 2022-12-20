import { BASEURL } from '../ApiOrigin';

export async function rooms(params, token) {
  const response = await fetch(`${BASEURL}/rooms${params ? params : ''}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem(token)}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('검색 중 오류가 발생했습니다. 다시 시도해주세요!');
  }

  const data = await response.json();
  return data;
}
