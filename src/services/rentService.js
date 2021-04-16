import http from './httpService';

const apiEndpoint = "/rent"

export function payMerchant(authToken, mId) {
    console.log(mId);
    const body = { authorizationToken: authToken, movieId: mId }
    return http.post(`${apiEndpoint}/pay`,body);
}