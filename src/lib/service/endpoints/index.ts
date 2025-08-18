import axiosInstance from '../axios';

export async function getHome() {
  const res = await axiosInstance.get('/products');
  //   console.log('res..', res);

  return res;
}
export async function getOneProduct(id: string) {
  const res = await axiosInstance.get(`/products/${id}`);
  //   console.log('res..', res);

  return res;
}
export async function getTestimonials() {
  const res = await axiosInstance.get('/testimonials');
  //   console.log('res...', res);
  return res;
}
export async function getOneTestimonials(id: string) {
  const res = await axiosInstance.get(`/testimonials/${id}`);
  //   console.log('res...', res);
  return res;
}

export function createTestimonial(data: FormData) {
  const res = axiosInstance.post('/testimonials', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
}

export function updateTestimonial(id: string, data: FormData) {
  const res = axiosInstance.patch(`/testimonials/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
}

export function deleteTestimonial(id: string) {
  const res = axiosInstance.delete(`/testimonials/${id}`);
  return res;
}

export function PosOrder(data: any) {
  const res = axiosInstance.post('/orders', data);
  return res;
}

export function updateOrder(id: string, data: FormData) {
  const res = axiosInstance.patch(`/orders/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
}

export function deleteOrder(id: string) {
  const res = axiosInstance.delete(`/orders/${id}`);
  return res;
}

export function deleteBulkOrder(id: string) {
  const res = axiosInstance.delete(`/custom-orders/${id}`);
  return res;
}

export function updateBulkOrder(id: string, data: any) {
  const res = axiosInstance.patch(`/custom-orders/${id}`, data);
  return res;
}

export function getOrders(currentPage: number, itemsPerPage: number) {
  const res = axiosInstance.get(
    `/orders?page=${currentPage}&limit=${itemsPerPage}`
  );
  return res;
}
export function getBulkOrders(currentPage: number, itemsPerPage: number) {
  const res = axiosInstance.get(
    `/custom-orders?page=${currentPage}&limit=${itemsPerPage}`
  );
  return res;
}

export function BulkOrder(data: any) {
  const res = axiosInstance.post('/custom-orders', data);
  return res;
}
export function updateProduct(data: any) {
  const res = axiosInstance.patch('/products/689f857545ca4e292e013f13', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
}
export function getProduct(id?: string) {
  const res = axiosInstance.get(`/products/689f857545ca4e292e013f13`);
  return res;
}

export function getMessages() {
  const res = axiosInstance.get('/contact');
  return res;
}

export function getOneMessage(id: string) {
  const res = axiosInstance.get(`/messages/${id}`);
  return res;
}

export function updateMessage(id: string, status: string) {
  const res = axiosInstance.patch(`/contact/${id}`, { status });
  return res;
}

export function deleteMessage(id: string) {
  const res = axiosInstance.delete(`/contact/${id}`);
  return res;
}

export function createMessage(data: {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const res = axiosInstance.post('/contact', data);
  return res;
}
