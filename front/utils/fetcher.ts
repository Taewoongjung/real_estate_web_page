import axios from "axios";

const fetcher = (url: string) => axios.get(url, {
    withCredentials: true,
}).then((response) => {
    // console.log('fetcher = ',response.data['email']);
    // const one = response.data['email'];
    // const two = response.data['nick'];
    // const three = response.data['id'];
    // const sum = new Array;
    // sum[0] = one;
    // sum[1] = two;
    // sum[2] = three;
    // console.log(sum);
    return response.data;
});

export default fetcher;