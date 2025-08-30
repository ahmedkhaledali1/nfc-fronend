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
  const res = axiosInstance.post('/orders', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
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

export function getStatistics() {
  const res = axiosInstance.get('/home/statistics');
  return res;
}

export function getSocialMedia() {
  const res = axiosInstance.get('/social-media');
  return res;
}

export function createSocialMedia(data: {
  platform: string;
  url: string;
  isActive: boolean;
  displayOrder: number;
}) {
  const res = axiosInstance.post('/social-media', data);
  return res;
}

export function updateSocialMedia(
  id: string,
  data: {
    platform: string;
    url: string;
    isActive: boolean;
    displayOrder: number;
  }
) {
  const res = axiosInstance.patch(`/social-media/${id}`, data);
  return res;
}

export function deleteSocialMedia(id: string) {
  const res = axiosInstance.delete(`/social-media/${id}/hard-delete`);
  return res;
}

export function getCountries(currentPage: number, itemsPerPage: number) {
  const res = axiosInstance.get(`/countries`, {
    params: {
      page: currentPage,
      limit: itemsPerPage,
    },
  });
  return res;
}

export function getCitiesByCountry(countryId: string) {
  const res = axiosInstance.get(`/cities/country/${countryId}`);
  return res;
}

export function createCountry(data: {
  name: string;
  code: string;
  isActive: boolean;
  displayOrder: number;
}) {
  const res = axiosInstance.post('/countries', data);
  return res;
}

export function updateCountry(
  id: string,
  data: {
    name: string;
    code: string;
    isActive: boolean;
    displayOrder: number;
  }
) {
  const res = axiosInstance.patch(`/countries/${id}`, data);
  return res;
}

export function deleteCountry(id: string) {
  const res = axiosInstance.delete(`/countries/${id}`);
  return res;
}

// Cities endpoints
export function getCities(currentPage: number, itemsPerPage: number) {
  const res = axiosInstance.get(`/cities`, {
    params: {
      page: currentPage,
      limit: itemsPerPage,
    },
  });
  return res;
}

export function createCity(data: {
  name: string;
  country: string;
  deliveryFee: number;
  isActive: boolean;
  displayOrder: number;
}) {
  const res = axiosInstance.post('/cities', data);
  return res;
}

export function updateCity(
  id: string,
  data: {
    name: string;
    country: string;
    deliveryFee: number;
    isActive: boolean;
    displayOrder: number;
  }
) {
  const res = axiosInstance.patch(`/cities/${id}`, data);
  return res;
}

export function deleteCity(id: string) {
  const res = axiosInstance.delete(`/cities/${id}`);
  return res;
}

export function subscribeToNewsletter(data: { email: string }) {
  const res = axiosInstance.post('/subscribers/subscribe', data);
  return res;
}

export function getSubscribers() {
  const res = axiosInstance.get('/subscribers');
  return res;
}
export function deleteSubscriber(id: string) {
  const res = axiosInstance.delete(`/subscribers/${id}`);
  return res;
}
export function getSubscriber(id: string) {
  const res = axiosInstance.get(`/subscribers/${id}`);
  return res;
}
export function updateSubscriber(id: string, data: { email: string }) {
  const res = axiosInstance.patch(`/subscribers/${id}`, data);
  return res;
}

export function getAddons() {
  const res = axiosInstance.get('/addons');
  return res;
}

// Addons endpoints
export function getAddonsPaginated(currentPage: number, itemsPerPage: number) {
  const res = axiosInstance.get(`/addons`, {
    params: {
      page: currentPage,
      limit: itemsPerPage,
    },
  });
  return res;
}

export function createAddon(data: {
  title: string;
  price: number;
  options?: string[];
  inputType: 'text' | 'number' | 'radio' | 'select' | 'image';
}) {
  const res = axiosInstance.post('/addons', data);
  return res;
}

export function updateAddon(
  id: string,
  data: {
    title: string;
    price: number;
    options?: string[];
    inputType: 'text' | 'number' | 'radio' | 'select' | 'image';
  }
) {
  const res = axiosInstance.patch(`/addons/${id}`, data);
  return res;
}

export function deleteAddon(id: string) {
  const res = axiosInstance.delete(`/addons/${id}`);
  return res;
}
