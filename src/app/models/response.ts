export interface ApiResponse<T>{
  message: T;
  status:'success' | 'error';
}
