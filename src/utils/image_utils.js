export const toMediaArr = (data) => {
    return data.reduce((pre,next)=>([...pre,{
        public_id: next.response.public_id,
        url: next.response.url
    }]),[]);
};