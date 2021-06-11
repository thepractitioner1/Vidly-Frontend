import http from './httpService';

const apiEndpoint = "/rent"

export function payMerchant(authToken, mId) {
    console.log(mId);
    const body = { authorizationToken: authToken, movieId: mId }
    return http.post(`${apiEndpoint}/pay`, body);
}

export function createPaymentRequest(data) {
    console.log(data);
    return http.post(`${apiEndpoint}/createPaymentRequest`, data)
}

export function getOrderStatus(id){
    return http.get(`${apiEndpoint}/getOrderStatus/${id}`)
}

