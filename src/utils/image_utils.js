export const arrayToString = (data) => {
    const filesUrl = [];
    for (let index = 0; index < data.length; index++) {
        const res = data[index]?.response || data[index];
        filesUrl.push(res);
    }

    return filesUrl;
};